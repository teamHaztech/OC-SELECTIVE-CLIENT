import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import Select from "@mui/material/Select";
import { useState } from "react";
import { OButton3 } from "../../../../Components/Common/Button";
import adminTokenAxios from "../../../../Hooks/AdminTokenAxios";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { useNavigate } from "react-router-dom";
import UploadModal from "../../../../Components/Model/UploadModal";
import AddTestSetModal from "../../../../Components/Model/AddTestSetModal";
import { Header1 } from "../../../../Components/Common/HeaderText";
import LoadingBar from "../../../../Components/Headers/LoadingBar";
import AlertBox from "../../../../Components/Common/AlertBox";

interface Categories {
  id: any;
  tsc_type: string;
}

interface TestSeriesData {
  tsc: Categories[];
}

type Option = {
  label: string;
  value: string;
};

type FormValues = {
  ts_id: string;
  // tsc_id: string;
  tsc_id: string[];
  // tst_id: Option[];
  p_name: string;
  p_description: string;
  p_price: string;
  p_image: any;
  test_month_limit: string;
  // total_question: string;
  // duration: string;
  release_date: string;
};

const AddTestSeries = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState<boolean>(false);
  const [subTopics, setSubTopics] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [category, setCategory] = useState<any>({});
  const [err, setErr] = useState<boolean>(false);
  const handleAlertBoxOpen = () => {
    setErr(true);
  };

  const handleAlertBoxClose = () => {
    setErr(false);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  // const image = watch("p_image");
  // console.log(image);
  const isTopicSelected = (topicId: string, selectedTopics: string[]) =>
    selectedTopics.includes(topicId);

  const addTSProductMU = useMutation({
    mutationFn: async (formattedData: FormValues) => {
      return await adminTokenAxios.post(
        `/admin/add-test-series-product`,
        formattedData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    onError: (error: any) => {
      console.error("Error creating user:", error.response?.data);
    },
    onSuccess: (res) => {
      if (res.status == 200) {
        setData(res?.data?.data);
        setCategory(res?.data?.tspc);
        setOpen(true);
      } else {
        handleAlertBoxOpen();
      }
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // const formData = new FormData();

    // formData.append("p_image", data.p_image[0]);
    // data = { ...data, p_image: data.p_image[0] };
    // formData.append("data", JSON.stringify(data));
    // console.log("DATA", data);

    try {
      await addTSProductMU.mutateAsync(data);
      // console.log("Data submitted successfully", data);
    } catch (error) {}
  };

  const getTestSeries = async () => {
    try {
      const response = await adminTokenAxios.get(`admin/get-test-series`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const testSeries = useQuery({
    queryKey: ["TestSeries"],
    queryFn: getTestSeries,
  });

  // console.log("TESTSERIES", testSeries.data);

  const callApi = async (selectedTopic: any) => {
    const response = await adminTokenAxios.get(
      `admin/get-test-series-topics/${selectedTopic}`
    );
    return (
      response.data?.tst.map((item: any) => ({
        value: item.id,
        label: item.t_name,
      })) || []
    );
  };
  if (testSeries.isLoading) {
    return <LoadingBar />;
  }
  // const mutation = useMutation({
  //   mutationFn: callApi,
  //   onSuccess: (data) => {
  //     setSubTopics((prevSubTopics: any) => [...prevSubTopics, data]);
  //   },
  // });

  // console.log("MUTATE", mutation);

  // console.log(addTSProductMU.data?.data.tsc_type);

  return (
    <>
      {addTSProductMU.data && (
        <AlertBox
          name={`No Topics available in ${addTSProductMU.data?.data.tsc_type} Subject`}
          type="error"
          bol={err}
          handleAlertBoxClose={handleAlertBoxClose}
        />
      )}
      <Container
        maxWidth="lg"
        sx={{
          width: "96%",
          my: 1,

          // height: "85vh",
          backgroundColor: "#F5F5F5",
        }}
        disableGutters
      >
        <Stack direction="row">
          <Button
            onClick={() => navigate(-1)}
            size="small"
            variant="contained"
            color="primary"
            sx={{ paddingRight: "1rem" }}
          >
            <ArrowBackIosNewRoundedIcon />
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
            <AddBoxOutlinedIcon
              sx={{
                height: "28px",
                width: "28px",
                color: "#FA8128",
                mx: "8px",
                my: "auto",
              }}
            />
            <Header1 header="Add Package" />
          </Stack>
        </Stack>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack marginX="auto" mt={4} spacing={1} sx={{ width: 1 / 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel id="select-test-type">Select Test Type</FormLabel>
                  <Controller
                    name="ts_id"
                    control={control}
                    defaultValue=""
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                      <RadioGroup
                        row
                        aria-labelledby="select-test-type"
                        {...field}
                      >
                        {testSeries?.data?.ts?.map((item: any) => (
                          <FormControlLabel
                            key={item.test_type}
                            value={item.id}
                            control={<Radio />}
                            label={item.test_type}
                          />
                        ))}
                      </RadioGroup>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel id="select-topic">Select Categories</FormLabel>
                  <Controller
                    name="tsc_id"
                    control={control}
                    defaultValue={[]}
                    rules={{ required: "Please select at least one category" }}
                    render={({ field }) => (
                      <FormGroup aria-labelledby="select-topic">
                        {testSeries?.data?.tsc.map((item: Categories) => (
                          <FormControlLabel
                            key={item.id}
                            control={
                              <Checkbox
                                {...field}
                                value={item.id.toString()}
                                checked={field.value.includes(
                                  item.id.toString()
                                )}
                                onChange={(event, checked) => {
                                  if (checked) {
                                    field.onChange([
                                      ...field.value,
                                      event.target.value,
                                    ]);
                                  } else {
                                    field.onChange(
                                      field.value.filter(
                                        (value) => value !== event.target.value
                                      )
                                    );
                                  }
                                }}
                                // onClick={console.log("click")}
                                // onClick={(e: any) =>
                                //   mutation.mutate(e.target.value)
                                // }
                              />
                            }
                            label={item.tsc_type}
                          />
                        ))}
                      </FormGroup>
                    )}
                  />
                </FormControl>
              </Grid>

              {/* Product Name */}
              <Grid item xs={12}>
                <Controller
                  name="p_name"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth sx={{ bgcolor: "white" }}>
                      <TextField
                        {...field}
                        label="Product Name"
                        variant="outlined"
                        // placeholder="Product Name"
                        required
                        sx={{ backgroundColor: "white" }}
                      />
                    </FormControl>
                  )}
                />
              </Grid>

              {/* Product Description */}
              <Grid item xs={12}>
                <Controller
                  name="p_description"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth sx={{ bgcolor: "white" }}>
                      <TextField
                        {...field}
                        // fullWidth
                        multiline
                        rows={2}
                        label="Product Description"
                        // placeholder="Product Description"
                        variant="outlined"
                        required
                        sx={{ backgroundColor: "white" }}
                      />
                    </FormControl>
                  )}
                />
              </Grid>

              {/* Product Price */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="p_price"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth sx={{ bgcolor: "white" }}>
                      <TextField
                        {...field}
                        fullWidth
                        label="Product Price"
                        // placeholder="Product Price"
                        variant="outlined"
                        required
                        sx={{ backgroundColor: "white" }}
                      />
                    </FormControl>
                  )}
                />
              </Grid>

              {/* Product Image */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="p_image"
                  defaultValue=""
                  // accept="image/*"
                  control={control}
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormControl fullWidth sx={{ bgcolor: "white" }}>
                      <Input
                        {...field}
                        type="file"
                        // fullWidth
                        // label="Product Image"
                        // variant="outlined"
                        value={value?.fileName}
                        onChange={(event: any) => {
                          onChange(event.target.files[0]);
                        }}
                        required
                        sx={{ backgroundColor: "white" }}
                      />
                    </FormControl>
                  )}
                />
              </Grid>

              {/* Product Month Limit */}
              <Grid item xs={12} sm={6}>
                <InputLabel id="demo-controlled-open-select-label">
                  Test Month Limit
                </InputLabel>
                <Controller
                  name="test_month_limit"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl fullWidth sx={{ bgcolor: "white" }}>
                      <Select
                        {...field}
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        placeholder="select"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={3}>3 Months</MenuItem>
                        <MenuItem value={6}>6 Months</MenuItem>
                        <MenuItem value={12}>12 Months</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>

              {/* Total Questions */}
              {/* <Grid item xs={12} sm={4}>
                <Controller
                  name="total_question"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      // label="Total Questions"
                      placeholder="Total Questions"
                      variant="outlined"
                      required
                      sx={{ backgroundColor: "white" }}
                    />
                  )}
                />
              </Grid> */}

              {/* Duration */}
              {/* <Grid item xs={12} sm={4}>
                <Controller
                  name="duration"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      // label="Duration"
                      placeholder="Duration"
                      variant="outlined"
                      required
                      sx={{ backgroundColor: "white" }}
                    />
                  )}
                />
              </Grid> */}

              {/*Product Release Date */}
              <Grid item xs={12} md={6}>
                <InputLabel id="release-date">Release Date</InputLabel>
                <Controller
                  name="release_date"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth sx={{ bgcolor: "white" }}>
                      <TextField
                        {...field}
                        type="date"
                        sx={{ text: "hidden" }}
                      />
                    </FormControl>
                  )}
                />
              </Grid>

              <OButton3
                type={addTSProductMU.isLoading ? "button" : "submit"}
                name={addTSProductMU.isLoading ? "Adding..." : "Add"}
                css={{ marginTop: "1rem" }}
              />
            </Grid>
          </Stack>
        </form>
      </Container>

      <AddTestSetModal
        open={open}
        // handleOpen={handleOpen}
        handleClose={handleClose}
        // handleSubmit={handleSubmit}
        // setCsvData={setCsvData}
        restAddProduct={reset}
        data={data}
        categoryObj={category}
      />
    </>
  );
};

export default AddTestSeries;
