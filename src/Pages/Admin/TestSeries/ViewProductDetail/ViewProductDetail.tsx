import { Box, Button, Container, Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import SectionOne from "./SectionOne";
import ViewFirstSection from "../../../User/TestResultAnalysis/Components/ViewFirstSection";
import SectionTwo from "./SectionTwo";
import adminTokenAxios from "../../../../Hooks/AdminTokenAxios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { Header1 } from "../../../../Components/Common/HeaderText";
import AlertBox from "../../../../Components/Common/AlertBox";
import { useState } from "react";
import { UserContext } from "../../../../Context/UserContext";
import LoadingBar from "../../../../Components/Headers/LoadingBar";
import AddTestSetModal from "../../../../Components/Model/AddTestSetModal";
import EditTestSetModal from "../../../../Components/Model/EditTestSetModal";

const ViewProductDetail = () => {
  const queryClient = useQueryClient();
  const { productdetails } = useParams();

  const navigate = useNavigate();
  const { productEdit } = UserContext();
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState<boolean>(false);

  const [data, setData] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [err, setErr] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleErrBoxOpen = () => setErr(true);

  const handleErrBoxClose = () => setErr(false);

  const handleSuccessBoxOpen = () => setSuccess(true);

  const handleSuccessBoxClose = () => setSuccess(false);

  const testSeries = useQuery({
    queryKey: ["ViewProductDetails1", productdetails],
    queryFn: async () => {
      try {
        const response = await adminTokenAxios.get(
          `admin/show-product-details/${productdetails}`
        );

        console.log("Products Details", response.data?.product_detail);

        return response?.data?.product_detail;
      } catch (error) {
        console.error(error);
      }
    },
  });

  const updatedData: any = queryClient.getQueryData([
    "ViewProductDetails1",
    productdetails,
  ]);
  // console.log(updatedData);

  const deleteSetMU = useMutation({
    mutationFn: async (id: number) => {
      return await adminTokenAxios.delete(`/admin/delete-set/${id}`);
    },
    onSuccess: (res) => {
      // console.log(res.status);
      if (res.status == 200) {
        let data = res?.data.category_data;

        updatedData.categories.map((item: any, key: number) => {
          if (item.id == data.id) {
            updatedData.categories[key] = data;
            // return updatedData;
          }
        });

        queryClient.getQueryData(
          ["ViewProductDetails1", productdetails],
          updatedData
        );

        handleSuccessBoxOpen();
      } else {
        handleErrBoxOpen();
      }
    },
  });

  const getSetData = useMutation({
    mutationFn: async ({
      p_id,
      tsc_id,
    }: {
      p_id: number | String;
      tsc_id: number;
    }) => {
      // console.log(p_id, tsc_id);

      return await adminTokenAxios.post(`/admin/show-set-topics`, {
        p_id: p_id,
        tsc_id: tsc_id,
      });
    },
    onError: (error: any) => {
      console.error("Error creating user:", error.response?.data);
    },
    onSuccess: (res) => {
      if (res.status == 200) {
        setData(res?.data?.set_data);
        setCategory(res?.data?.tspc);
        handleOpen();
      }
    },
  });

  const updateSetStatusMutation = useMutation({
    mutationFn: async ({ setId, newStatus }: any) => {
      console.log("mutation data", setId, newStatus);
      return await adminTokenAxios.post(`/admin/update-set-status/${setId}`, {
        status: newStatus,
      });
    },
    onError: (error: any) => {
      console.error("Error creating user:", error.response?.data);
    },
    // onSuccess: (res: any) => {
    //   console.log("Mutation Reponse", res?.data);
    //   // setChecked();
    // },
  });

  const handleSwitchToggle = (
    setId: number | string,
    currentStatus: number | string
  ) => {
    const newStatus = currentStatus === 1 ? 0 : 1; // Toggle the status locally

    // Call the mutation function to update the cache
    updateSetStatusMutation.mutate({ setId, newStatus });

    // Update the cache directly

    // console.log("Cached data", updatedData);
    updatedData.categories.forEach((category: any) => {
      category.sets.forEach((set: any) => {
        if (set.id === setId) {
          set.status = newStatus; // Update the status
        }
      });
    });
    queryClient.setQueryData(
      ["ViewProductDetails1", productdetails],
      updatedData
    );
  };

  // const deleteSetMutation = useMutation({
  //   mutationFn: async (setId: any) => {
  //     console.log("mutation data", setId);
  //     return await adminTokenAxios.delete(`/admin/delete-set/${setId}`);
  //   },
  //   onError: (error: any) => {
  //     console.log("Error Deleting Set:", error);
  //   },
  //   onSuccess: (res: any) => {
  //     console.log("Mutation Reponse", res?.response?.data?.Message);
  //     setMessage(res?.response?.data?.Message);
  //     handleAlertBoxOpen();
  //   },
  // });

  // const handleDeleteSet = (setId: any) => {
  //   deleteSetMutation.mutate(setId);
  // };

  if (testSeries.isLoading) {
    return <LoadingBar />;
  }
  // console.log(testSeries?.data);
  return (
    <>
      <AlertBox
        name="Cannot Delete The Set"
        type="error"
        bol={err}
        duration={6000}
        handleAlertBoxClose={handleErrBoxClose}
      />
      <AlertBox
        name="Successfully Deleted The Set"
        type="success"
        bol={success}
        handleAlertBoxClose={handleSuccessBoxClose}
      />
      <Container maxWidth="lg">
        <Stack marginTop={2} direction="row">
          <Button
            onClick={() => navigate(-1)}
            // size="small"
            type="button"
            variant="contained"
            color="primary"
            sx={{ paddingRight: "1rem" }}
          >
            {/* <ArrowBackIosNewRoundedIcon /> */}
            Back
          </Button>

          <Stack
            direction="row"
            sx={{
              // my: "18px",
              justifyContent: "center",
              mx: "auto",
              pr: { lg: "100px", xs: "0px", sm: "100px", md: "100px" },
            }}
          >
            <AssignmentOutlinedIcon
              sx={{
                height: "28px",
                width: "28px",
                color: "#FA8128",
                mx: "8px",
                my: "auto",
              }}
            />
            <Header1 header="Package Detail" />
          </Stack>
        </Stack>
        <Stack
          mt={2}
          // direction="row"
          spacing={2}
          // flexWrap="wrap"
          // sx={{ width: "100%" }}

          alignItems={"center"}
        >
          <SectionOne product={testSeries?.data} />
          {/* <Stack direction="column" spacing={3} useFlexGap flexWrap="wrap"> */}
          <SectionTwo
            releaseStatus={testSeries?.data?.release_status}
            sets={testSeries?.data?.categories}
            onSwitchToggle={handleSwitchToggle}
            handleDelete={deleteSetMU}
            addNewSet={getSetData}
          />
          {/* </Stack> */}
        </Stack>
      </Container>
      {data && category && (
        <AddTestSetModal
          open={open}
          // handleOpen={handleOpen}
          handleClose={handleClose}
          // handleSubmit={handleSubmit}
          // setCsvData={setCsvData}
          // restAddProduct={reset}
          data={data}
          categoryObj={category}
        />
      )}
    </>
  );
};

export default ViewProductDetail;
