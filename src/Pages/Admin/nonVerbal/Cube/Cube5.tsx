import { Grid, Paper, Stack } from "@mui/material";
import randomicon from "../../../../utils/randomicon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName, library } from "@fortawesome/fontawesome-svg-core";
import { faB, fas } from "@fortawesome/free-solid-svg-icons";
import { ParaText1, ParaText4 } from "../../../../Components/Common/ParaText";

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

const cube5 = async (index: number, questionRefs: any) => {
  //   console.log(index);
  const oppositeNumber: any = (n: number) => {
    // console.log(n);

    switch (n) {
      case 0:
        return 2;
        // t = diceArray[5];
        break;
      case 1:
        return 4;
        // t = diceArray[3];
        break;
      case 2:
        return 0;
        // 4;
        // t = diceArray[4];
        break;
      case 3:
        return 5;
        // t = diceArray[1];
        break;
      case 4:
        return 1;
        // t = diceArray[2];
        break;
      default:
        return 3;
        // t = diceArray[0];
        break;
    }
  };
  const iconRandom = Math.floor(Math.random() * 2);
  const image_style = {
    width: iconRandom ? "50%" : "100%",
    height: iconRandom ? "50%" : "100%",
    margin: "auto",
    color: iconRandom ? "#000000" : "#ffffff",
    border: 0,
    p: 16,
    backgroundColor: iconRandom ? "#ffffff" : "#000000",
  };

  let newData: any = [];
  const options: any = [];

  let question: any = {};

  const tDiceIcons: Array<IconName[]> = [
    [
      "dice-one",
      "dice-two",
      "dice-three",
      "dice-four",
      "dice-five",
      "dice-six",
    ],
    ["1", "2", "3", "4", "5", "6"],
  ];
  let diceIcons: IconName[] = [];

  for (let index = tDiceIcons[iconRandom].length - 1; index >= 0; index--) {
    const random = Math.floor(Math.random() * index);
    diceIcons.push(tDiceIcons[iconRandom][random]);
    let temp = tDiceIcons[iconRandom][random];
    tDiceIcons[iconRandom][random] = tDiceIcons[iconRandom][index];
    tDiceIcons[iconRandom][index] = temp;
  }

  // for (let i = 5; i >= 0; i--) {
  //   let random = Math.floor(Math.random() * (i + 1));
  //   let imageData = randomicon();
  //   newData.push(imageData);
  // }
  let random = Math.floor(Math.random() * 4) + 1;
  let ans: IconName[] = [];
  let all_option: any = [];
  // let q = diceIcons[random].split("-")[1];
  if (random < 3) {
    ans.push(diceIcons[random], diceIcons[random + 1], diceIcons[random + 2]);
    all_option.push(random, random + 1, random + 2);
    ans.push(
      diceIcons[random + 1],
      diceIcons[oppositeNumber(random + 2)],
      diceIcons[oppositeNumber(random)]
    );
  } else {
    all_option.push(random, random - 1, random - 2);
    ans.push(diceIcons[random], diceIcons[random - 1], diceIcons[random - 2]);
    ans.push(
      diceIcons[random - 1],
      diceIcons[oppositeNumber(random - 2)],
      diceIcons[oppositeNumber(random)]
    );
  }

  let aRandom = Math.floor(Math.random() * 3);
  let answer: string = "";
  let q_number = iconRandom ? ans[aRandom] : ans[aRandom].split("-")[1];

  switch (all_option[aRandom]) {
    case 0:
      answer = iconRandom ? diceIcons[2] : diceIcons[2].split("-")[1];
      // t = diceArray[5];
      break;
    case 1:
      answer = iconRandom ? diceIcons[4] : diceIcons[4].split("-")[1];
      // t = diceArray[3];
      break;
    case 2:
      answer = iconRandom ? diceIcons[0] : diceIcons[0].split("-")[1];
      // 4;
      // t = diceArray[4];
      break;
    case 3:
      answer = iconRandom ? diceIcons[5] : diceIcons[5].split("-")[1];
      // t = diceArray[1];
      break;
    case 4:
      answer = iconRandom ? diceIcons[1] : diceIcons[1].split("-")[1];
      // t = diceArray[2];
      break;
    case 5:
      answer = iconRandom ? diceIcons[3] : diceIcons[3].split("-")[1];
      // t = diceArray[0];
      break;
  }
  let new_option: IconName[] = diceIcons.filter((item: IconName) => {
    const itemNameParts = iconRandom ? item : item.split("-")[1];
    return answer !== itemNameParts && q_number !== itemNameParts;
  });
  // console.log(diceIcons, ans, q_number, answer, new_option);
  let question_image = (
    <Stack
      ref={questionRefs.current[index].questionRef}
      flexDirection={"row"}
      justifyContent={"space-between"}
      maxWidth={"480px"}
      maxHeight={"437px"}
      sx={{ backgroundColor: "transparent" }}
    >
      <Stack>
        <div className="cube" style={{ margin: "auto" }}>
          <div className="face top" style={Line}>
            <FontAwesomeIcon
              style={image_style}
              icon={ans[0]}
              // color={ans[0].color}
            />
          </div>
          <div className="face left" style={Line}>
            <FontAwesomeIcon
              style={image_style}
              icon={ans[1]}
              // color={ans[1].color}
            />
          </div>
          <div className="face front" style={Line}>
            <FontAwesomeIcon
              style={image_style}
              icon={ans[2]}
              // color={ans[2].color}
            />
          </div>
        </div>
        <ParaText4 text={"(i)"} css={{ ml: "40px" ,fontWeight:700}} />
      </Stack>

      <Stack>
        <div className="cube" style={{ margin: "auto" }}>
          <div className="face top" style={Line}>
            <FontAwesomeIcon
              style={image_style}
              icon={ans[3]}
              // color={ans[0].color}
            />
          </div>
          <div className="face left" style={Line}>
            <FontAwesomeIcon
              style={image_style}
              icon={ans[4]}
              // color={ans[1].color}
            />
          </div>
          <div className="face front" style={Line}>
            <FontAwesomeIcon
              style={image_style}
              icon={ans[5]}
              // color={ans[2].color}
            />
          </div>
        </div>
        <ParaText4 text={"(ii)"} css={{ ml: "40px" ,fontWeight:700}} />
      </Stack>
    </Stack>
  );

  // console.log(ans);
  let temp_options: any = [
    answer,
    iconRandom ? new_option[1] : new_option[1].split("-")[1],
    iconRandom ? new_option[2] : new_option[2].split("-")[1],
    iconRandom ? new_option[3] : new_option[3].split("-")[1],
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
  const qArray: string[] = [
    `What number is opposite ${q_number} in the figure shown below? The given two positions are of the same dice whose each surface bears a number among ${
      iconRandom ? "1, 2, 3, 4, 5 and 6." : "one, two, three, four, six"
    }`,
    `Two positions of a dice are shown below. Identify the number at the bottom when the top is ${q_number}?`,
    `What will be the number at the bottom, if ${q_number} is at the top; the two positions of the dice being as given below:`,
    `Two positions of a cube are shown below. When the number ${q_number} will be at the bottom, then which number will be at the top`,
  ];
  question.question_image = question_image;
  question.options = options;
  const q_change = Math.floor(Math.random() * 2);
  question.question = qArray[aRandom];
  question.correct_ans = correct_ans;
  // return question;
  return Promise.resolve(question);
};

export default cube5;
