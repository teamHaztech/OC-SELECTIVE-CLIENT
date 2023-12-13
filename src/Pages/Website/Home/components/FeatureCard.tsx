import { Box, Card, CardContent, CardMedia, Collapse } from "@mui/material";
import { useState } from "react";
import { Header2 } from "../../../../Components/Common/HeaderText";
import { ParaText1 } from "../../../../Components/Common/ParaText";

interface mapData {
  title: string;
  description: string;
  image: string;
}
interface props {
  data: mapData;
}

const FeatureCard = (props: props) => {
  const [checked1, setChecked1] = useState<boolean>(false);
  const [checked2, setChecked2] = useState<boolean>(true);
  const handleChange = () => {
    setChecked1((prev) => !prev);
    setChecked2((prev) => !prev);
    console.log(checked1);
  };

  return (
    <Card
      sx={{
        width: { sm: "340px", xs: "370px", lg: "390px", md: "300px" },
        height: "291px",
        border: "1px solid #ccc",
        borderRadius: "3px",
        p: { md: "25px", sm: "15px", xs: "15px" },
        boxShadow: "13px 13px 20px 1px rgba(0, 0, 0, 0.16)",
        mb: "30px",
      }}
      onClick={handleChange}
    >
      <CardContent sx={{ py: "6px", px: 0, textAlign: "center" }}>
        <Header2 header={props.data.title} />
        <Box sx={{ py: "14px" }}>
          {checked1 == true && (
            <Collapse in={checked1}>
              {<ParaText1 text={props.data.description} />}
            </Collapse>
          )}
          {checked2 == true && (
            <Collapse in={checked2}>
              {
                <CardMedia
                  sx={{
                    height: {
                        sm: "180px",
                        xs: "180px",
                        md: "180px",
                        lg: "204px",
                      },
                    width: {
                      sm: "180px",
                      xs: "180px",
                      md: "180px",
                      lg: "204px",
                    },
                    m: "auto",
                  }}
                  image={props.data.image}
                />
              }
            </Collapse>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
