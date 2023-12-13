import { useQuery } from "@tanstack/react-query";
import UseGet from "../../../Hooks/UseGet";
import LoadingBar from "../../../Components/Headers/LoadingBar";
import { UserContext } from "../../../Context/UserContext";
import ProfileComponent from "../../../Components/BodyComponent/ProfileComponent";
import { AppContext } from "../../../Context/AppContext";
import tokenAxios from "../../../Hooks/TokenAxios";

interface Detail {
  title: string;
  data: string | number;
}

const ProfileIndex = () => {
  const { handlePEOpen } = UserContext();
  const { user } = AppContext();
  const { data ,isLoading} = useQuery(["user-profile-data" ], async () => {
   const data = await tokenAxios.get("/user");
   return data?.data
  });
  // console.log(data);
  
  const details: Detail[] = [
    { title: "Name", data: data?.name },
    { title: "User id", data: data?.id },
    { title: "Birth date", data: data?.DOB ? data?.DOB : "" },
    { title: "Email", data: data?.email },
    { title: "Phone number", data: `+61 ${data?.phone}` },
  ];
  if(isLoading){
    return <LoadingBar/>
  }
  return <ProfileComponent details={details} func={handlePEOpen} />;
};

export default ProfileIndex;
