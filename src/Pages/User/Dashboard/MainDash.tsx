import { Container, Stack } from "@mui/material";
import { Header1 } from "../../../Components/Common/HeaderText";
import FirstSection from "./FirstSection";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SecondSection from "./SecondSection";
import ThirdSection from "./ThirdSection";
import FourthSection from "./FourthSection";
import FifthSection from "./FifthSection";
import SixthSection from "./SixthSection";
import FirstSectionTwo from "./FirstSectionTwo";
import { useQuery } from "@tanstack/react-query";

import { AppContext } from "../../../Context/AppContext";
import tokenAxios from "../../../Hooks/TokenAxios";
import NotificationStrip from "../../../Components/Headers/NotificationStrip";
import { data } from "../../Admin/components/Mock_Data";
const MainDash = () => {
  const { user } = AppContext();

  const getUserSetQuery = useQuery({
    queryKey: ["get-user-set-data"],
    queryFn: async () => {
      const response = await tokenAxios.get(`get-user-set-data/${user?.id}`);
      return await response.data;
    },
  });

  const getRemaingProductQuery = useQuery({
    queryKey: ["get-remaining-product"],
    queryFn: async () => {
      const response = await tokenAxios.get(
        `get-remaining-product/${user?.id}`
      );

      return await response.data;
    },
  });

  const getTestScheduleLimitQuery = useQuery({
    queryKey: ["get-user-purchases-limit"],
    queryFn: async () => {
      const response = await tokenAxios.get(
        `get-user-purchases-limit/${user?.id}`
      );

      return await response.data;
    },
  });

  const getUserResultLimitQuery = useQuery({
    queryKey: ["get-user-result-limit"],
    queryFn: async () => {
      const response = await tokenAxios.get(
        `get-user-result-limit/${user?.id}`
      );

      return await response.data;
    },
  });

  const packageExpireQuery = useQuery({
    queryKey: ["check-user-purchase-expire"],
    queryFn: async () => {
      const response = await tokenAxios.get(
        `check-user-purchase-expire/${user?.id}`
      );

      return await response;
    },
  });

  const getLatestProductQuery = useQuery({
    queryKey: ["get-latest-product"],
    queryFn: async () => {
      const response = await tokenAxios.get(`get-latest-product`);

      return await response.data;
    },
  });

  const getOverallPercentage = useQuery({
    queryKey: ["get_overAll_percentage_limit"],
    queryFn: async () => {
      const response = await tokenAxios.get(
        `get_overAll_percentage_limit/${user?.id}`
      );

      return await response.data;
    },
  });

  return (
    <>
      {packageExpireQuery?.data?.status === 403 && (
        <NotificationStrip data={packageExpireQuery?.data?.data?.tsp} />
      )}

      <Stack direction="row" sx={{ my: "8px", justifyContent: "center" }}>
        <DashboardIcon
          sx={{
            height: "28px",
            width: "28px",
            color: "#FA8128",
            mx: "8px",
          }}
        />
        <Header1 header="DashBoard" />
      </Stack>
      <FirstSection data={getUserSetQuery} />
      <FirstSectionTwo data={getRemaingProductQuery} />
      <SecondSection data={getOverallPercentage} />
      <ThirdSection data={getTestScheduleLimitQuery} />
      <FourthSection data={getLatestProductQuery?.data} />
      <FifthSection data={getUserResultLimitQuery} />
      {/* <SixthSection /> */}
    </>
  );
};

export default MainDash;
