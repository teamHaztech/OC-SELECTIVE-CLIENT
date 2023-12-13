import { Box, Dialog, MenuItem, Select, Stack, TextField } from "@mui/material";
import React from "react";
import { Input } from "../Common/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import SelectBox from "../Common/Select";
import { BButton } from "../Common/Button";
import { ParaText1 } from "../Common/ParaText";
type Inputs = {
  questionNo?: number;
  conversation?: string | null;
  paragraph?: string | null;
  question: string;
  options_1: string;
  options_2: string;
  options_3: string;
  options_4: string;
  answer: string;
  explanation: string;
};
const EditQuestion = ({
  open,
  handleClose,
  data,
  index,
  allData,
  updateData,
}: {
  open: boolean;
  handleClose: () => void;
  data: Inputs;
  index: number;
  allData: any;
  updateData: any;
}) => {
  const { register, handleSubmit, control } = useForm<Inputs>();
  // console.log(data);
  const onSubmit: SubmitHandler<Inputs> = async (para_data: Inputs) => {
    // console.log(para_data);
    const newData = allData?.map((item: any, key: number) => {
      if (key == index) {
        // console.log(key == index);
        item.Question = para_data.question;
        item.Explanation = para_data.explanation;
        item.Answer = para_data.answer;
        item.Options = {
          a: para_data.options_1,
          b: para_data.options_2,
          c: para_data.options_3,
          d: para_data.options_4,
        };
        if (para_data.paragraph) {
          item.Paragraph = para_data.paragraph;
        }
        if (para_data.conversation) {
          item.Conversation = para_data.conversation;
        }
        delete item.options_1;
        delete item.options_2;
        delete item.options_3;
        delete item.options_4;
        return item;
      }
      return item;
    });
    console.log(allData[index], newData[index]);
    handleClose();
    updateData(newData);
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      sx={{
        // padding:"40px",
        "& .MuiDialog-paper": {
          margin: { lg: "20px", md: "40px", sm: "40px", xs: "0px" },
          p: 0,
          width: "575px",
          height: "600px",
          marginBottom: "60px",
          //   paddingBottom: "40px",
        },
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          // spacing={3}
          sx={{
            width: { lg: "550px", md: "450px", sm: "450px", xs: "340px" },
            height: "500px",
            display: "flex",
            flexDirection: "column",
            //   justifyContent: "center",
            rowGap: "30px",
            py: "20px",
            paddingBottom: "40px",
            m: "auto",
            px: "10px",
          }}
        >
          <Box>
            <ParaText1 text={"Question"} css={{ textAlign: "left" }} />
            <TextField
              sx={{
                width: "100%",
              }}
              multiline
              rows={3}
              {...register("question")}
              defaultValue={data.question}
            />
          </Box>
          {data.paragraph && (
            <Box>
              <ParaText1 text={"Paragraph"} css={{ textAlign: "left" }} />
              <TextField
                sx={{
                  width: "100%",
                }}
                multiline
                rows={3}
                {...register("paragraph")}
                defaultValue={data.paragraph}
              />
            </Box>
          )}
          {data.conversation && (
            <Box>
              <ParaText1 text={"conversation"} css={{ textAlign: "left" }} />
              <TextField
                sx={{
                  width: "100%",
                }}
                multiline
                rows={3}
                {...register("conversation")}
                defaultValue={data.conversation}
              />
            </Box>
          )}
          <Stack flexDirection={"row"} columnGap={2}>
            <Input
              label="option_1"
              type="text"
              reg={register("options_1")}
              defaultVal={data.options_1}
              css={{ width: "50%" }}
            />

            <Input
              label="options_2"
              type="text"
              reg={register("options_2")}
              defaultVal={data.options_2}
              css={{ width: "50%" }}
            />
          </Stack>

          <Stack flexDirection={"row"} columnGap={2}>
            <Input
              label="options_3"
              type="text"
              reg={register("options_3")}
              defaultVal={data.options_3}
              css={{ width: "50%" }}
            />
            <Input
              label="options_4"
              type="text"
              reg={register("options_4")}
              defaultVal={data.options_4}
              css={{ width: "50%" }}
            />
          </Stack>
          <Box>
            <ParaText1 text={"Answer"} css={{ textAlign: "left" }} />
            <Select
              sx={{
                fontSize: "16px",
                width: "100%",
                height: "48px",
                border: "1px #1D1D1D",
                backgroundColor: "#FFFFFF",
                color: "black",
              }}
              {...register("answer")}
              defaultValue={data?.answer?.toLowerCase()}
              // label={props.label}
            >
              <MenuItem value="a" >Option_A</MenuItem>
              <MenuItem value="b">Option_B</MenuItem>
              <MenuItem value="c">Option_C</MenuItem>
              <MenuItem value="d">Option_D</MenuItem>
            </Select>
          </Box>
          {/* <Input
            label="Explanation"
            type="text"
            reg={register("explanation")}
            defaultVal={data.explanation}
            css={{ width: "100%", height: "70%" }}
          /> */}
          <Box>
            <ParaText1 text={"Explanation"} css={{ textAlign: "left" }} />
            <TextField
              sx={{
                width: "100%",
              }}
              multiline
              rows={8}
              {...register("explanation")}
              defaultValue={data.explanation}
            />
          </Box>

          <BButton name="Submit" type="submit" css={{ marginBottom: "10px" }} />
        </Stack>
      </form>
    </Dialog>
  );
};

export default EditQuestion;
