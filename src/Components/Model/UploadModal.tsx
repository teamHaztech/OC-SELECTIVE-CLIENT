import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import {
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";

import { useEffect, useState } from "react";

import CSVParser from "../../Pages/Admin/TestSeries/Components/CSVParser";
import GenerateQuestions from "../../Pages/Admin/TestSeries/Components/GenerateQuestions";
import MathGen from "../../Pages/Admin/TestSeries/ViewTestSeriesTopics/AddTopics/Components/MathGen";
import Reading from "../../Pages/Admin/TestSeries/ViewTestSeriesTopics/AddTopics/Components/Reading";
import Thinking from "../../Pages/Admin/TestSeries/ViewTestSeriesTopics/AddTopics/Components/Thinking";
import { Controller, useForm } from "react-hook-form";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",

  height: "100%",
  minHeight: "300px",
  maxHeight: "calc(100vh - 200px)",
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

interface ModalProps {
  handleOpen?: () => void;
  handleClose?: () => void;
  handleSubmit?: () => void;
  open: boolean;
  setCsvData?: any;
  topic: any;
  topicId?: number | string;
  setTopic?: any;
}
type FormValues = {
  total_questions: string | number;
};
const UploadModal = ({
  open,
  handleClose,
  // setCsvData,
  handleSubmit,
  topic,
  topicId,
  setTopic,
}: ModalProps) => {
  // const [result, setResult] = useState<any>(null);
  const [csvData, setCsvData] = useState<any>([]);
  console.log("topicId", topicId, topic);
  const {
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  topic[2] =  watch("total_questions");


  // console.log("topicId", topic);
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
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              sx={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
              }}
            >
              <CloseIcon />
            </IconButton>
            {/* <Stack spacing={3}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Upload CSV File"
                  type="file"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton edge="start">
                          <CloudUploadIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button size="large" variant="contained">
                  Upload
                </Button>
              </Stack> */}
            {(topic[0] == "1" || topic[0] == "3") && (
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
                    disabled={topic[0] == "2"}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <Select {...field} placeholder="Enter Total Questions">
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {}
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
            )}
            {topic[0] == 3 && (
              <Stack spacing={1}>
                <FormLabel
                  sx={{ fontWeight: "900", fontSize: "1.1rem" }}
                  id="upload-csv"
                >
                  Upload CSV
                </FormLabel>
                <CSVParser csvData={csvData} setCsvData={setCsvData} />
              </Stack>
            )}

            {/* <GenerateQuestions
              topicId={topicId}
              edit={true}
              topic1={topic}
              csvData={csvData}
              // topic={topic}
              setCsvData={setCsvData}
              handleClose={handleClose}
              setTopic={setTopic}
              // reset={reset}
            /> */}

            {topic[0] == 1 && (
              <MathGen
                formData={topic}
                topicId={topicId}
                // reset={reset}
                edit={true}
              />
            )}
            {topic[0] == 2 && (
              <Reading
                formData={topic}
                // reset={reset}
                topicId={topicId}
                edit={true}
              />
            )}
            {topic[0] == 3 && (
              <Thinking
                formData={topic}
                csvData={csvData}
                setCsvData={setCsvData}
                // reset={reset}
                topicId={topicId}
                edit={true}
              />
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default UploadModal;
