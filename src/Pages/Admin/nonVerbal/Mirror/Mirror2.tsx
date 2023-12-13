import { Box, Stack, Typography } from "@mui/material";

const Mirror2 = async (index: number, questionRefs: any) => {
  const i = Math.floor(Math.random() * 4) + 5;
  const letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "h",
    "i",
    "k",
    "m",
    "n",
    "o",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

  let newData: any = [];
  const options: any = [];

  let question: any = {};

  for (let j = 0; j < i; j++) {
    const random = Math.floor(Math.random() * letters.length);
    newData.push(letters[random]);
  }

  let question_image = (
    <Stack
      px={1}
      ref={questionRefs.current[index].questionRef}
      sx={{ maxWidth: "140px", bgcolor: "transparent" }}
    >
      <Box>
        {newData.map((item: string) => (
          <Typography variant="h5" component={"span"} fontWeight={"bolder"}>
            {item}
          </Typography>
        ))}
      </Box>
    </Stack>
  );

  let temp_options = [
    <Box
      ref={questionRefs.current[index].optionRefs[0]}
      sx={{ transform: "scaleY(-1)", display: "inline-block" }}
    >
      {newData.map((item: string) => (
        <Typography variant="h5" component={"span"} fontWeight={"bolder"}>
          {item}
        </Typography>
      ))}
    </Box>,
    <Box
      ref={questionRefs.current[index].optionRefs[1]}
      sx={{ transform: "scaleY(-1)", display: "inline-block" }}
    >
      {newData.map((item: string, key: number) => {
        if (key === 2) {
          return (
            <Box
              sx={{
                display: "inline-block",

                transform: "scaleY(-1)",
              }}
            >
              <Typography variant="h5" component={"span"} fontWeight={"bolder"}>
                {item}
              </Typography>
            </Box>
          );
        }
        if (key === 4) {
          return (
            <Box
              sx={{
                display: "inline-block",

                transform: "scaleY(-1)",
              }}
            >
              <Typography variant="h5" component={"span"} fontWeight={"bolder"}>
                {item}
              </Typography>
            </Box>
          );
        }
        return (
          <Box sx={{ display: "inline-block" }}>
            <Typography variant="h5" component={"span"} fontWeight={"bolder"}>
              {item}
            </Typography>
          </Box>
        );
      })}
    </Box>,
    <Box
      ref={questionRefs.current[index].optionRefs[2]}
      sx={{ transform: "scaleY(-1)", display: "inline-block" }}
    >
      {newData.map((item: string, key: number) => {
        if (key === 3) {
          return (
            <Box
              sx={{
                display: "inline-block",

                transform: "scaleY(-1)",
              }}
            >
              <Typography variant="h5" component={"span"} fontWeight={"bolder"}>
                {item}
              </Typography>
            </Box>
          );
        }
        if (key === 7) {
          return (
            <Box
              sx={{
                display: "inline-block",

                transform: "scaleY(-1)",
              }}
            >
              <Typography variant="h5" component={"span"} fontWeight={"bolder"}>
                {item}
              </Typography>
            </Box>
          );
        }
        return (
          <Box sx={{ display: "inline-block" }}>
            <Typography variant="h5" component={"span"} fontWeight={"bolder"}>
              {item}
            </Typography>
          </Box>
        );
      })}
    </Box>,
    <Box
      ref={questionRefs.current[index].optionRefs[3]}
      sx={{ transform: "scaleX(-1)", display: "inline-block" }}
    >
      {newData.map((item: string) => (
        <Box sx={{ display: "inline-block" }}>
          <Typography variant="h5" component={"span"} fontWeight={"bolder"}>
            {item}
          </Typography>
        </Box>
      ))}
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
    "Choose the alternative which is closely resembles the water-image of the given combination:";
  question.correct_ans = correct_ans;
  // return question;
  // console.log(questionRefs);

  return Promise.resolve(question);
};

export default Mirror2;
