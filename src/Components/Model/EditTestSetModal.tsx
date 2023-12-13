import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { FormControl, FormLabel, Stack, Typography } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import AsyncSelect from "react-select/async";
import React, { useState, CSSProperties } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import Select from "react-select";
import { OButton3 } from "../Common/Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import adminTokenAxios from "../../Hooks/AdminTokenAxios";
import { useParams } from "react-router-dom";
import LoadingBar from "../Headers/LoadingBar";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  //   height: 300,
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type FormValues = Record<string, any>;

interface ModalProps {
  handleOpen?: () => void;
  handleClose?: () => void;
  handleSubmit?: () => void;
  restAddProduct?: () => void;
  open: boolean;
  categoryObj?: any;
  data?: any;
  tsc: any;
  setId: any;
  setName: string;
}

const EditTestSetModal = ({
  open,
  handleClose,
  data,
  categoryObj,
  restAddProduct,
  tsc,
  setId,
  setName,
}: //   handleSubmit,
ModalProps) => {
  const [counter, setCounter] = useState(1);
  const para = useParams();
  const queryClient = useQueryClient();
  const p_id = para.productdetails;
  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const getProductDetail: any = queryClient.getQueryData([
    "ViewProductDetails1",
    p_id,
  ]);

  const ts_id = getProductDetail.ts_id;

  const getTopics = useQuery({
    queryKey: ["topicEdit", tsc, ts_id,getProductDetail],
    queryFn: async () => {
      const res = await adminTokenAxios.get(
        `admin/show-topics/${tsc}/${ts_id}`
      );
      const data = await res.data?.topics;
      const options = data.map((item: any) => ({
        value: item.id,
        label: item.t_name,
      }));
      return options;
    },
  });

  const getSet = useQuery({
    queryKey: ["getSetDetails", setId],
    queryFn: async () => {
      const res = await adminTokenAxios.get(`admin/get-set-topic/${setId}`);
      const data = await res.data?.set_data;
      const options = data.map((item: any) => ({
        value: item.id,
        label: item.t_name,
      }));

      return options;
    },
    enabled: !!setId,
  });

  // console.log("getSet", getSet.data);
  // console.log("gettopics", getTopics.data);

  // const updatedData: any = queryClient.getQueryData([
  //   "ViewProductDetails1",
  //   p_id,
  // ]);
  console.log(122, getProductDetail.categories);

  const updateTestSeriesSets = useMutation({
    mutationFn: async (formattedDatav2: any) => {
      return await adminTokenAxios.put(
        `/admin/update-test-series-product-topics`,
        formattedDatav2
      );
    },
    onError: (error: any) => {
      console.error("Error creating user:", error.response?.data);
    },
    onSuccess: (res: any) => {
      // let data = res?.data.categories_data;
      console.log("mutation", res.data);
      reset();
     
      handleClick();
      // setCounter(counter + 1);

      getProductDetail.categories = getProductDetail.categories.map((item: any) => {
        console.log(item.id , res.data.set_data.id);
        
        return item.id === res.data.set_data.id ? res.data.set_data : item;
      });
      

      // console.log(154, getProductDetail.categories);
      queryClient.setQueryData(["ViewProductDetails1", p_id], getProductDetail);
    },
  });
  console.log(162, getProductDetail.categories);
  // const selectedCategories = Object.keys(categoryObj);
  // console.log("selectedCategories", selectedCategories);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // const formattedData = [{setId: counter,}]
    // console.log("modal", data);
    // const tst_id: any = []

    const formattedData = {
      tst_id: data.subject.map((item: any) => item.value),
      set_id: data.set_id,
    };
    //
    const formattedDatav2 = {
      data: formattedData,
    };

    // console.log("Formatted data:", formattedDatav2);

    try {
      await updateTestSeriesSets.mutateAsync(formattedDatav2);
      // console.log("Data submitted successfully", formattedDatav2);
    } catch (error) {
      // The error will be handled by the onError callback in the mutation options
    }
  };

  const handleClick = () => {
    setCounter(1);
    restAddProduct?.();
    reset();
    handleClose?.();
  };

  // if (getSet.isLoading) {
  //   return <LoadingBar />;
  // }

  // console.log("MODAL", categoryObj, data);
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {getSet.isLoading ? (
              <LoadingBar />
            ) : (
              <>
                <IconButton
                  edge="end"
                  color="inherit"
                  onClick={handleClick}
                  aria-label="close"
                  sx={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                  }}
                >
                  <CloseIcon />
                </IconButton>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack spacing={2}>
                    <Controller
                      name="set_id"
                      control={control}
                      defaultValue={setId}
                      render={({ field }) => (
                        <Typography {...field} variant="h5" component="h5">
                          Set {setName}
                        </Typography>
                      )}
                    />

                    <FormControl fullWidth>
                      {/* <FormLabel id="demo-controlled-radio-buttons-group">
                      Select {item.tsc_type} Topic
                    </FormLabel> */}

                      <Controller
                        name="subject" // change later
                        control={control}
                        defaultValue={getSet.data || []}
                        render={({ field }) => (
                          <Select
                            {...field}
                            isMulti
                            isClearable
                            // cacheOptions

                            options={getTopics.data || []}
                            // placeholder={`Select ${item.tsc_type} Topic`}
                          />
                        )}
                      />
                    </FormControl>

                    <OButton3
                      type="submit"
                      name="Submit"
                      css={{ marginTop: "1rem" }}
                    />
                  </Stack>
                </form>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default EditTestSetModal;
