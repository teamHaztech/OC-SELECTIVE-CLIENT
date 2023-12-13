import { Box, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
// import randomicon from "../../../../utils/randomicon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas, faB } from "@fortawesome/free-solid-svg-icons";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import Canvas1 from "./component/Canvas1";
library.add(fas);
library.add(faB);
import RedoIcon from "@mui/icons-material/Redo";
import randomicon from "../../../../utils/randomicon";
import { ParaText1 } from "../../../../Components/Common/ParaText";
import redo from "../../../../Assets/images/Icon/redo.png";
const outerSquare = {
  width: "160px", // Set the desired width of the outer square
  height: "160px", // Set the desired height of the outer square
  // border: `1px solid black`, // Light color border
  // display: "flex",
  // wrap: "wrap",
  // justifyContent: "center",
};
const innerSquare = {
  width: "100%", // Each inner square takes up 50% of the outer square
  height: "50%", // Each inner square takes up 50% of the outer square

  // display: "flex",
  // justifyContent: "center",
  // alignItems: "center",
};
const image_style = {
  width: "50%",
  height: "50%",
  margin: "auto",
  color: "#000000",
  border: 1,
  p: 16,
  backgroundColor: "#ffffff",
};
const innerSquare2 = {
  width: "50%",
  height: "100%",
};
const innerSquare3 = {
  minWidth: "100%",
  minHeight: "100%",
  border: `1px solid #000000"`,
};
const gridItem = {
  border: "0px solid #000000",
  width: "100%",
  height: "100%",
  // padding: "1rem",
  // textAlign: "center",
};

const Paper1 = async (index: number, questionRefs: any) => {
  //   const i = Math.floor(Math.random() * 4) + 5;
  const shapes: any = [
    "circle",
    "play",
    "star",
    "star-half",
    "heart",
    "diamond",
  ];
  const gridData: any = [];
  for (let i = 0; i <= 8; i++) {
    let random = Math.floor(Math.random() * 6);
    let imageData = shapes[random];
    gridData.push(imageData);
  }
  let newData: any = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const options: any = [];
  const gridArr: any = [];
  let question: any = {};
  let random = Math.floor(Math.random() * 3) + 4;
  console.log(random);
  let c = 0;
  for (let j = random; j >= 0; j--) {
    const random = Math.floor(Math.random() * (newData.length - 1 - c));

    console.log(random, newData.length - 1 - c);

    gridArr.push(newData[random]);
    let temp = newData[random];
    newData[random] = newData[newData.length - 1];
    newData[newData.length - 1] = temp;
    c++;
  }
  let count = 0;

  // for (let i = 5; i >= 0; i--) {
  //   let random = Math.floor(Math.random() * (i + 1));
  //   // let imageData = randomicon();
  //   newData.push(imageData);
  // }
  console.log("icons", gridData, gridArr);
  let question_image = (
    <Stack
      p={1}
      ref={questionRefs.current[index].questionRef}
      // display={"grid"}
      flexDirection={"row"}
      columnGap={"3px"}
      // gridColumn={"auto auto auto"}
      width={"70%"}
      // maxWidth={"100%"}
    >
      <Stack width={"100%"}>
        <Box border={"1px solid #000000"} sx={{ ...outerSquare }}>
          <Box borderBottom={"1px dotted #000000"} sx={{ ...innerSquare }}>
            <UndoOutlinedIcon
              sx={{
                width: "20px",
                height: "20px",
                // position: "absolute",
                marginLeft: "70px",
                marginTop: "70px",
                zIndex: "2",
                transform: "rotate(270deg)",
              }}
            />
          </Box>

          {/* <Divider
            sx={{
              width: "100%",
              mt: "78px",
              // height:"10px"
              // borderColor: "#000000",
              borderBottom: "1px dotted #000000",
            }}
          /> */}
        </Box>
        <ParaText1 text="X" css={{ marginX: "auto" }} />
      </Stack>

      <Stack width={"100%"}>
        <Stack sx={{ ...outerSquare, border: "none" }}>
          <Box
            border={"1px dotted #000000"}
            borderBottom={"0"}
            sx={{ ...innerSquare }}
          ></Box>
          <Box border={"1px solid #000000"} sx={{ ...innerSquare }}>
            <Box
              borderRight={"1px dotted #000000"}
              // borderBottom={"0"}
              sx={{
                ...innerSquare2,
              }}
            >
              {/* <img
                src={redo}
                style={{
                  width: "20px",
                  height: "20px",
                  // position: "absolute",
                  marginLeft: "70px",
                  // marginRight: "60px",
                  // marginTop: "40px",
                  zIndex: "2",
                  // backgroundColor: "red",
                  transform: "rotate(180deg)",
                }}
              /> */}
              <RedoIcon
                sx={{
                  width: "20px",
                  height: "20px",
                  // position: "absolute",
                  marginLeft: "68px",
                  // marginRight: "60px",
                  marginTop: "30px",
                  zIndex: "2",
                  // backgroundColor: "red",
                  transform: "rotate(180deg)",
                }}
              />
            </Box>
            {/* <Divider
              sx={{
                height: "100%",
            
                // my: "auto",
                // borderColor: "#000000",
                mx: "auto",
                borderLeft: "1px dotted #000000",
              }}

              // orientation="vertical"
            /> */}
          </Box>
        </Stack>
        <ParaText1 text="Y" css={{ marginX: "auto" }} />
      </Stack>

      <Stack width={"100%"}>
        <Stack sx={{ ...outerSquare, border: "none" }}>
          <Box
            border={"1px dotted #000000"}
            borderBottom={"0"}
            sx={{ ...innerSquare }}
          ></Box>
          <Stack sx={{ ...innerSquare }} flexDirection={"row"}>
            <Box
              border={"1px solid #000000"}
              // borderBottom={"0"}
              sx={{
                ...innerSquare2,
                display: "grid",
                gridTemplateColumns: "auto auto auto",
              }}
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((item: number) => {
                if (gridArr.includes(item)) {
                  return (
                    <Box
                      // border={"0"}
                      // borderBottom={"0"}
                      sx={{ ...gridItem }}
                    >
                      <FontAwesomeIcon
                        style={{
                          ...image_style,
                          // transform: `rotate(${ans.rotation[0]}deg)`,
                        }}
                        icon={gridData[count++]}
                      />
                      {/* {item} */}
                    </Box>
                  );
                }
                return (
                  <Box
                    // border={"1px solid #000000"}
                    // borderBottom={"0"}
                    sx={{ ...gridItem }}
                  ></Box>
                );
              })}
              <Box
                border={"1px solid #000000"}
                // borderBottom={"0"}
                sx={{ ...gridItem }}
              ></Box>
            </Box>
            <Box
              border={"1px dotted #000000"}
              borderLeft={"0"}
              sx={{ ...innerSquare2 }}
            ></Box>
          </Stack>
        </Stack>
        <ParaText1 text="Z" css={{ marginX: "auto" }} />
      </Stack>
    </Stack>
  );
  const scale = [-1, 1, 1, -1];
  const deg = [180, 180, 0, 0];
  const scale2 = [-1, -1, 1, 1];
  const deg2 = [270, 270, 270, 270];
  let temp_options = [
    <Box
      ref={questionRefs.current[index].optionRefs[0]}
      sx={{
        ...outerSquare,
        display: "grid",
        gridTemplateColumns: "auto auto",
      }}
    >
      {[0, 1, 2, 3].map((item: number) => {
        count = 0;
        return (
          <Stack
            // sx={{ ...gridItem }}
            // flexDirection={"row"}
            sx={{
              ...innerSquare3,
              transform: `scaleX(${scale[item]}) rotate(${deg[item]}deg)`,
              border: "1px solid black",
              display: "grid",
              gridTemplateColumns: "auto auto auto",
            }}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((item: number, key) => {
              if (gridArr.includes(item)) {
                return (
                  <Box sx={{ ...gridItem }}>
                    <FontAwesomeIcon
                      style={{
                        ...image_style,
                      }}
                      icon={gridData[count++]}
                    />
                    {/* {item} */}
                  </Box>
                );
              }
              return <Box sx={{ ...gridItem }}></Box>;
            })}
          </Stack>
        );
      })}
    </Box>,
    <Box
      ref={questionRefs.current[index].optionRefs[0]}
      sx={{
        ...outerSquare,
        display: "grid",
        gridTemplateColumns: "auto auto",
      }}
    >
      {[0, 3, 1, 2].map((item: number, key) => {
        count = 0;
        return (
          <Stack
            // sx={{ ...gridItem }}
            // flexDirection={"row"}
            sx={{
              ...innerSquare3,
              transform: `scaleX(${scale[key]}) scaleY(${scale[item]}) rotate(${deg[key]}deg)`,
              border: "1px solid black",
              display: "grid",
              gridTemplateColumns: "auto auto auto",
            }}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((item: number, key) => {
              if (gridArr.includes(item)) {
                return (
                  <Box sx={{ ...gridItem }}>
                    <FontAwesomeIcon
                      style={{
                        ...image_style,
                      }}
                      icon={gridData[count++]}
                    />
                    {/* {item} */}
                  </Box>
                );
              }
              return <Box sx={{ ...gridItem }}></Box>;
            })}
          </Stack>
        );
      })}
    </Box>,
    <Box
      ref={questionRefs.current[index].optionRefs[0]}
      sx={{
        ...outerSquare,
        display: "grid",
        gridTemplateColumns: "auto auto",
      }}
    >
      {[0, 1, 3, 2].map((item: number, key) => {
        count = 0;
        return (
          <Stack
            // sx={{ ...gridItem }}
            // flexDirection={"row"}
            sx={{
              ...innerSquare3,
              transform: `scaleY(${scale2[key]}) scaleX(${scale[item]})rotate(${deg2[key]}deg)`,
              border: "1px solid black",
              display: "grid",
              gridTemplateColumns: "auto auto auto",
            }}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((item: number, key) => {
              if (gridArr.includes(item)) {
                return (
                  <Box sx={{ ...gridItem }}>
                    <FontAwesomeIcon
                      style={{
                        ...image_style,
                      }}
                      icon={gridData[count++]}
                    />
                    {/* {item} */}
                  </Box>
                );
              }
              return <Box sx={{ ...gridItem }}></Box>;
            })}
          </Stack>
        );
      })}
    </Box>,
    <Box
      ref={questionRefs.current[index].optionRefs[0]}
      sx={{
        ...outerSquare,
        display: "grid",
        gridTemplateColumns: "auto auto",
      }}
    >
      {[1, 0, 2, 3].map((item: number, key) => {
        count = 0;
        return (
          <Stack
            // sx={{ ...gridItem }}
            // flexDirection={"row"}
            sx={{
              ...innerSquare3,
              transform: `scaleY(${scale2[key]}) scaleX(${scale[item]}) rotate(${deg2[key]}deg)`,
              border: "1px solid black",
              display: "grid",
              gridTemplateColumns: "auto auto auto",
            }}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((item: number, key) => {
              if (gridArr.includes(item)) {
                return (
                  <Box sx={{ ...gridItem }}>
                    <FontAwesomeIcon
                      style={{
                        ...image_style,
                      }}
                      icon={gridData[count++]}
                    />
                    {/* {item} */}
                  </Box>
                );
              }
              return <Box sx={{ ...gridItem }}></Box>;
            })}
          </Stack>
        );
      })}
    </Box>,
  ];

  let correct_ans = -1;
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
  question.question_image = question_image;
  question.options = options;
  question.question =
    "The following question consists of a set of three figures X, Y and Z showing a sequence of folding of a piece of paper. Fig (Z) shows the manner in which the folded paper has been cut. These three figures are followed by four answer figures from which you have to choose a figure which would most closely resemble the unfolded form fig. (Z).";
  question.correct_ans = correct_ans;
  // return question;
  // console.log(questionRefs);

  return Promise.resolve(question);
};

export default Paper1;
