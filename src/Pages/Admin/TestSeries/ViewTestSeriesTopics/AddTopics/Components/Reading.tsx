import {
  Box,
  Button,
  Container,
  FormLabel,
  Grid,
  Pagination,
  Stack,
} from "@mui/material";
import React, { useMemo, useRef, useState } from "react";
import { BButton2 } from "../../../../../../Components/Common/Button";
import DownloadPDF from "../../../Components/PDF/DownloadPDF";
import AlertBox from "../../../../../../Components/Common/AlertBox";
import { useMutation, useQuery } from "@tanstack/react-query";
import adminTokenAxios from "../../../../../../Hooks/AdminTokenAxios";
import QuestionCard from "../../../Components/QuestionCard";
import "react-quill/dist/quill.snow.css";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { useNavigate } from "react-router-dom";
import { Header1 } from "../../../../../../Components/Common/HeaderText";
import SelectBox from "../../../../../../Components/Common/Select";
import AddReadingQuestion from "./AddReadingQuestion";

import ReactQuill, { Quill } from "react-quill";
import JoditReact from "jodit-react-ts";
import "jodit/build/jodit.min.css";

type CsvItem = {
  Answer: string;
  Conversation?: string;
  Paragraph?: string;
  Explanation: string;
  Option_A: string;
  Option_B: string;
  Option_C: string;
  Option_D: string;
  Question: string;
};

type mapData = {
  Conversation?: string;
  Paragraph?: string;
  Answer: string;
  Explanation: string;
  Options: string[];
  Question: string;
  images?: string[];
};
interface ReadingProps {
  formData?: any;

  reset?: any;
  edit?: boolean;
  topicId?: any;
  handleClose?: () => void;
  setTopic?: any;
}

const style: any = {
  "qlToolbar qlSnow ": { height: "200px" },
  qlEditor: {
    backgroundColor: "white",
  },
};

const config = {
  minHeight: 500,
};

