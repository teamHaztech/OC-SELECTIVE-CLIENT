import { Stack, Typography, Card, Container } from "@mui/material";
import { Header1 } from "../../../Components/Common/HeaderText";
import BarChartIcon from "@mui/icons-material/BarChart";
import { ParaText1, ParaText3 } from "../../../Components/Common/ParaText";
import { BButton } from "../../../Components/Common/Button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, Link, useNavigate } from "react-router-dom";
import LoadingBar from "../../../Components/Headers/LoadingBar";
import tokenAxios from "../../../Hooks/TokenAxios";
const TestSeries = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { isLoading, data } = useQuery(['details'], () =>
    tokenAxios.get(`/get-user-test-details/${params.id}`)
  );

  // const TestMU = useMutation({
  //   mutationFn: async (id: number) => {
  //     return await tokenAxios.post("/post-user-test-status", {
  //       id: id,
  //     });
  //   },
  //   onSuccess: (response) => {
  //     // navigate(`/user/Test-schedule/Exam-section/${response?.data?.user_test.id}`);
  //     let url =`/user/Test-schedule/Exam-section/${response?.data?.user_test}`;
  //     window.open(url, '_blank', 'width=1400,height=600');
  //   },
  // });

  console.log(data);
  const tsp = data?.data;



  const redirect = () => {};

  if (isLoading) {
    return <LoadingBar />;
  }

  // if (TestMU.isLoading) {
  //   return <LoadingBar />;
  // }
  return (
    <Container maxWidth="xl">
      <Stack
        direction="row"
        sx={{
          my: "18px",
          justifyContent: "center",
          mx: "auto",
          pr: { lg: "100px", xs: "0px", sm: "100px", md: "100px" },
        }}
      >
        <BarChartIcon
          sx={{
            height: "28px",
            width: "28px",
            color: "#FA8128",
            mx: "8px",
            my: "auto",
          }}
        />
        <Header1 header="TEST SERIES" />
      </Stack>
      <Card
        sx={{
          boxShadow: "6px 6px 20px 0px #808080",
          my: "15px",
          display: "flex",
          justifyContent: "space-between",
          py: "20px",
        }}
      >
        <Stack flexDirection="column" spacing={2} paddingX={6} paddingY={4}>
          <Header1 header={tsp.p_name} />
          {/* <ParaText3 text="Description" />
          <ParaText1
            text={tsp.ts_product.p_description}
            css={{ maxWidth: "327px" }}
          /> */}
          {/* <Stack direction="row" spacing={2}>
            <ParaText3 text="Validity:" />
            <ParaText1 text={`${tsp.valid_from} - ${tsp.valid_till}`} />
          </Stack> */}

          {/*            
          <ParaText3 text={`Subject: ${sub}` } />  <ParaText1 text="30" />
          <ParaText3 text={`Test Name: ${sub} set - ${td.set_id}` } />  */}
          <Stack direction="row" spacing={1}>
            <ParaText3 text="Subject:" />
            <ParaText1 text={`${tsp.subject}`} />
          </Stack>

          <Stack direction="row" spacing={1}>
            <ParaText3 text="Test Name:" />
            <ParaText1 text={`${tsp.set_name}`} />
          </Stack>
          <Stack direction="row" spacing={1}>
            <ParaText3 text="Total question:" />
            <ParaText1 text={`${tsp.total_question}`} />
          </Stack>
          <Stack direction="row" spacing={1}>
            <ParaText3 text="Time Limit:" />
            <ParaText1 text={tsp.duration + " min"} />
          </Stack>
          <Link to={`/user/Test-schedule/Exam-section/${tsp.uts_id}`}>
            <BButton
              name="ANSWER TEST"
              css={{ width: "256px", height: "58px" }}
            />
          </Link>
        </Stack>
      </Card>
    </Container>
  );
};

export default TestSeries;
