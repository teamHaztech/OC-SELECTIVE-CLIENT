import BarChartIcon from "@mui/icons-material/BarChart";
import { Stack, Typography } from "@mui/material";
import { Header1 } from "../../../Components/Common/HeaderText";
import MainTestRA from "./MainTestRA";
import {
  useLocation,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import TestRAView from "./TestRAView";
import TestRAS from "./TestRAS";
import { BButton } from "../../../Components/Common/Button";
import ReplyIcon from "@mui/icons-material/Reply";
import { ParaText1 } from "../../../Components/Common/ParaText";

const TestRAIndex = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <Stack direction="row" useFlexGap flexWrap="wrap">
        {!(location.pathname === "/user/Test-result-analysis") && (
          <BButton
            func={() => navigate(-1)}
            name={
              <>
                <ReplyIcon sx={{ width: "18px", height: "18px", m: "auto" }} />
                <Typography sx={{ color: "#FFFFFF", m: "auto" }}>
                  GO BACK
                </Typography>
              </>
            }
            css={{
              borderRadius: "3px",
              width: "143px",
              height: "34px",
              m: "18px",
              pl: "5px",
            }}
          />
        )}
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
          <Header1 header="TEST RESULT ANALYSIS" />
        </Stack>
      </Stack>
      <Routes>
        <Route index element={<MainTestRA />} />
        <Route path="/view/:id" element={<TestRAView />} />
        <Route path="/solution/:id" element={<TestRAS />} />
      </Routes>
    </>
  );
};

export default TestRAIndex;
