import { Box, Divider, Grid, Paper, Stack } from "@mui/material";
import imagetosvg from "../../../../utils/imagetosvg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import randomicon from "../../../../utils/randomicon";

const TBox = {
  height: "60px",
  width: "60px",
  borderRadius: 0,
  border: 0,
  boxShadow: "0px 0px",
  opacity: 0.0,
};
const DBox = {
  height: "60px",
  width: "60px",
  borderRadius: 0,
  border: "1px solid ",
  paddingY: "10px",
};
const mirror1 = async (index: number, questionRefs: any) => {
  // console.log(index);
  const image_style = {
    width: "40px",
    height: "40px",
    margin: "6",
  };
  let newData: any = [];
  const options: any = [];

  let question: any = {};
  for (let i = 3; i >= 0; i--) {
    const random = Math.floor(Math.random() * 1954);
    let imageData = randomicon();
    newData.push(imageData);
  }
  let degree = [0, 90, 180, 270];
  const rd = Math.floor(Math.random() * 4);
  console.log(newData);

  let question_image = (
    <Stack
      justifyItems={"center"}
      ref={questionRefs.current[index].questionRef}
      maxHeight="150px"
      maxWidth="150px"
      padding={"10px"}
      //
      sx={{
        backgroundColor: "transparent",
        transform: `rotate(${degree[rd]}deg)`,
      }}
    >
      <Grid
        sx={{
          maxWidth: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          rowGap: "2px",
          border: "1px solid black",
          backgroundColor: "white",
          justifyItems: "center",
          height: "130px",
          width: "130px",
          margin: "0 auto",

          // transform: " translateZ(30px)"
        }}
      >
        <Box sx={{ width: "50px" }}>
          <FontAwesomeIcon
            style={image_style}
            icon={newData[0].type.iconName}
            color={newData[0].color}
          />
        </Box>

        <Box sx={{ width: "50px" }}></Box>
        <Box sx={{ width: "50px" }}>
          <FontAwesomeIcon
            style={image_style}
            icon={newData[1].type.iconName}
            color={newData[1].color}
          />
          {/* <img src={newData[2]} alt="" style={image_style} /> */}
        </Box>
        <Box sx={{ width: "50px" }}>
          <FontAwesomeIcon
            style={image_style}
            icon={newData[2].type.iconName}
            color={newData[2].color}
          />
        </Box>
      </Grid>
      <Box paddingX={"10px"}>
        <hr
          style={{
            backgroundColor: "navy",
            width: "122px",
            margin: "0 auto",
            border: "1px solid navy",
            marginTop: "5px",
          }}
        />
        <Stack direction={"row"} spacing={"9px"}>
          {
            [0,1,2,3,4,5,6,7,8,9,10,11,12].map((index)=>(
              <Box
              key={index}
              borderLeft={"1px solid black"}
              height={"10px"}
              sx={{ transform: `rotate(155deg)` }}
            ></Box>
            ))
          }
     
        
        </Stack>
      </Box>
    </Stack>
  );
  let ans: number = 0;
  if (rd < 2) {
    ans = rd + 2;
  } else {
    ans = rd - 2;
  }
  const newDegree = degree.filter((item, key) => {
    return key != rd;
  });
  console.log(degree[ans], degree[rd]);
  let temp_options = [
    <Box
      sx={{ transform: `rotate(${degree[ans]}deg)`,  }}
      ref={questionRefs.current[index].optionRefs[0]}
      maxWidth={"150px"}
      maxHeight={"150px"}
      padding={"10px"}
    >
      <Grid
        sx={{
          maxWidth: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          rowGap: "2px",
          border: "1px solid black",
          // padding: "10px",
          backgroundColor: "white" ,
          justifyItems: "center",
          height: "130px",
          width: "130px",
          margin: "0 auto",

          // transform: " translateZ(30px)"
        }}
      >
        <Box sx={{ width: "50px" }}></Box>
        <Box sx={{ width: "50px" }}>
          <FontAwesomeIcon
            style={{ ...image_style, transform: "scaleX(-1)" }}
            icon={newData[0].type.iconName}
            color={newData[0].color}
          />
        </Box>

        <Box sx={{ width: "50px" }}>
          <FontAwesomeIcon
            style={{ ...image_style, transform: "scaleX(-1)" }}
            icon={newData[2].type.iconName}
            color={newData[2].color}
          />
        </Box>
        <Box sx={{ width: "50px" }}>
          <FontAwesomeIcon
            style={{ ...image_style, transform: "scaleX(-1)" }}
            icon={newData[1].type.iconName}
            color={newData[1].color}
          />
          {/* <img src={newData[2]} alt="" style={image_style} /> */}
        </Box>
      </Grid>
    </Box>,
    <Box
      sx={{ transform: `rotate(${newDegree[2]}deg)`,  }}
      ref={questionRefs.current[index].optionRefs[1]}
      maxWidth={"150px"}
      maxHeight={"150px"}
      padding={"10px"}
    >
      <Grid
        sx={{
          maxWidth: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          rowGap: "2px",
          border: "1px solid black",
          // padding: "10px",
          backgroundColor: "white" ,
          justifyItems: "center",
          height: "130px",
          width: "130px",
          margin: "0 auto",

          // transform: " translateZ(30px)"
        }}
      >
        <Box sx={{ width: "50px" }}>
          <FontAwesomeIcon
            style={image_style}
            icon={newData[1].type.iconName}
            color={newData[1].color}
          />
        </Box>

        <Box sx={{ width: "50px" }}>
          <FontAwesomeIcon
            style={image_style}
            icon={newData[0].type.iconName}
            color={newData[0].color}
          />
        </Box>
        <Box sx={{ width: "50px" }}></Box>
        <Box sx={{ width: "50px" }}>
          <FontAwesomeIcon
            style={image_style}
            icon={newData[2].type.iconName}
            color={newData[2].color}
          />
        </Box>
      </Grid>
    </Box>,
    <Box
      sx={{ transform: `rotate(${newDegree[0]}deg)`, }}
      ref={questionRefs.current[index].optionRefs[2]}
      maxWidth={"150px"}
      maxHeight={"150px"}
      padding={"10px"}
    >
      <Grid
        sx={{
          maxWidth: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          rowGap: "2px",
          border: "1px solid black",
          // padding: "10px",
          backgroundColor: "white" ,
          justifyItems: "center",
          height: "130px",
          width: "130px",
          margin: "0 auto",

          // transform: " translateZ(30px)"
        }}
      >
        <Box sx={{ width: "50px" }}>
          <FontAwesomeIcon
            style={{ ...image_style, transform: "scaleX(-1)" }}
            icon={newData[0].type.iconName}
            color={newData[0].color}
          />
        </Box>

        <Box sx={{ width: "50px" }}></Box>
        <Box sx={{ width: "50px" }}>
          <FontAwesomeIcon
            style={{ ...image_style, transform: "scaleX(-1)" }}
            icon={newData[1].type.iconName}
            color={newData[1].color}
          />
        </Box>
        <Box sx={{ width: "50px" }}>
          <FontAwesomeIcon
            style={{ ...image_style, transform: "scaleX(-1)" }}
            icon={newData[2].type.iconName}
            color={newData[2].color}
          />
        </Box>
      </Grid>
    </Box>,
    <Box
      sx={{ transform: `rotate(${newDegree[1]}deg)`, }}
      ref={questionRefs.current[index].optionRefs[3]}
      maxWidth={"150px"}
      maxHeight={"150px"}
      padding={"10px"}
    >
      <Grid
        sx={{
          maxWidth: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          rowGap: "2px",
          border: "1px solid black",
          // padding: "10px",
          backgroundColor: "white" ,
          justifyItems: "center",
          height: "130px",
          width: "130px",
          margin: "0 auto",

          // transform: " translateZ(30px)"
        }}
      >
        <Box sx={{ width: "50px" }}>
          <FontAwesomeIcon
            style={{ ...image_style, transform: "scaleX(-1)" }}
            icon={newData[0].type.iconName}
            color={newData[0].color}
            size="2xl"
          />
        </Box>

        <Box sx={{ width: "50px" }}></Box>
        <Box sx={{ width: "50px" }}>
          <FontAwesomeIcon
            style={{ ...image_style, transform: "scaleX(-1)" }}
            icon={newData[1].type.iconName}
            color={newData[1].color}
          />
        </Box>
        <Box sx={{ width: "50px" }}>
          <FontAwesomeIcon
            style={{ ...image_style, transform: "scaleX(-1)" }}
            icon={newData[2].type.iconName}
            color={newData[2].color}
          />
        </Box>
      </Grid>
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
question.question = rd == 1 || rd == 3 ? `Choose the alternative which is closely resembles the mirror - image of the given combination:`: `Which of the following image represents the water image`;
  question.correct_ans = correct_ans;
  // return question;
  // console.log(questionRefs);

  return Promise.resolve(question);
};

export default mirror1;
