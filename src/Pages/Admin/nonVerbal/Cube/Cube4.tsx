import React from "react";
import { Grid, Paper, Stack } from "@mui/material";
import { fas, faB } from "@fortawesome/free-solid-svg-icons";
import { Icon, IconName, library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ParaText1 } from "../../../../Components/Common/ParaText";
import randomicon from "../../../../utils/randomicon";
library.add(fas);
library.add(faB);
const TBox = {
  height: "40px",
  width: "40px",
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
  height: "40px",
  width: "40px",
  borderRadius: 0,
  border: "1px solid #000000",
  padding: "0px",
  display: "flex",
  justifyContent: "center",
  alignItem: "center",
};
// const image_style = {
//   width: "50%",
//   height: "50%",
//   margin: "auto",
//   color: "#red",
//   border: 0,

//   p: 16,
// };

// 6 - [5,7, 9,2,4,6][1,3,5,6,8,10],2-[1,2,3,9,10,11],[3,4,5,7,8,9]
const Cube4 = (index: number, questionRefs: any): any => {
  let eArray: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  let diceArray: number[] = []; //[0,1,2,3,4,5]
  let value = 0;
  // randomicon()
  const random = Math.floor(Math.random() * 4);
  // const random = 2;
  const shapeRandom = Math.floor(Math.random() * 2);
  let row = 0;
  let col = 0;
  let new_option: Array<number[]> = [];
  const image_style = {
    width: "50%",
    height: "50%",
    margin: "auto",
    color:
      random == 0
        ? "red"
        : random == 1
        ? "blue"
        : random == 2
        ? "green"
        : "purple",
    border: 0,
    p: 16,
  };
  if (random == 1) {
    const arr = [
      [2, 4, 6, 5, 7, 9],
      [1, 3, 5, 6, 8, 10],
    ];
    const arr2 = [
      [
        [5, 6, 4],
        [4, 5, 6],
        [2, 5, 4],
        [5, 7, 6],
      ],
      [
        [3, 5, 6],
        [5, 6, 3],
        [1, 3, 6],
        [6, 5, 8],
      ],
    ];
    row = 6;
    col = 2;
    new_option = arr2[shapeRandom];
    diceArray = arr[shapeRandom];
  } else if (random == 0) {
    const arr = [
      [1, 2, 3, 9, 10, 11],
      [3, 4, 5, 7, 8, 9],
    ];
    const arr2 = [
      [
        [3, 2, 9],
        [3, 9, 10],
        [10, 3, 9],
        [11, 3, 10],
      ],
      [
        [3, 9, 4],
        [3, 8, 9],
        [7, 8, 3],
        [5, 4, 9],
      ],
    ];
    row = 2;
    col = 6;
    new_option = arr2[shapeRandom];

    diceArray = arr[shapeRandom];
  } else if (random == 2) {
    const arr = [
      [1, 2, 5, 8, 11, 12],
      [2, 3, 5, 8, 11, 10],
    ];
    const arr2 = [
      [
        [2, 1, 5],
        [8, 11, 12],
        [12, 8, 11],
        [1, 5, 2],
      ],
      [
        [2, 5, 3],
        [8, 10, 11],
        [3, 2, 5],
        [10, 11, 8],
      ],
    ];
    row = 4;
    col = 3;
    new_option = arr2[shapeRandom];
    diceArray = arr[shapeRandom];
  } else {
    const arr = [
      [1, 5, 6, 7, 8, 12],
      [4, 5, 6, 7, 8, 9],
    ];
    row = 3;
    col = 4;
    const arr2 = [
      [
        [1, 5, 6],
        [8, 7, 12],
        [12, 7, 8],
        [6, 5, 1],
      ],
      [
        [4, 7, 8],
        [7, 8, 4],
        [9, 5, 6],
        [6, 5, 9],
      ],
    ];
    new_option = arr2[shapeRandom];
    diceArray = arr[shapeRandom];
  }
  // console.log(random, diceArray);
  let diceIcons: IconName[] = [];
  // for (let i = 3; i > 0; i--) {
  //   let random = Math.floor(Math.random() * (i + 1));
  //   let imageData:IconName[] =  ["1", "2", "3", "4", "5", "6"];
  //   diceIcons.push(imageData[random]);
  // }
  let tDiceIcons: IconName[] = [
    "circle",
    "square",
    "diamond",
    "star",
    "plus",
    "x",
    "o",
    "0",
    "times",
    "dot-circle",
    "square-full",
  ];
  for (let index = tDiceIcons.length - 1; index >= 0; index--) {
    const random = Math.floor(Math.random() * index);
    diceIcons.push(tDiceIcons[random]);
    let temp = tDiceIcons[random];
    tDiceIcons[random] = tDiceIcons[index];
    tDiceIcons[index] = temp;
  }

  // console.log(diceIcons);

  let question: any = {};
  const randomAns = Math.floor(Math.random() * 4) + 1;

  let OptionAns: any = [];
  let OptionRan: any = [];
  let qArr: any = [];
  let tempArr = diceArray.slice();

  for (let i = 0; i < 3; i++) {
    let random = Math.floor(Math.random() * (tempArr.length - i));
    const temp = tempArr[random];
    qArr.push(tempArr[random]);
    tempArr[random] = tempArr[tempArr.length - 1 - i];
    tempArr[tempArr.length - 1 - i] = temp;
  }
  // console.log(randomAns);

  for (let index = 0; index < 4; index++) {
    const random = Math.floor(Math.random() * (3 - index));
    // console.log(new_option[random][0],new_option[random][1],new_option[random][2]);
    if (index < randomAns) {
      OptionAns.push([
        new_option[random][0],
        new_option[random][1],
        new_option[random][2],
      ]);
    } else {
      OptionRan.push([
        new_option[random][1],
        new_option[random][2],
        new_option[random][0],
      ]);
    }

    // Swap elements in arr
    const temp = new_option[random];
    new_option[random] = new_option[3 - index];
    new_option[3 - index] = temp;
  }

  // console.log(diceArray);
  const all_option = OptionAns.concat(OptionRan);
  console.log(OptionAns, OptionRan);
  let correct_ans: number[] = [];
  let correct_option: any = [
    [3, 2, 0, 1],
    [2, 3, 0, 1],
    [2, 3, 1, 0],
    [3, 2, 1, 0],
  ];
  let ans = "";
  let temp_options: any = [];
  let options: any = [];
  // for (let i = 0; i < 4; i++) {
  const ansRandom = Math.floor(Math.random() * 4);

  console.log(random);
  // if (options.length <= OptionAns.length - 1) {
  let c: any = {};
  switch (OptionAns.length) {
    case 1:
      c.one = correct_option[ansRandom].findLastIndex(
        (item: any) => item === 0
      );
      c.filter = correct_option[ansRandom].filter(
        (item: any) => item !== c.one
      );
      console.log(c.filter);

      correct_ans = [c.one + 1];
      options = [
        all_option[correct_option[ansRandom][0]],
        all_option[correct_option[ansRandom][1]],
        all_option[correct_option[ansRandom][2]],
        all_option[correct_option[ansRandom][3]],
      ];
      temp_options = [
        [
          `${c.one + 1} only`,
          `${c.filter[0] + 1} only`,
          `${c.filter[1] + 1} only`,
          `${c.filter[2] + 1} only`,
        ],
        [
          `${c.one + 1} only`,
          `${c.filter[1] + 1} and ${c.one + 1} only`,
          `${c.filter[0] + 1} only`,
          `${c.filter[2] + 1} and ${c.filter[1] + 1} only`,
        ],
        [
          `${c.one + 1} only`,
          `${c.one + 1},${c.filter[0] + 1} and ${c.filter[1] + 1} only`,
          `${c.filter[1] + 1},${c.filter[2] + 1} only`,
          `${c.filter[2] + 1} only`,
        ],
        [
          `${c.one + 1}`,
          `${c.one + 1} and ${c.filter[0] + 1} only`,
          `${c.filter[1] + 1},${c.filter[2] + 1} and ${c.filter[0] + 1}`,
          `${c.filter[0] + 1},${c.three + 1} and ${c.two + 1} `,
          `${c.filter[0] + 1},${c.filter[1] + 1},${c.filter[2] + 1} and ${
            c.one + 1
          } `,
        ],
      ];
      break;
    case 2:
      c.one = correct_option[ansRandom].findLastIndex(
        (item: any) => item === 0
      );
      c.two = correct_option[ansRandom].findLastIndex(
        (item: any) => item === 1
      );
      temp_options = [`${c.one + 1} and ${c.two + 1} only`];
      correct_ans = [c.one + 1, c.two + 1];
      options = [
        all_option[correct_option[ansRandom][0]],
        all_option[correct_option[ansRandom][1]],
        all_option[correct_option[ansRandom][2]],
        all_option[correct_option[ansRandom][3]],
      ];
      c.filter = correct_option[ansRandom].filter(
        (item: any) => ![c.one, c.two].includes(item)
      );
      temp_options = [
        [
          `${c.one + 1} and ${c.two + 1} only`,
          `${c.filter[0] + 1} and ${c.two + 1} only`,
          `${c.filter[0] + 1} and ${c.one + 1} only`,
          `${c.filter[0] + 1} and ${c.filter[1] + 1} only`,
        ],
        [
          `${c.one + 1}and ${c.two + 1} only`,
          `${c.filter[1] + 1} only`,
          `${c.two + 1} and ${c.filter[1] + 1} only`,
          `${c.filter[0] + 1} only`,
        ],
        [
          `${c.one + 1} and ${c.two + 1} only`,
          `${c.one + 1},${c.filter[0] + 1} and ${c.filter[1] + 1} only`,
          `${c.filter[1] + 1},${c.two + 1} only`,
          `${c.two + 1} only`,
        ],
        [
          `${c.one + 1} and ${c.two + 1} only`,
          `${c.one + 1}`,
          `${c.filter[1] + 1},${c.two + 1} and ${c.filter[0] + 1}`,
          `${c.filter[0] + 1},${c.three + 1} and ${c.two + 1} `,
          `${c.filter[0] + 1},${c.filter[1] + 1},${c.two + 1} and ${
            c.one + 1
          } `,
        ],
      ];
      break;
    case 3:
      c.one = correct_option[ansRandom].findLastIndex(
        (item: any) => item === 0
      );
      c.two = correct_option[ansRandom].findLastIndex(
        (item: any) => item === 1
      );
      c.three = correct_option[ansRandom].findLastIndex(
        (item: any) => item === 2
      );

      correct_ans = [c.one + 1, c.two + 1, c.three + 1];
      options = [
        all_option[correct_option[ansRandom][0]],
        all_option[correct_option[ansRandom][1]],
        all_option[correct_option[ansRandom][2]],
        all_option[correct_option[ansRandom][3]],
      ];
      c.filter = correct_option[ansRandom].filter(
        (item: any) => ![c.one, c.two, c.three].includes(item)
      );
      temp_options = [
        [
          `${c.one + 1},${c.three + 1} and ${c.two + 1} only`,
          `${c.one + 1},${c.filter[0] + 1} and ${c.two + 1} only`,
          `${c.one + 1},${c.three + 1} and ${c.filter[0] + 1} only`,
          `${c.filter[0] + 1},${c.three + 1} and ${c.two + 1} only`,
        ],
        [
          `${c.one + 1},${c.three + 1} and ${c.two + 1} only`,
          `${c.three + 1} only`,
          `${c.two + 1} and ${c.three + 1} only`,
          `${c.filter[0] + 1} ,${c.three + 1} and ${c.two + 1} only`,
        ],
        [
          `${c.one + 1} and ${c.two + 1} only`,
          `${c.one + 1},${c.filter[0] + 1} and ${c.filter[1] + 1} only`,
          `${c.filter[1] + 1},${c.two + 1} only`,
          `${c.two + 1} only`,
        ],
        [
          `${c.one + 1},${c.three + 1} and ${c.two + 1} only`,
          `${c.one + 1}`,
          `${c.three + 1},${c.two + 1} `,
          `${c.one + 1},${c.three + 1}`,
          `${c.filter[0] + 1},${c.three + 1},${c.two + 1} and ${c.one + 1} `,
        ],
      ];
      break;
    default:
      c.one = correct_option[ansRandom].findLastIndex(
        (item: any) => item === 0
      );
      c.two = correct_option[ansRandom].findLastIndex(
        (item: any) => item === 1
      );
      c.three = correct_option[ansRandom].findLastIndex(
        (item: any) => item === 2
      );
      c.four = correct_option[ansRandom].findLastIndex(
        (item: any) => item === 3
      );
      c.filter = correct_option[ansRandom].filter(
        (item: any) => ![c.one, c.two, c.three, c.four].includes(item)
      );
      temp_options = [
        [
          `${c.one + 1},${c.three + 1},${c.four + 1} and ${c.two + 1}`,
          `${c.one + 1} only`,
          `${c.one + 1},${c.four + 1} and ${c.three + 1} only`,
          `${c.three + 1} and ${c.two + 1} only`,
        ],
        [
          `${c.one + 1},${c.three + 1},${c.four + 1} and ${c.two + 1}`,
          `${c.one + 1} only`,
          `${c.one + 1},${c.four + 1} and ${c.three + 1} only`,
          `${c.three + 1} only`,
        ],
        [
          `${c.one + 1},${c.three + 1},${c.four + 1} and ${c.two + 1}`,
          `${c.one + 1} and ${c.two + 1} only`,
          `${c.one + 1},${c.four + 1} and ${c.three + 1} only`,
          `${c.three + 1} and ${c.two + 1} only`,
        ],
        [
          `${c.one + 1},${c.three + 1},${c.four + 1} and ${c.two + 1}`,
          `${c.one + 1} only`,
          `${c.one + 1} only`,
          `${c.three + 1}  only`,
        ],
      ];
      correct_ans = [c.one + 1, c.two + 1, c.three + 1, c.four + 1];
      options = [
        all_option[correct_option[ansRandom][0]],
        all_option[correct_option[ansRandom][1]],
        all_option[correct_option[ansRandom][2]],
        all_option[correct_option[ansRandom][3]],
      ];
      break;
    // }
  }



  let count = 0;

  let question_image = (
    <Grid
      container
      flexDirection={"row"}
      justifyContent="space-between"
      alignItems="center"
      width={"100%"}
      ref={questionRefs.current[index].questionRef}
    >
      <Grid item sx={{ m: "auto", backgroundColor: "transparent" }}>
        {eArray.slice(0, row).map((rowItem: any, rowIndex: any) => {
          // console.log(rowIndex * col, (rowIndex + 1) * col);
          return (
            <Grid container sx={{ w: "100%", m: "auto" }} key={rowIndex}>
              {eArray
                .slice(rowIndex * col, (rowIndex + 1) * col)
                .map((colItem: any, colIndex: any) => {
                  // console.log(colItem);
                  const dice = diceArray.find(
                    (item: number) => item === colItem
                  );

                  if (dice) {
                    const icon: any = qArr.findLastIndex(
                      (item: any) => item === colItem
                    );
                    // console.log(icon);

                    return (
                      <Grid item key={colIndex}>
                        <Paper style={DBox}>
                          {/* {colItem} */}
                          {icon > -1 && (
                            <FontAwesomeIcon
                              icon={diceIcons[icon]}
                              style={image_style}
                            ></FontAwesomeIcon>
                          )}
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
        <ParaText1 text="(x)" css={{ textAlign: "center", my: "10px" }} />
      </Grid>
      <Grid>
        <Stack flexDirection={"row"}>
          {all_option.map((rowItem: any, rowIndex: number) => {
            // console.log(rowIndex * col, (rowIndex + 1) * col);
            // if (rowIndex < OptionAns.length) {
            // console.log(diceIcons[1]);
            let oCount = 0;
            const icon: any = qArr.findLastIndex(
              (item: any) => item === rowItem[0]
            );
            const icon2: any = qArr.findLastIndex(
              (item: any) => item === rowItem[1]
            );
            const icon3: any = qArr.findLastIndex(
              (item: any) => item === rowItem[2]
            );
            // // console.log( icon, icon2, icon3);
            let newArr = [icon, icon2, icon3].map((item: any) => {
              if (item && item === qArr[0]) {
                return 0;
              } else if (item && item === qArr[1]) {
                return 1;
              } else if (item && item === qArr[2]) {
                return 2;
              }
              return null;
            });

            // console.log(newArr, [icon, icon2, icon3]);

            return (
              <Stack>
                <Grid container sx={{ w: "100%", m: "auto" }} key={rowIndex}>
                  <div
                    className="cube2"
                    ref={questionRefs.current[index].questionRef}
                    key={index}
                  >
                    <div className="face2 top2" style={Line}>
                      {/* {rowItem[0]} */}
                      {!!(icon > -1) && (
                        <FontAwesomeIcon
                          style={image_style}
                          icon={diceIcons[icon]}
                        />
                      )}
                    </div>
                    <div className="face2 left2" style={Line}>
                      {/* {rowItem[1]} */}
                      {!!(icon2 > -1) && (
                        <FontAwesomeIcon
                          style={image_style}
                          icon={diceIcons[icon2]}
                        />
                      )}
                    </div>
                    <div className="face2 front2" style={Line}>
                      {/* {rowItem[2]} */}
                      {!!(icon3 > -1) && (
                        <FontAwesomeIcon
                          style={image_style}
                          icon={diceIcons[icon3]}
                        />
                      )}
                    </div>
                  </div>
                </Grid>
                <ParaText1
                  text={`(${rowIndex + 1})`}
                  css={{ textAlign: "center" }}
                />
              </Stack>
            );
          })}
        </Stack>
      </Grid>
    </Grid>
  );
  const optionRandom = Math.floor(Math.random() * 4);
  let all_Correct_ans = -1;
  const randomOption = []
  for (let i = 3; i >= 0; i--) {
    let random = Math.floor(Math.random() * (i + 1));
    if (random == 0 && all_Correct_ans < 0) {
      all_Correct_ans = 3 - i + 1;
    }
    randomOption.push(temp_options[optionRandom][random]);
    let temp = temp_options[optionRandom][random];
    temp_options[optionRandom][random] = temp_options[optionRandom][i];
    temp_options[optionRandom][i] = temp;
  }
  
  question.question = `Choose the box that is similar to the box formed from the given sheet of paper (X).`;
  question.question_image = question_image;
  question.options = randomOption;
  question.correct_ans = all_Correct_ans;

  return question;
};

export default Cube4;
