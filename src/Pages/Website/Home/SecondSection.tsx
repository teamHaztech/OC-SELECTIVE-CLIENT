import { Box, Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { BButton2 } from "../../../Components/Common/Button";
import { Header1 } from "../../../Components/Common/HeaderText";
import SelectBox from "../../../Components/Common/Select";
import UseGet from "../../../Hooks/UseGet";
import { AppContext } from "../../../Context/AppContext";
import TestSection from "./components/TestCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingBar from "../../../Components/Headers/LoadingBar";
import { CartContext } from "../../../Context/CartContext";
import tokenAxios from "../../../Hooks/TokenAxios";
import axiosBaseURL from "../../../Hooks/BaseUrl";

const SecondSection = () => {
  const [selectVal, setSelectVal] = useState<number>(1);
  const { cart } = CartContext();
  const { user } = AppContext();

  // console.log(cart);

  const { data: ts_data } = useQuery(["ts"], () =>
    axiosBaseURL.get(`/get-test-series`)
  );

  const { isLoading, data } = useQuery([selectVal, "product-data"], () =>
    tokenAxios.get(`/get-product-data/${selectVal}`)
  );

  // const { data: cdata, isLoading: loading } = useQuery(
  //   [cart, "cart-data"],
  //   () => tokenAxios.get(`/get-product-data/${selectVal}`),
  // );

  let p = data?.data?.product_data;
  // console.log(String(ts_data?.data.ts[selectVal - 1].id),ts_data?.data.ts[selectVal - 1].id);

  if (isLoading) {
    return <LoadingBar />;
  }
  
  return (
    <>
      <Container
        maxWidth={false}
        sx={{ width: "98%", py: "15px" }}
        id="product"
      >
        <Box style={{ display: "flex", alignItems: "left", width: "100%" }}>
          <Header1 header="Buy Test Series" css={{ mr: "10px" }} />
         {ts_data &&  <SelectBox
            defaultValue={String(ts_data?.data.ts[selectVal - 1].id)}
            name="choose test type"
            selectName="test_type"
            options={ts_data?.data.ts}
            func={setSelectVal}
          />}
        </Box>

        <Box
          sx={{
            display: "grid",
            my: "40px",
            gridTemplateColumns: {
              md: "auto auto",
              sm: "auto auto",
              lg: "auto auto auto",
              xs: "auto",
            },
            columnGap:2,
            width: "100%",
          }}
        >
          {p && p.length === 0 ? (
            <Header1 header="No Product Available" />
          ) : (
            p?.map((item: any, key: number) => (
              <TestSection
                data={item}
                key={key}
                val={cart?.includes(item?.id)}
              />
            ))
          )}
        </Box>
      </Container>
      {/* <Box sx={{ width: "100%", height: "100px", textAlign: "center" }}>
        <Link to="/product">
          <BButton2 name="SHOW MORE" />
        </Link>
      </Box> */}
    </>
  );
};

export default SecondSection;
