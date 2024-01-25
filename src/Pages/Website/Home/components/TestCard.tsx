import { Card, CardActions, CardContent, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import { OButton2, WButton } from "../../../../Components/Common/Button";
import { Header2 } from "../../../../Components/Common/HeaderText";
import { ParaText1 } from "../../../../Components/Common/ParaText";
// import { AppContext } from "../../../../Context/AppContext";
import { CartContext } from "../../../../Context/CartContext";
import img from "../../../../Assets/images/product.jpg";
import { useQuery } from "@tanstack/react-query";
import tokenAxios from "../../../../Hooks/TokenAxios";
import { AppContext } from "../../../../Context/AppContext";

interface props {
  data: any;
  val: boolean;
}

const TestCard = (props: props) => {
  const { addToCart, purchases, addLoading } = CartContext();
  const { user } = AppContext();
  // console.log(props.val?.includes(props.data?.id));
  const { data: PUdata } = useQuery(
    [],
    async () => await tokenAxios.get(`get-user-purchases-id`),
    {
      enabled: !!user,
    }
  );
  // console.log(purchases, PUdata);

  return (
    <Card
      sx={{
        width: { lg: "400px", md: "450px", sm: "355px", xs: "355px" },
       
        border: "1px solid #ccc",
        borderRadius: "3px",
        p: { lg: "25px", md: "10px", sm: "15px", xs: "25px" },
        boxShadow: "13px 13px 20px 1px rgba(0, 0, 0, 0.16)",
        mb: "30px",
        mx: "auto",
      }}
    >
      <Link to={`/product/${props.data.id}`}>
        <img
          src={
            props.data.p_image
              ? import.meta.env.VITE_IMAGE_URL + props.data.p_image
              : img
          }
          style={{
            width: "100%",
            height: "317px",
            // marginLeft: "20px",
            marginTop: "5px",
            aspectRatio: "1/1",
          }}
        />
        {/* <CardMedia
          sx={{
            height: "317px",
            width: "100%",
            marginX: "auto",
            aspectRatio: "1/1",
            objectFit: "cover",
          }}
          image={
            props.data.p_image
              ? import.meta.env.VITE_IMAGE_URL + props.data.p_image
              : img
          }
        /> */}
        <CardContent sx={{ py: "10px", px: { lg: 0, md: "27px" } }}>
          <Header2 header={props.data.p_name.toUpperCase()} />
          <ParaText1 text={`$${props.data.p_price}`} css={{fontWeight:"bold",fontSize:"20px"}}/>
        </CardContent>
      </Link>

      <CardActions sx={{ p: "0px" }}>
        {!addLoading ? (
          props.val ? (
            <Link to="/cart" style={{ width: "100%" }}>
              <WButton
                name="Go to cart"
                type="button"
                css={{ width: "100%" }}
              />
            </Link>
          ) : purchases?.includes(props.data.id) ? (
            <WButton
              name="ALready Purchased"
              type="button"
              css={{ width: "100%" }}
            />
          ) : (
            <OButton2
              name="Add to cart"
              func={() => addToCart(props.data.id)}
              type="button"
            />
          )
        ) : (
          <WButton name="Loading..." type="button" css={{ width: "100%" }} />
        )}
      </CardActions>
    </Card>
  );
};

export default TestCard;
