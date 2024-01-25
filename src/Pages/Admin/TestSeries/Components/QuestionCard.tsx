import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { BButton } from "../../../../Components/Common/Button";
import EditQuestion from "../../../../Components/Model/EditQuestion";

interface QuestionCardProps {
  questionNo?: number;
  conversation?: string | null;
  paragraph?: string | null;
  question: string;
  options: {
    [key: string]: string;
  };
  images?: any;
  answer: string;
  explanation: string;
  index: number;
  data:any,
  updateData:any
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  // questionNo,
  updateData,
  conversation,
  paragraph,
  question,
  options,
  answer,
  explanation,
  images,
  index,
  data
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = (index: number) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card>
        <CardContent>
          {paragraph && (
            <Typography variant="h6" component="h2">
              Question : {paragraph}
            </Typography>
          )}
          {conversation && (
            <Typography variant="h6" component="h2">
              {paragraph ? conversation : `Question : ${conversation}`}
            </Typography>
          )}
          {
            <Typography variant="h6" component="h2">
              {conversation || paragraph ? question : `Question : ${question} `}
            </Typography>
          }
          {images && images.length !== 0 && (
            <ImageList
              sx={{
                width: "100%",
                // maxHeight: "340px",
                maxWidth: "hidden",
                flex: "column",
                justifyContent: "space-between",
              }}
              cols={3}
            >
              {images.map((item: any, key: number) => (
                <ImageListItem key={key} sx={{ width: "200px" }}>
                  <img
                    src={import.meta.env.VITE_IMAGE_URL + item}
                    alt={`Image ${import.meta.env.VITE_IMAGE_URL + item}`}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          )}
          <List disablePadding>
            {Object.keys(options).map((optionKey) => (
              <ListItem key={optionKey} disablePadding>
                {/* <input type="radio" name={`question${index}`} value={optionKey} />
              {options[optionKey]} */}
                <ListItemIcon>{optionKey.toUpperCase()}</ListItemIcon>
                <ListItemText primary={options[optionKey]} />
              </ListItem>
            ))}
          </List>
          <Typography variant="subtitle1" component="p">
            Correct Answer: {answer.toUpperCase()}
          </Typography>
          <Typography variant="body2" component="p">
            Explanation: {explanation}
          </Typography>
          
        </CardContent>
        <BButton name="edit" func={() => handleOpen(index)} css={{margin:"10px"}}/>
      </Card>
      <EditQuestion
      updateData={updateData}
        open={open}
        handleClose={handleClose}
        data={{
          conversation: conversation,
          paragraph: paragraph,
          question: question,
          options_1: options.a,
          options_2: options.b,
          options_3: options.c,
          options_4: options.d,
          answer: answer,
          explanation: explanation,
        }}
        index={index}
        allData={data}
      />
    </>
  );
};

export default QuestionCard;
