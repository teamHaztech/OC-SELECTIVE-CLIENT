import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  Box,
  FormControl,
  Grid,
  InputBase,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useState } from "react";
import AlertBox from "../Common/AlertBox";
import { BButton2 } from "../Common/Button";
import adminTokenAxios from "../../Hooks/AdminTokenAxios";
import LoadingBar from "../Headers/LoadingBar";

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

type FormValues = {
  Question: string;
  OPTION_A: string;
  OPTION_B: string;
  OPTION_C: string;
  OPTION_D: string;
  OPTION_E: string;
  OPTION_F: string;
  OPTION_G: string;
  OPTION_H: string;
  Answer: string;
  Explanation: string;
};

interface ModalProps {
  handleOpen?: () => void;
  handleClose?: () => void;
  open: boolean;
  setOpen: any;
  qId: number;
  handleAlertBoxOpen: () => void;
  setQuestionId: any;
  readingTopicD: any;
}

const ReadingQuestionEditModal = ({
  open,
  setOpen,
  qId,
  handleAlertBoxOpen,
  setQuestionId,
  readingTopicD,
}: ModalProps) => {
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

  const handleClose = () => {
    reset();
    setQuestionId?.(null);
    setOpen(false);
    // readingTopicD.refetch();
  };

  const getReadingQuestion = useQuery({
    queryKey: ["get-Reading-Question", qId],
    queryFn: async () => {
      try {
        const response = await adminTokenAxios.get(
          `admin/get-reading-question-id/${qId}`
        );

        return response?.data?.question;
      } catch (error) {
        console.error(error);
      }
    },
    enabled: !!qId,
  });

  const updateReadingQuestionMU = useMutation({
    mutationFn: async (formattedData: any) => {
      return await adminTokenAxios.put(
        `/admin/update-reading-question-id/${qId}`,
        formattedData
      );
    },
    onError: (error: any) => {
      console.error("Error creating user:", error.response?.data);
    },
    onSuccess: (res) => {
      handleAlertBoxOpen?.();
      handleClose?.();
      readingTopicD.refetch();
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formattedData = {
      tst_id: qId,
      question: {
        question: data.Question,
        option_1: data.OPTION_A,
        option_2: data.OPTION_B,
        option_3: data.OPTION_C,
        option_4: data.OPTION_D,
        option_5: data.OPTION_E,
        option_6: data.OPTION_F,
        option_7: data.OPTION_G,
        option_8: data.OPTION_H,
        correct_option: data.Answer,
        explanation: data.Explanation,
      },
    };

    try {
      updateReadingQuestionMU.mutate(formattedData);
    } catch (error) {}
  };

  if (getReadingQuestion.isLoading) {
    return <LoadingBar />;
  }

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

            <Box>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={1}>
                  <Grid item xs={3}>
                    <Typography variant="subtitle1">Question</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Controller
                      name="Question"
                      defaultValue={getReadingQuestion.data?.question}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          variant="outlined"
                          placeholder="Question"
                          sx={{ backgroundColor: "white" }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="subtitle1">Option A</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Controller
                      name="OPTION_A"
                      defaultValue={getReadingQuestion.data?.option_1}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          variant="outlined"
                          placeholder="Option A"
                          sx={{ backgroundColor: "white" }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="subtitle1">Option B</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Controller
                      name="OPTION_B"
                      defaultValue={getReadingQuestion.data?.option_2}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          variant="outlined"
                          placeholder="Option B"
                          sx={{ backgroundColor: "white" }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="subtitle1">Option C</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Controller
                      name="OPTION_C"
                      defaultValue={getReadingQuestion.data?.option_3}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          variant="outlined"
                          sx={{ backgroundColor: "white" }}
                          placeholder="Option C"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="subtitle1">Option D</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Controller
                      name="OPTION_D"
                      defaultValue={getReadingQuestion.data?.option_4}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          variant="outlined"
                          placeholder="Option D"
                          sx={{ backgroundColor: "white" }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="subtitle1">Option E</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Controller
                      name="OPTION_E"
                      defaultValue={getReadingQuestion.data?.option_5}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          variant="outlined"
                          placeholder="Option E"
                          sx={{ backgroundColor: "white" }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="subtitle1">Option F</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Controller
                      name="OPTION_F"
                      defaultValue={getReadingQuestion.data?.option_6}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          variant="outlined"
                          placeholder="Option F"
                          sx={{ backgroundColor: "white" }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="subtitle1">Option G</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Controller
                      name="OPTION_G"
                      defaultValue={getReadingQuestion.data?.option_7}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          variant="outlined"
                          sx={{ backgroundColor: "white" }}
                          placeholder="Option G"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="subtitle1">Option H</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Controller
                      name="OPTION_H"
                      defaultValue={getReadingQuestion.data?.option_8}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          variant="outlined"
                          placeholder="Option H"
                          sx={{ backgroundColor: "white" }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="subtitle1">Correct Option</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Controller
                      name="Answer"
                      defaultValue={
                        getReadingQuestion.data?.correct_option === "A"
                          ? "1"
                          : getReadingQuestion.data?.correct_option === "B"
                          ? "2"
                          : getReadingQuestion.data?.correct_option === "C"
                          ? "3"
                          : "4"
                      }
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          fullWidth
                          variant="outlined"
                          placeholder="Answer"
                          sx={{ backgroundColor: "white" }}
                        >
                          <MenuItem value="1">Option A</MenuItem>
                          <MenuItem value="2">Option B</MenuItem>
                          <MenuItem value="3">Option C</MenuItem>
                          <MenuItem value="4">Option D</MenuItem>
                          <MenuItem value="5">Option E</MenuItem>
                          <MenuItem value="6">Option F</MenuItem>
                          <MenuItem value="7">Option G</MenuItem>
                          <MenuItem value="8">Option H</MenuItem>
                        </Select>
                      )}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="subtitle1">Explanation</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Controller
                      name="Explanation"
                      defaultValue={getReadingQuestion.data?.explanation}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          variant="outlined"
                          placeholder="Explanation"
                          sx={{ backgroundColor: "white" }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Stack direction={"row"} spacing={2}>
                      {/* <BButton2 name="Next" type="submit" /> */}

                      <BButton2
                        name={
                          updateReadingQuestionMU.isLoading
                            ? "Submiting"
                            : "Submit"
                        }
                        type="submit"
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ReadingQuestionEditModal;
