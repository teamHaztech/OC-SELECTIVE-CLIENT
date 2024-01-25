import {
  QueryObserverResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import React, { createContext, useContext, useEffect, useState } from "react";
import axiosBaseURL from "../Hooks/BaseUrl";
import tokenAxios from "../Hooks/TokenAxios";
import { AppContext } from "./AppContext";
import { UserContext } from "./UserContext";

interface MainContextProps {
  children: React.ReactNode;
}
interface ContextValue {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  addToCart: (id: number) => number;
  RAllFromCart: () => void;
  cart: Array<number>;
  setCart: React.Dispatch<React.SetStateAction<Array<number>>>;
  removeFromCart: (id: number) => void;
  addToCartFL: (id: number) => void;
  CRLoading: boolean;
  cartUpdate: () => void;
  purchases:number[];
  addLoading:boolean;
}

const defaultValue: ContextValue = {
  isLoading: false,
  setIsLoading: () => {},
  addToCart: (id: number) => 0,
  RAllFromCart: () => {},
  cart: [],
  setCart: () => {},
  removeFromCart: (id: number) => {},
  addToCartFL: (id: number) => {},
  CRLoading: false,
  cartUpdate: () => {},
  purchases:[],
  addLoading:false
};

const Context = createContext<ContextValue>(defaultValue);

const MainCartContext: React.FC<MainContextProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const storedCart = localStorage.getItem("product_id");

  const initialCart = storedCart ? JSON.parse(storedCart) : [];
  const [cart, setCart] = useState<Array<number>>(initialCart);
  const [purchases, setPurchases] = useState<Array<number>>([]);
  const { user } = AppContext();
  const { handlePUSuccessOpen } = UserContext();

  const { data: PUdata } = useQuery(
    [user, cart, "purchases"],
    async () => await tokenAxios.get(`get-user-purchases-id`),
    {
      enabled: !!user,
    }
  );

  useEffect(() => {
    setPurchases(PUdata?.data.tsp);
  }, [PUdata, cart]);

  const RAllFromCart = () => {
    setCart([]);
    localStorage.removeItem("product_id");
  };

  const CartData = useMutation({
    mutationFn: async (formData: any) => {
      // console.log(formData);
      return await tokenAxios.post("/add-to-cart", formData);
    },
    onSuccess: (res) => {},
  });
const addLoading = CartData.isLoading;
  const CartRemove = useMutation({
    mutationFn: async (id: number) => {
      return await tokenAxios.get(`/remove-from-cart/${id}`);
    },

    onSuccess: (res) => {},
  });

  const { data } = useQuery(
    [user, "cartData", CartData.data, CartRemove.data],
    async () => await tokenAxios.get(`/get-cart-data/${user?.id}`),
    {
      enabled: !!user,
    }
  );

  // useEffect(() => {
  //   cartUpdate();
  // }, [data]);

  const cartUpdate = () => {
    
    
    if (user) {
      let updatedCart = data?.data.cart_data?.map((item: any) => {
        return item.tsp_id;
      });
      updatedCart && setCart(updatedCart);

      updatedCart &&
        localStorage.setItem("product_id", JSON.stringify(updatedCart));
    }
  };
  const CRLoading = CartRemove.isLoading;

  const addToCart = (id: number) => {
    if (user && purchases?.includes(id)) {
      handlePUSuccessOpen();
      return 0;
    }
    const updatedCart: number[] = cart ? [...cart, id] : [id];
    setCart(updatedCart);

    if (user) {
      // console.log("Add to cart ",user.id,id);
      
      CartData.mutate({
        u_id: user.id,
        p_id: id,
      });
    }
    // localStorage.removeItem("product_id");
    localStorage.setItem("product_id", JSON.stringify(updatedCart));
    return 1;
  };

  const addToCartFL = (id: number) => {
    if (cart) {
      CartData.mutate({
        u_id: id,
        p_id: cart,
      });
    }
    // localStorage.removeItem("product_id");
  };

  const removeFromCart = async (id: number) => {
    // localStorage.removeItem("product_id");
    if (user) {
      CartRemove.mutate(id);
    }
    let temp = cart.filter((item: number) => {
      if (item != id) {
        return item;
      }
    });

    console.log(cart);
   
    localStorage.setItem("product_id", JSON.stringify(temp));
    setCart(temp);
  };

  return (
    <Context.Provider
      value={{
        purchases,
        cartUpdate,
        RAllFromCart,
        CRLoading,
        setIsLoading,
        isLoading,
        addToCart,
        cart,
        setCart,
        removeFromCart,
        addToCartFL,
        addLoading
      }}
    >
      {children}
    </Context.Provider>
  );
};

const CartContext = (): ContextValue => {
  return useContext(Context);
};
export { MainCartContext, CartContext };
