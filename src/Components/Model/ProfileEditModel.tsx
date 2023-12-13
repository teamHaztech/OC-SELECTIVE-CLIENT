import { Box, Dialog, Stack } from "@mui/material";
import { UserContext } from "../../Context/UserContext";
import { OButton, WButton } from "../Common/Button";
import { Header1 } from "../Common/HeaderText";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Input } from "../Common/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingBar from "../Headers/LoadingBar";
import tokenAxios from "../../Hooks/TokenAxios";
import { AppContext } from "../../Context/AppContext";

type Inputs = {
  name: string;
  user_id: number;
  birth_date: Date;
  email: string;
  phone: string;
};
type user = {
  name: string;
  id: number;
  DOB: string;
  email: string;
  phone: string;
};
const ProfileEditModal = () => {
  const { user, updateUser } = AppContext();
  const {
    handlePEClose,
    openPE,
    handlePE2Open,
    handlePE2Close,
    dataSubmit,
    dispatch,
    openPE2,
    handlePESuccessOpen,
  } = UserContext();
  const { register, handleSubmit } = useForm<Inputs>();
  
  const [profileData, setProfileData] = useState<Inputs | null>(null);
  const queryClient = useQueryClient();
  const data: user | undefined = queryClient.getQueryData([
    "user-profile-data",
  ]);
  const updateUserMu = useMutation({
    mutationFn: async (profileData: Inputs | null) => {
      return await tokenAxios.post(`/profile-change/${user?.id}`, {
        name: profileData?.name,
        DOB: profileData?.birth_date,
        phone: profileData?.phone,
      });
    },
    onSuccess: (res) => {
      console.log(res.data.data);
      
      if (res.status === 200) {
        updateUser(res.data.data);
        dispatch({ type: "SET_dataSubmit", payload: false });
        handlePE2Close();
        handlePESuccessOpen();
        queryClient.setQueryData(["user-profile-data"], res.data.data);
      }
    },
  });
  // const { data, isLoading } = useQuery(["user-data", user], async () => {
  //   return await tokenAxios.get("/user");
  // });

  useEffect(() => {
    if (dataSubmit == true && openPE2 == true) {
      // console.log(profileData);
      updateUserMu.mutate(profileData);
    }
  }, [dataSubmit]);

  const onSubmit: SubmitHandler<Inputs> = async (para_data: Inputs) => {
    handlePEClose();
    handlePE2Open();
    setProfileData(para_data);
  };

  // console.log(data);

  return (
    <Dialog onClose={handlePEClose} open={openPE} sx={{ height: "630px" }}>
      <Box
        sx={{
          width: { lg: "482px", md: "482px", sm: "482px", xs: "320px" },
          height: "700px",
          display: "flex",
          flexDirection: "column",
          px: "40px",
        }}
      >
        <Stack spacing={1} direction="row" margin="auto" sx={{ my: "20px" }}>
          <LockOpenIcon
            sx={{ height: "30px", width: "30px", color: "#FA8128" }}
          />
          <Header1 header="EDIT PROFILE" />
        </Stack>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4} direction="column" margin="auto">
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Input
                label="Name"
                type="text"
                reg={register("name")}
                defaultVal={data?.name}
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Input
                label="Birth Date"
                type="date"
                reg={register("birth_date")}
                defaultVal={data?.DOB}
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Input
                label="Email"
                inputProps={{ disabled: true }}
                type="email"
                reg={register("email")}
                defaultVal={data?.email}
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Input
                label="Phone Number"
                type="telephone"
                reg={register("phone")}
                defaultVal={data?.phone}
              />
            </Box>
            <Stack
              spacing={{ lg: 6, md: 6, sm: 6, xs: 2 }}
              direction="row"
              marginX="auto"
              paddingTop={2}
            >
              <WButton
                name="CANCEL"
                css={{ width: "177px" }}
                func={handlePEClose}
              />
              <OButton name="NEXT" css={{ width: "177px" }} type="submit" />
            </Stack>
          </Stack>
        </form>
      </Box>
    </Dialog>
  );
};

export default ProfileEditModal;