const Reading = ({
  formData,

  reset,
  edit,
  topicId,
  handleClose,
  setTopic,
}: ReadingProps) => {
  // const [category, topicGen, totalQuestions, testType, topicName] = formData;
  const [resData, setResData] = useState([]);
  const [open, setOpen] = useState<boolean>(false);
  const [errMessage, setErrMessage] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [value, setValue] = useState("");
  const [questions, setQuestions] = useState<any>([]); // State to store questions
  const [currentQuestion, setCurrentQuestion] = useState(""); // State to store the current question
  const [selectValue, setSelectValue] = useState(0);

  const [formData1, setFormData1] = useState<any>(null);
  console.log("EDITOR TEXT", value);

  const navigate = useNavigate();

  // Function to handle input changes
  const handleInputChange = (e: any) => {
    setCurrentQuestion(e.target.value);
  };

  //next button for passage
  const handleNextPassage = () => {
    setFormData1({
      readingId: selectValue,
      passage: value,
    });
  };

  // Function to handle "Next" button click
  const handleNextClick = () => {
    if (currentQuestion.trim() !== "") {
      setQuestions([...questions, { question: currentQuestion }]);
      setCurrentQuestion(""); // Clear the input field
    }
  };

  // Function to handle "Submit" button click
  const handleSubmit = () => {
    if (currentQuestion.trim() !== "") {
      setQuestions([...questions, { question: currentQuestion }]);
    }
    // Do something with the questions array (e.g., send to a server)
  };

  let toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"],
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = resData.slice(startIndex, endIndex);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setCurrentPage(newPage);
  };

  const handleAlertBoxOpen = () => {
    setOpen(true);
  };

  const handleAlertBoxClose = () => {
    setOpen(false);
  };

  const [open2, setOpen2] = useState<boolean>(false);
  const handleAlertBoxOpen2 = () => {
    setOpen2(true);
  };

  const handleAlertBoxClose2 = () => {
    setOpen2(false);
  };

  const getReadingSetNames = async () => {
    try {
      const response = await adminTokenAxios.get(`admin/get-reading-topic`); //need to change the api
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const readingSetNameQuery = useQuery({
    queryKey: ["readingSetNames"],
    queryFn: getReadingSetNames,
  });
  // console.log("iggggggggg", selectValue);

  const handleAddNewPassage = () => {
    setValue("");
    setFormData1(null);
  };
  return (
    <Container
      maxWidth="lg"
      sx={{
        width: "96%",
        my: 1,
        // backgroundColor: "#F5F5F5",
      }}
      disableGutters
    >
      <AlertBox
        name={errMessage}
        type="error"
        bol={open}
        handleAlertBoxClose={handleAlertBoxClose}
      />

      <AlertBox
        name="Successfully added Topic"
        type="success"
        bol={open2}
        handleAlertBoxClose={handleAlertBoxClose2}
      />

      <>
        {!edit && (
          <Stack direction="row">
            {/* <Button
              onClick={() => navigate(-1)}
              size="small"
              variant="contained"
              color="primary"
              sx={{ paddingRight: "1rem" }}
            >
              <ArrowBackIosNewRoundedIcon />
              Back
            </Button> */}

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
        )}
        {/* <Grid item xs={12}> */}
        <Stack spacing={1} mt={2}>
          {formData1 ? (
            <AddReadingQuestion
              tst_id={selectValue || topicId}
              passage={value}
              handleAddNewPassage={handleAddNewPassage}
            />
          ) : (
            <>
              {!edit && (
                <>
                  <FormLabel
                    sx={{ fontWeight: "900", fontSize: "1.1rem" }}
                    id="upload-csv"
                  >
                    Select Reading Set
                  </FormLabel>
                  <SelectBox
                    name="select-test-type"
                    defaultValue="1"
                    selectName="set-name"
                    options={readingSetNameQuery?.data?.reading_topics}
                    func={setSelectValue}
                  />
                </>
              )}

              <FormLabel
                sx={{ fontWeight: "900", fontSize: "1.1rem" }}
                id="upload-csv"
              >
                Add Passage
              </FormLabel>

              <Stack spacing={4}>
                <div className="">
                  {/* <ReactQuill
                    // className="h-40"
                    theme="snow"
                    value={value}
                    onChange={setValue}
                    modules={modules}
                    formats={formats}
                    style={style}
                    placeholder="Add Your Passage Here..."
                  /> */}

                  <JoditReact
                    onChange={(content: any) => setValue(content)}
                    config={config}
                  />
                </div>

                <BButton2 name="next" func={handleNextPassage} />
              </Stack>
            </>
          )}
        </Stack>
        {/* </Grid> */}
      </>

      {/* {resData?.length > 1 && (
        <>
          <Stack alignItems={"center"} mt={2} mb={1}>
            <Pagination
              color="secondary"
              variant="outlined"
              count={Math.ceil(resData.length / itemsPerPage)} // Calculate the number of pages
              page={currentPage}
              onChange={handlePageChange}
            />
          </Stack>
          <Stack spacing={2}>
            {currentData?.map((questionData: any, index: any) => (
              <QuestionCard
                key={index}
                // questionNo={index + 1}
                paragraph={questionData?.Paragraph}
                conversation={questionData?.Conversation}
                images={questionData?.images}
                question={questionData?.Question}
                options={questionData?.Options}
                answer={questionData?.Answer}
                explanation={questionData?.Explanation}
              />
            ))}
          </Stack>
          <Stack alignItems={"center"} mt={2} mb={1}>
            <Pagination
              color="secondary"
              variant="outlined"
              count={Math.ceil(resData.length / itemsPerPage)} // Calculate the number of pages
              page={currentPage}
              onChange={handlePageChange}
            />
          </Stack>
        </>
      )} */}
    </Container>
  );
};

export default Reading;
