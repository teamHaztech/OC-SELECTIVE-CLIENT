import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Card, Container, Stack, Box } from "@mui/material";
import { OButton } from "../Common/Button";
import { Header1 } from "../Common/HeaderText";
import { ParaText1, ParaText3 } from "../Common/ParaText";

interface Detail {
  title: string;
  data: string | number;
}

interface props {
  details: Detail[];
  func?: () => void;
  admin?: boolean;
}

const ProfileComponent = (props: props) => {


  
  return (
    <>
      <Stack direction="row" sx={{ my: "8px", justifyContent: "center" }}>
        {/* {!props?.admin && ( */}
          <>
            <AccountCircleIcon
              sx={{
                height: "28px",
                width: "28px",
                color: "#FA8128",
                mx: "8px",
                my: "auto",
              }}
            />
            <Header1 header="PROFILE" css={{}} />
          </>
        {/* // )} */}
      </Stack>
      <Container maxWidth="xl">
        <Card
          sx={{
            boxShadow: "6px 6px 20px 0px #808080",
            my: "15px",
            display: "flex",
            flexDirection: { lg: "row", md: "row", sm: "row", xs: "column" },
            justifyContent: {
              lg: "space-between",
              md: "space-between",
              sm: "space-between",
              xs: "center",
            },
          }}
        >
          <Box>
            {props.details?.map((item: Detail, key: number) => {
              return (
                <Stack
                  flexDirection="row"
                  sx={{
                    alignItems: "center",
                    width: {
                      lg: "500px",
                      md: "500px",
                      sm: "500px",
                      xs: "300px",
                    },
                    justifyContent: "space-between",
                  }}
                  margin="20px"
                  marginBottom="50px"
                  key={key}
                >
                  <ParaText3 text={item?.title} />
                  <ParaText1 text={item?.data} css={{ m: "0", p: 0 }} />
                </Stack>
              );
            })}
          </Box>
          {!props?.admin && (
            <OButton
              name="Edit"
              css={{ width: "140px", m: "20px" }}
              func={props.func}
            />
          )}
        </Card>
      </Container>
    </>
  );
};

export default ProfileComponent;
