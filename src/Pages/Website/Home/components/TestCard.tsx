import { Card, CardActions, CardContent, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import { OButton2, WButton } from "../../../../Components/Common/Button";
import { Header2 } from "../../../../Components/Common/HeaderText";
import { ParaText1 } from "../../../../Components/Common/ParaText";
// import { AppContext } from "../../../../Context/AppContext";
import { CartContext } from "../../../../Context/CartContext";
import img from "../../../../Assets/images/product.jpg"

interface props {
  data: any;
  val:boolean;
}

const TestCard = (props: props) => {
  const { addToCart } = CartContext();
  // const { user } = AppContext();
  // console.log(props.val?.includes(props.data?.id));

  return (
    <Card
      sx={{
        width: { lg: "400px", md: "450px", sm: "355px", xs: "355px" },
        height: { lg: "495px", sm: "490px", xs: "490px", md: "490px" },
        border: "1px solid #ccc",
        borderRadius: "3px",
        p: { lg: "25px", md: "10px", sm: "15px", xs: "25px" },
        boxShadow: "13px 13px 20px 1px rgba(0, 0, 0, 0.16)",
        mb: "30px",
        mx: "auto",
      }}
    >
      <Link to={`/product/${props.data.id}`}>
        <CardMedia
          sx={{
            height: "317px",
            width: { sm: "301px", xs: "301px", md: "331px", lg: "100%" },
          }}
          image={props.data.p_image  ? import.meta.env.VITE_IMAGE_URL+props.data.p_image : img }
        />
        <CardContent sx={{ py: "0px", px: { lg: 0, md: "27px" } }}>
          <Header2 header={props.data.p_name} />
          <ParaText1 text={`$ ${ props.data.p_price}`} />
        </CardContent>
      </Link>

      <CardActions sx={{ py: "0px" }}>
        { props.val ? (
          <Link to="/cart" style={{ width: "100%" }}>
            <WButton name="Go to cart" type="button" css={{ width: "100%" }} />
          </Link>
        ) : (
          <OButton2
            name="Add to cart"
            func={() => addToCart(props.data.id)}
            type="button"
          />
        )}
      </CardActions>
    </Card>
  );
};

export default TestCard;
