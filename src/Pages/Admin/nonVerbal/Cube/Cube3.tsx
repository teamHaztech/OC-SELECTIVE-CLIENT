import React from "react";
import { Grid, Paper } from "@mui/material";
import { fas, faB } from "@fortawesome/free-solid-svg-icons";
import { Icon, IconName, library } from "@fortawesome/fontawesome-svg-core";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ParaText1 } from "../../../../Components/Common/ParaText";
import randomicon from "../../../../utils/randomicon";
library.add(fas);
library.add(faB);
const TBox = {
  height: "60px",
  width: "60px",
  borderRadius: 0,
  border: 0,
  boxShadow: "0px 0px",
  opacity: 0.0,
};
const Line = {
  lineHeight: 0,
  display: "flex",
  justifyContent: "center",
  alignItem: "center",
};
const DBox = {
  height: "60px",
  width: "60px",
  borderRadius: 0,
  border: "0",
  padding: "0px",
  display: "flex",
  justifyContent: "center",
  alignItem: "center",
};
// const image_style = {
//   width: "100%",
//   height: "100%",
//   margin: "auto",
//   color: "#ffffff",
//   border: 0,
//   p: 16,
//   backgroundColor: "#000000",
// };

// 6 - [5,7, 9,2,4,6][1,3,5,6,8,10],2-[1,2,3,9,10,11],[3,4,5,7,8,9]
const Cube3 = (index: number, questionRefs: any): any => {
  let eArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  let diceArray: number[] = [3, 4, 5, 7, 8, 9]; //[0,1,2,3,4,5]
  let value = 0;

  const random = Math.floor(Math.random() * 4);
  const shapeRandom = Math.floor(Math.random() * 2);
  const allColor = ["red", "blue", "green","black"]
  const image_style = {
  width: "100%",
  height: "100%",
  margin: "auto",
  color: "#ffffff",
  border: 0,
  p: 16,
  backgroundColor: allColor[random],
};
  let row = 0;
  let col = 0;
  if (random == 1) {
    const arr = [
      [2, 4, 6, 5, 7, 9],
      [1, 3, 5, 6, 8, 10],
    ];
    row = 6;
    col = 2;
    diceArray = arr[shapeRandom];
  } else if (random == 0) {
    const arr = [
      [1, 2, 3, 9, 10, 11],
      [3, 4, 5, 7, 8, 9],
    ];
    row = 2;
    col = 6;
    diceArray = arr[shapeRandom];
  } else if (random == 2) {
    const arr = [
      [1, 2, 5, 8, 11, 12],
      [3, 2, 5, 8, 11, 10],
    ];
    row = 4;
    col = 3;
    diceArray = arr[shapeRandom];
  } else {
    const arr = [
      [1, 5, 6, 7, 8, 12],
      [4, 5, 6, 7, 8, 9],
    ];
    row = 3;
    col = 4;
    diceArray = arr[shapeRandom];
  }

  const tDiceIcons: IconName[] = [
    "dice-one",
    "dice-two",
    "dice-three",
    "dice-four",
    "dice-five",
    "dice-six",
  ];

  let diceIcons: IconName[] = [];

  for (let index = tDiceIcons.length - 1; index >= 0; index--) {
    const random = Math.floor(Math.random() * index);
    diceIcons.push(tDiceIcons[random]);
    let temp = tDiceIcons[random];
    tDiceIcons[random] = tDiceIcons[index];
    tDiceIcons[index] = temp;
  }
  // console.log(option);
  
  // for (let i = 5; i >= 0; i--) {
  //   let random = Math.floor(Math.random() * (i + 1));
  //   let imageData = randomicon();
  
  //   diceIcons.push(imageData.type);
  // }

  let question: any = {};
  let count = 0;
  let question_image = (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      maxWidth={"480px"}
      // maxHeight={"437px"}
      ref={questionRefs.current[index].questionRef}
    >
      <Grid item sx={{ w: "60%", m: "auto", backgroundColor: "transparent" }}>
        {eArray.slice(0, row).map((rowItem, rowIndex) => {
          // console.log(rowIndex * col, (rowIndex + 1) * col);
          return (
            <Grid
              container
              sx={{ w: "100%", m: "auto" }}
              columns={3}
              key={rowIndex}
            >
              {eArray
                .slice(rowIndex * col, (rowIndex + 1) * col)
                .map((colItem, colIndex) => {
                  // console.log(colItem);
                  const dice = diceArray.find(
                    (item: number) => item === colItem
                  );
                  if (dice) {
                    return (
                      <Grid item key={colIndex}>
                        <Paper style={DBox}>
                          {/* {colItem} */}
                          <FontAwesomeIcon
                            icon={diceIcons[count++]}
                            style={image_style}
                          ></FontAwesomeIcon>
                        </Paper>
                      </Grid>
                    );
                  } else {
                    return (
                      <Grid item key={colIndex}>
                        <Paper style={TBox}> {colItem}</Paper>
                      </Grid>
                    );
                  }
                })}
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
  const randomQ = Math.floor(Math.random() * 6);
  let ans = "";
  let t = 0;
  let temp = diceIcons[randomQ].split("-")[1];
  if (random > 1) {
    switch (randomQ) {
      case 0:
        ans = diceIcons[5].split("-")[1];
        t = diceArray[5];
        break;
      case 1:
        ans = diceIcons[3].split("-")[1];
        t = diceArray[3];
        break;
      case 2:
        ans = diceIcons[4].split("-")[1];
        4;
        t = diceArray[4];
        break;
      case 3:
        ans = diceIcons[1].split("-")[1];
        t = diceArray[1];
        break;
      case 4:
        ans = diceIcons[2].split("-")[1];
        t = diceArray[2];
        break;
      case 5:
        ans = diceIcons[0].split("-")[1];
        t = diceArray[0];
        break;
    }
  } else {
    switch (randomQ) {
      case 0:
        ans = diceIcons[2].split("-")[1];
        t = diceArray[2];
        break;
      case 1:
        ans = diceIcons[4].split("-")[1];
        t = diceArray[4];
        break;
      case 2:
        ans = diceIcons[0].split("-")[1];
        t = diceArray[0];
        break;
      case 3:
        ans = diceIcons[5].split("-")[1];
        t = diceArray[5];
        break;
      case 4:
        ans = diceIcons[1].split("-")[1];
        t = diceArray[1];
        break;
      case 5:
        ans = diceIcons[3].split("-")[1];
        t = diceArray[3];
        break;
    }
  }

  // console.log(diceArray, diceArray[randomQ], t);
  const option = tDiceIcons.filter(
    (item: string) =>
      item.split("-")[1] != ans &&
      item.split("-")[1] != diceIcons[randomQ].split("-")[1]
  );
  // console.log(option);
  let temp_options = [
    ans,
    option[0].split("-")[1],
    option[2].split("-")[1],
    option[1].split("-")[1],
  ];
  // let correct_ans = -1;
  // const options: any = [];
  // for (let i = 3; i >= 0; i--) {
  //   let random = Math.floor(Math.random() * (i + 1));
  //   if (random == 0 && correct_ans < 0) {
  //     correct_ans = 3 - i + 1;
  //   }
  //   options.push(temp_options[random]);
  //   let temp = temp_options[random];
  //   temp_options[random] = temp_options[i];
  //   temp_options[i] = temp;
  // }
  // question.question = `
  // How many dots lie opposite to the face having ${
  //   diceIcons[randomQ]?.split("-")[1]
  // } dots, when the given figure is folded to form a cube?`;
  // question.question_image = question_image;
  // question.options = options;
  // question.correct_ans = correct_ans;

  let correct_ans = -1;
  const options: any = [];
  for (let i = 3; i >= 0; i--) {
    let random = Math.floor(Math.random() * (i + 1));
    if (random == 0 && correct_ans < 0) {
      correct_ans = 3 - i + 1;
    }
    options.push(temp_options[random]);
    let temp = temp_options[random];
    temp_options[random] = temp_options[i];
    temp_options[i] = temp;
  }
  question.question = `
  How many dots lie opposite to the face having ${
    diceIcons[randomQ]?.split("-")[1]
  } dots, when the given figure is folded to form a cube?`;
  question.question_image = question_image;
  question.options = options;
  question.correct_ans = correct_ans;

  return question;
};

export default Cube3;
