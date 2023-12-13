import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Header1 } from "../../../../../Components/Common/HeaderText";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import adminTokenAxios from "../../../../../Hooks/AdminTokenAxios";
import CSVParser from "../../Components/CSVParser";

import GenerateQuestions from "../../Components/GenerateQuestions";
import LoadingBar from "../../../../../Components/Headers/LoadingBar";
import { Link, useNavigate } from "react-router-dom";

import Reading from "./Components/Reading";
import Thinking from "./Components/Thinking";
import MathGen from "./Components/MathGen";
import { BButton2 } from "../../../../../Components/Common/Button";

type FormValues = {
  ts_id: string;
  tsc_id: string;
  topic: string;
  topic_name: string;
  total_questions: string | number;
};

const AddTopics = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [csvData, setCsvData] = useState<any>([]);
  const [newReadingSet, setNewReadingSet] = useState(false);
  const [addQuestionToReadingSet, setAddQuestionToReadingSet] = useState(false);

  // const [generate, setGenerate] = useState<boolean>(false);
  // const [currentIndex, setCurrentIndex] = useState(0);
  // const [formData, setFormData] = useState<any>(null);

  const navigate = useNavigate();

  // console.log(csvData.length);
  console.log("csvData", csvData);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const handleSubmit = () => {
  //   handleClose();
  //   console.log(csvData);
  // };

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  // const handleGenerate = () => {
  //   const generate = getValues();
  //   setTopic(generate.topic);
  //   setGenerate(true);
  // };

  const formData = watch([
    "tsc_id",
    "topic",
    "total_questions",
    "ts_id",
    "topic_name",
  ]);
  const tsc_id = watch("tsc_id");
  const handleSubmitData = () => {
    // setGenerate(false);
  };

  const ReadingTopicmutation = useMutation({
    mutationFn: () => {
      return adminTokenAxios.post(`admin/add-reading-topic`, {
        t_name: formData[4],
        tsc_id: formData[0],
        ts_id: formData[3],
        topic: formData[4],
      });
    },
    onSuccess: (data) => {
      navigate("add-question-to-reading-set");
    },
  });

  const handleSubmitReading = () => {
    ReadingTopicmutation.mutate();
    // navigate("add-question-to-reading-set");
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // const formattedData = {
    //   ts_id: data.ts_id,
    //   tsc_id: data.tsc_id,
    // };
    // console.log("AddTopics", data);
    // console.log("AddTopics", data.topic);
    // setTopic(data.topic);
  };

  // const [subTopics, setSubTopics] = useState<any>([]);

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

  if (testSeries.isLoading) return <LoadingBar />;
  // const mutation = useMutation({
  //   mutationFn: (selectedTopic: any) => {
  //     return adminTokenAxios.get(
  //       `admin/get-test-series-topics/${selectedTopic}`
  //     );
  //   },
  //   onSuccess: (data) => {
  //     const transformedData =
  //       data?.data?.tst.map((item: any) => ({
  //         value: item.id,
  //         label: item.t_name,
  //       })) || []; // Set the data to the state variable

  //     setSubTopics(transformedData);
  //   },
  // });

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          width: "96%",
          my: 1,
          // mx: "auto",
          // py: 2,
          // minHeight: "100vh",
          // display: "flex",
          // flexDirection: "column",
          // border: 1,
          // height: "auto",
          backgroundColor: "#F5F5F5",
        }}
        disableGutters
      >
        <Stack direction="row">
          <Button
            size="small"
            variant="contained"
            color="primary"
            sx={{ paddingRight: "1rem" }}
            type={"button"}
            onClick={()=>navigate(-1)}
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
            <Header1 header="Add Topics" />
          </Stack>
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          // spacing={2}
          paddingY={2}
        >
          {/* <Box>
            <Header1 header="Add Topics" />
          </Box> */}

          {/* <Stack direction="row" spacing={1}>
            <OButton
              func={handleOpen}
              name="Upload Topics"
              children={<UploadIcon />}
            />
          </Stack> */}
        </Stack>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={1}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel
                    sx={{ fontWeight: "900", fontSize: "1.1rem" }}
                    id="select-test-type"
                  >
                    Select Test Type
                  </FormLabel>
                  <Controller
                    name="ts_id"
                    control={control}
                    defaultValue="" // Set default value as needed
                    rules={{ required: "This field is required" }} // Add validation rules as needed
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
                  <FormLabel
                    sx={{ fontWeight: "900", fontSize: "1.1rem" }}
                    id="select-category"
                  >
                    Select Subject
                  </FormLabel>
                  <Controller
                    name="tsc_id"
                    control={control}
                    defaultValue="" // Set default value as needed
                    rules={{ required: "This field is required" }} // Add validation rules as needed
                    render={({ field }) => (
                      <RadioGroup
                        row
                        aria-labelledby="select-category"
                        {...field}
                        // onChange={handleRadioChange}
                      >
                        {testSeries?.data?.tsc.map((item: any) => (
                          <FormControlLabel
                            // onClick={(e: any) =>
                            //   mutation.mutate(e.target.value)
                            // }
                            key={item.tsc_type}
                            value={item.id}
                            control={<Radio />}
                            label={item.tsc_type}
                          />
                        ))}
                      </RadioGroup>
                    )}
                  />
                </FormControl>
              </Grid>

              {formData[0] === "2" &&
                (!newReadingSet ? (
                  <Grid item xs={12}>
                    <Stack spacing={2} direction={"row"}>
                      <Button
                        variant="contained"
                        onClick={() => setNewReadingSet(true)}
                      >
                        Add New Reading Set
                      </Button>
                      <Link to={"add-question-to-reading-set"}>
                        <Button
                          variant="contained"
                          onClick={() => setAddQuestionToReadingSet(true)}
                        >
                          Add Questions To Set
                        </Button>
                      </Link>
                    </Stack>
                  </Grid>
                ) : (
                  <></>
                ))}

              {(!(tsc_id == "2") || newReadingSet) && (
                <>
                  <Grid item xs={12} sm={4}>
                    <Stack spacing={1}>
                      <FormLabel
                        sx={{ fontWeight: "900", fontSize: "1.1rem" }}
                        id="enter-topic-name"
                      >
                        {tsc_id == "2"
                          ? "Enter Reading Name"
                          : "Enter Topic Name"}
                      </FormLabel>
                      <Controller
                        name="topic_name"
                        control={control}
                        defaultValue=""
                        rules={{ required: "This field is required" }} // Add any other validation rules here
                        render={({ field }) => (
                          <TextField
                            {...field}
                            // label="Enter Topic
                            placeholder="Enter Topic Name"
                            variant="outlined"
                            // sx={{ width: "50%" }}
                            // error={!!errors.inputField}
                            // helperText={errors.inputField ? errors.inputField.message : ''}
                          />
                        )}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Stack spacing={1}>
                      <FormLabel
                        sx={{ fontWeight: "900", fontSize: "1.1rem" }}
                        id="enter-topic"
                      >
                        {tsc_id == "2"
                          ? "Enter Reading Set Name"
                          : "Enter Topic Name For AI To Generate"}
                      </FormLabel>
                      <Controller
                        name="topic"
                        control={control}
                        defaultValue=""
                        rules={{ required: "This field is required" }} // Add any other validation rules here
                        render={({ field }) => (
                          <TextField
                            {...field}
                            // label="Enter Topic
                            placeholder="Enter Topic"
                            variant="outlined"
                            // sx={{ width: "50%" }}
                            // error={!!errors.inputField}
                            // helperText={errors.inputField ? errors.inputField.message : ''}
                          />
                        )}
                      />
                    </Stack>
                  </Grid>
                  {/* <Grid item xs={12} sm={4}>
                    <Stack spacing={1}>
                      <FormLabel
                        sx={{ fontWeight: "900", fontSize: "1.1rem" }}
                        id="demo-controlled-open-select-label"
                      >
                        Total Questions
                      </FormLabel>
                      <Controller
                        name="total_questions"
                        control={control}
                        defaultValue={""}
                        disabled={tsc_id == "2"}
                        render={({ field }) => (
                          <FormControl fullWidth>
                            <Select
                              {...field}
                              labelId="demo-controlled-open-select-label"
                              id="demo-controlled-open-select"
                              placeholder="Enter Total Questions"
                         
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                            
                              <MenuItem value={15}>15</MenuItem>
                              <MenuItem value={20}>20</MenuItem>
                              <MenuItem value={25}>25</MenuItem>
                              <MenuItem value={30}>30</MenuItem>
                              <MenuItem value={50}>50</MenuItem>
                            </Select>
                          </FormControl>
                        )}
                      />
                    </Stack>
                  </Grid> */}
                </>
              )}
              { (formData[0] == "1" || formData[0] == "3") &&
                <Grid item xs={12} sm={4}>
                  <Stack spacing={1}>
                    <FormLabel
                      sx={{ fontWeight: "900", fontSize: "1.1rem" }}
                      id="demo-controlled-open-select-label"
                    >
                      Total Questions
                    </FormLabel>
                    <Controller
                      name="total_questions"
                      control={control}
                      defaultValue={""}
                      disabled={tsc_id == "2"}
                      render={({ field }) => (
                        <FormControl fullWidth>
                          <Select
                            {...field}
                            placeholder="Enter Total Questions"
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {
                              
                            }
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={15}>15</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={25}>25</MenuItem>
                            <MenuItem value={30}>30</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Stack>
                </Grid>
              }
              {parseInt(formData[0]) == 3 && (
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <FormLabel
                      sx={{ fontWeight: "900", fontSize: "1.1rem" }}
                      id="upload-csv"
                    >
                      Upload CSV
                    </FormLabel>
                    <CSVParser csvData={csvData} setCsvData={setCsvData} />
                  </Stack>
                </Grid>
              )}
              {/* {parseInt(formData[0]) == 2 && (
                <>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <FormLabel
                        sx={{ fontWeight: "900", fontSize: "1.1rem" }}
                        id="upload-csv"
                      >
                        Add Passage
                      </FormLabel>

                      <ReactQuill
                        // className="h-52"
                        theme="snow"
                        value={value}
                        onChange={setValue}
                        modules={modules}
                        formats={formats}
                      />
                    </Stack>
                  </Grid>

                </>
              )} */}

              {/* <OButton3  name="Add" css={{ marginTop: "1rem" }} /> */}
              {newReadingSet && (
                // <Reading
                //   formData={formData}
                //   csvData={csvData}
                //   setCsvData={setCsvData}
                //   reset={reset}
                //   edit={false}
                // />
                <Grid item xs={12} justifyContent="center" alignItems="center ">
                  <BButton2 name={"Submit"} func={handleSubmitReading} />
                </Grid>
              )}
            </Grid>

            {/* {csvData.length > 0 ? (
              <Stack marginY="1rem" direction="row">
                <BButton2 type="button" func={handleGenerate} name="Generate" /> */}
            {/* <OButton3
                  type="submit"
                  name="Upload"
                  css={{ width: "360px" }}
                /> */}
          </Stack>
        </form>

        {/* <Stack spacing={2}>
          {csvData?.data.map((questionData: any, index: any) => (
            <QuestionCard
              key={index}
              questionNo={index + 1}
              question={questionData.Question}
              Option_A={questionData.Option_A}
              Option_B={questionData.Option_B}
              Option_C={questionData.Option_C}
              Option_D={questionData.Option_D}
              answer={questionData.Answer}
              explanation={questionData.Explanation}
            />
          ))}
        </Stack> */}

        {/* {generate ? ( */}
        {/* <GenerateQuestions
          topic1={formData}
          csvData={csvData}
          setCsvData={setCsvData}
          reset={reset}
          edit={false}
        /> */}

        {formData[0] === "1" && formData[1] && (
          <MathGen formData={formData} reset={reset} edit={false} />
        )}

        {formData[0] === "3" && formData[1] && (
          <Thinking
            formData={formData}
            csvData={csvData}
            setCsvData={setCsvData}
            reset={reset}
            edit={false}
          />
        )}

        {/* {GenerateQuestions()} */}
      </Container>
      {/* 
      <UploadModal
        open={open}
        // handleOpen={handleOpen}
        handleClose={handleClose}
        // handleSubmit={handleSubmit}
        setCsvData={setCsvData}
      /> */}
    </>
  );
};

export default AddTopics;
