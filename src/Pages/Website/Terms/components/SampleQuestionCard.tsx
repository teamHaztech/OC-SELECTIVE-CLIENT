import {
  Box,
  Card,
  CardContent,
  FormControlLabel,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const SampleQuestionCard = ({ currentData }: { currentData: any }) => {

  return currentData?.map((questionData: any, index: any) => (
    <Card key={index} sx={{marginBottom:1}}>
      <CardContent>
        {questionData.paragraph && (
          <Typography variant="h6" component="h2">
            Question : {questionData.paragraph}
          </Typography>
        )}
        {questionData.conversation && (
          <Typography variant="h6" component="h2">
            {questionData.paragraph
              ? questionData.conversation
              : `Question : ${questionData.conversation}`}
          </Typography>
        )}
        {
          <Typography variant="h6" component="h2">
            {questionData.conversation || questionData.paragraph
              ? questionData.question
              : `Question : ${questionData.question} `}
          </Typography>
        }
        {/* <p>{questionData?.question_image?.length}</p> */}
        {questionData.question_image && questionData.question_image.length !== 0 && (
          <ImageList
            sx={{
              width: "80%",
              // maxHeight: "340px",
              maxWidth: "hidden",
              flex: "column",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
            cols={3}
          >
            {questionData.question_image.map((item: any, key: number) => (
              <ImageListItem
                key={key}
                sx={{
                  width: "200px",
                }}
              >
                <img
                  src={import.meta.env.VITE_IMAGE_URL + item.image_url}
                  alt={`Image ${import.meta.env.VITE_IMAGE_URL + item.name}`}
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}
        <Box>
          <Stack mb={1} flexDirection={"row"} columnGap={1}>
          <Typography>{`A `} </Typography>
            {questionData.option_1.endsWith(".png" || ".jpeg" || ".jpg") ? (
              <img
                src={import.meta.env.VITE_IMAGE_URL + questionData.option_1}
                style={{ maxWidth: "200px" }}
              />
            ) : (
              <Typography>{questionData.option_1}</Typography>
            )}
          </Stack>

          <Stack mb={1} flexDirection={"row"} columnGap={1}>
          <Typography>{`B  `} </Typography>
            {questionData.option_2.endsWith(".png" || ".jpeg" || ".jpg") ? (
              <img
                src={import.meta.env.VITE_IMAGE_URL + questionData.option_2}
                style={{ maxWidth: "200px" }}
              />
            ) : (
              <Typography>{questionData.option_2}</Typography>
            )}
          </Stack>
          <Stack mb={1} flexDirection={"row"} columnGap={1}>
          <Typography>{`C  `} </Typography>
            {questionData.option_3.endsWith(".png" || ".jpeg" || ".jpg") ? (
              <img
                src={import.meta.env.VITE_IMAGE_URL + questionData.option_3}
                style={{ maxWidth: "200px" }}
              />
            ) : (
              <Typography>{questionData.option_3}</Typography>
            )}
          </Stack>
          <Stack mb={1} flexDirection={"row"} columnGap={1}>
          <Typography>{`D `} </Typography>
            {questionData.option_4.endsWith(".png" || ".jpeg" || ".jpg") ? (
              <img
                src={import.meta.env.VITE_IMAGE_URL + questionData.option_4}
                style={{ maxWidth: "200px" }}
              />
            ) : (
              <Typography>{questionData.option_4}</Typography>
            )}
          </Stack>
        </Box>
        {/* <List disablePadding>
          {Object.keys(questionData.options).filter((optionKey) => {
            return (
              <ListItem key={optionKey} disablePadding>
                <ListItemIcon>{optionKey}</ListItemIcon>
                <ListItemText primary={questionData.options[optionKey]} />
              </ListItem>
            );
          })}
        </List> */}
        <Typography variant="h6">
          Correct Answer: {questionData.correct_option}
        </Typography>
        <Typography variant="h6">
          Explanation: {questionData.explanation}
        </Typography>
      </CardContent>
    </Card>
  ));
};

export default SampleQuestionCard;
