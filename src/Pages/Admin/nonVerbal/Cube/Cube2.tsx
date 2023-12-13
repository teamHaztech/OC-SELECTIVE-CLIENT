import { Box, Grid, Paper, Stack } from "@mui/material";
import randomicon from "../../../../utils/randomicon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TBox = {
  height: "60px",
  width: "50px",
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
  width: "50px", //50
  borderRadius: 0,
  border: "1px solid ",
  paddingY: "10px",
  display: "flex",
  justifyContent: "center",
  alignItem: "center",
};
const image_style = {
  width: "80%",
  height: "80%",
  margin: "auto",
};
const cube2 = async (index: number, questionRefs: any) => {
  //   console.log(index);

  let newData: any = [];
  const options: any = [];

  let question: any = {};
  for (let i = 5; i >= 0; i--) {
    let random = Math.floor(Math.random() * (i + 1));
    let imageData = randomicon();
    newData.push(imageData);
  }
  let random = Math.floor(Math.random() * 6);
  let random2 = Math.floor(Math.random() * 6);
  let option_arr = [
    { arr: [0, 1, 2], rotation: [0, 0, 0] },
    { arr: [2, 4, 3], rotation: [90, 0, 90] },
    { arr: [4, 3, 2], rotation: [180, 180, 180] },
    { arr: [0, 2, 3], rotation: [90, 0, 0] },
    { arr: [2, 1, 4], rotation: [0, 270, 0] },
    { arr: [4, 2, 1], rotation: [180, 180, 180] },
  ];
  let ans: any = [];
  let ans2: any = [];
  ans = option_arr[random];
  ans2 =
    option_arr[
      random2 != random ? random2 : random2 < 3 ? random2 + 1 : random2 - 1
    ];
    console.log(ans,ans2);
    
  // if (random < 3) {
  //   ans.push(newData[random], newData[random + 1], newData[random + 2]);
  // } else {
  //   ans.push(newData[random], newData[random - 1], newData[random - 2]);
  // }
  // console.log(ans);

  let question_image = (
    <Stack
      flexDirection={"row"}
      columnGap={2}
      sx={{ maxWidth: "260px" }}
      ref={questionRefs.current[index].questionRef}
    >
      <div className="cube" key={index} style={{ margin: "auto" }}>
        <div className="face top" style={Line}>
          {/* <div style={{transform: `rotate(${ans.rotation[0]}deg)`,backgroundColor:"blue"}}> */}
          <FontAwesomeIcon
            style={{
              ...image_style,
              transform: `rotate(${ans.rotation[0]}deg)`,
            }}
            icon={newData[ans.arr[0]].type.iconName}
            color={newData[ans.arr[0]].color}
          />
          {/* </div> */}
        </div>
        <div className="face left" style={Line}>
          <FontAwesomeIcon
            style={{
              ...image_style,
              transform: `rotate(${ans.rotation[1]}deg)`,
            }}
            icon={newData[ans.arr[1]].type.iconName}
            color={newData[ans.arr[1]].color}
          />
        </div>
        <div className="face front" style={Line}>
          <FontAwesomeIcon
            style={{
              ...image_style,
              transform: `rotate(${ans.rotation[2]}deg)`,
            }}
            icon={newData[ans.arr[2]].type.iconName}
            color={newData[ans.arr[2]].color}
          />
        </div>
      </div>
      <div className="cube" key={index} style={{ margin: "auto" }}>
        <div className="face top" style={Line}>
          {/* <div style={{transform: `rotate(${ans.rotation[0]}deg)`,backgroundColor:"blue"}}> */}
          <FontAwesomeIcon
            style={{
              ...image_style,
              transform: `rotate(${ans2.rotation[0]}deg)`,
            }}
            icon={newData[ans2.arr[0]].type.iconName}
            color={newData[ans2.arr[0]].color}
          />
          {/* </div> */}
        </div>
        <div className="face left" style={Line}>
          <FontAwesomeIcon
            style={{
              ...image_style,
              transform: `rotate(${ans2.rotation[1]}deg)`,
            }}
            icon={newData[ans2.arr[1]].type.iconName}
            color={newData[ans2.arr[1]].color}
          />
        </div>
        <div className="face front" style={Line}>
          <FontAwesomeIcon
            style={{
              ...image_style,
              transform: `rotate(${ans2.rotation[2]}deg)`,
            }}
            icon={newData[ans2.arr[2]].type.iconName}
            color={newData[ans2.arr[2]].color}
          />
        </div>
      </div>
    </Stack>
  );

  // console.log(ans);
  let temp_options = [
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      ref={questionRefs.current[index].optionRefs[0]}
      sx={{ w: "100%", m: "auto", backgroundColor: "transparent" }}
    >
      <Grid container sx={{ w: "100%", m: "auto" }} columns={3}>
        <Grid item>
          <Paper style={TBox}></Paper>
        </Grid>
        <Grid item>
          <Paper style={DBox}>
            <FontAwesomeIcon
              style={image_style}
              icon={newData[0].type.iconName}
              color={newData[0].color}
            />
          </Paper>
        </Grid>
      </Grid>
      <Grid container sx={{ w: "100%", m: "auto" }} columns={3}>
        <Grid item>
          <Paper style={DBox}>
            <FontAwesomeIcon
              style={image_style}
              icon={newData[1].type.iconName}
              color={newData[1].color}
            />
          </Paper>
        </Grid>
        <Grid item>
          <Paper style={DBox}>
            <FontAwesomeIcon
              style={image_style}
              icon={newData[2].type.iconName}
              color={newData[2].color}
            />
          </Paper>
        </Grid>

        <Grid item>
          <Paper style={DBox}>
            <FontAwesomeIcon
              style={image_style}
              icon={newData[3].type.iconName}
              color={newData[3].color}
            />
          </Paper>
        </Grid>
      </Grid>
      <Grid container sx={{ w: "100%", m: "auto" }} columns={3}>
        <Grid item>
          <Paper style={TBox}></Paper>
        </Grid>

        <Grid item>
          <Paper style={DBox}>
            <FontAwesomeIcon
              style={image_style}
              icon={newData[4].type.iconName}
              color={newData[4].color}
            />
          </Paper>
        </Grid>
      </Grid>
      <Grid container sx={{ w: "100%", m: "auto" }} columns={3}>
        <Grid item>
          <Paper style={TBox}></Paper>
        </Grid>

        <Grid item>
          <Paper style={DBox}>
            <FontAwesomeIcon
              style={image_style}
              icon={newData[5].type.iconName}
              color={newData[5].color}
            />
          </Paper>
        </Grid>
      </Grid>
    </Grid>,
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      ref={questionRefs.current[index].optionRefs[2]}
      sx={{ w: "100%", m: "auto", backgroundColor: "transparent" }}
    >
      <Grid container sx={{ w: "100%", m: "auto" }} columns={3}>
        <Grid item>
          <Paper style={TBox}></Paper>
        </Grid>

        <Grid item>
          <Paper style={DBox}>
            <FontAwesomeIcon
              style={image_style}
              icon={newData[2].type.iconName}
              color={newData[2].color}
            />
          </Paper>
        </Grid>
      </Grid>
      <Grid container sx={{ w: "100%", m: "auto" }} columns={3}>
        <Grid item>
          <Paper style={DBox}>
            <FontAwesomeIcon
              style={image_style}
              icon={newData[5].type.iconName}
              color={newData[5].color}
            />
          </Paper>
        </Grid>
        <Grid item>
          <Paper style={DBox}>
            <FontAwesomeIcon
              style={image_style}
              icon={newData[4].type.iconName}
              color={newData[4].color}
            />
          </Paper>
        </Grid>

        <Grid item>
          <Paper style={DBox}>
            <FontAwesomeIcon
              style={image_style}
              icon={newData[3].type.iconName}
              color={newData[3].color}
            />
          </Paper>
        </Grid>
      </Grid>
      <Grid container sx={{ w: "100%", m: "auto" }} columns={3}>
        <Grid item>
          <Paper style={TBox}></Paper>
        </Grid>

        <Grid item>
          <Paper style={DBox}>
            <FontAwesomeIcon
              style={image_style}
              icon={newData[0].type.iconName}
              color={newData[0].color}
            />
          </Paper>
        </Grid>
      </Grid>
      <Grid container sx={{ w: "100%", m: "auto" }} columns={3}>
        <Grid item>
          <Paper style={TBox}></Paper>
        </Grid>

        <Grid item>
          <Paper style={DBox}>
            <FontAwesomeIcon
              style={image_style}
              icon={newData[1].type.iconName}
              color={newData[1].color}
            />
          </Paper>
        </Grid>
      </Grid>
    </Grid>,
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      ref={questionRefs.current[index].optionRefs[2]}
      sx={{ w: "100%", m: "auto", backgroundColor: "transparent" }}
    >
      <Grid container sx={{ w: "100%", m: "auto" }} columns={3}>
        <Grid item>
          <Paper style={TBox}></Paper>
        </Grid>

        <Grid item>
          <Paper style={DBox}>
            <FontAwesomeIcon
              style={image_style}
              icon={newData[5].type.iconName}
              color={newData[5].color}
            />
          </Paper>
        </Grid>
      </Grid>
      <Grid container sx={{ w: "100%", m: "auto" }} columns={3}>
        <Grid item>
          <Paper style={DBox}>
            <FontAwesomeIcon
              style={image_style}
              icon={newData[4].type.iconName}
              color={newData[4].color}
            />
          </Paper>
        </Grid>
        <Grid item>
          <Paper style={DBox}>
            <FontAwesomeIcon
              style={image_style}
              icon={newData[3].type.iconName}
              color={newData[3].color}
            />
          </Paper>
        </Grid>

        <Grid item>
          <Paper style={DBox}>
            <FontAwesomeIcon
              style={image_style}
              icon={newData[2].type.iconName}
              color={newData[2].color}
            />
          </Paper>
        </Grid>
      </Grid>
      <Grid container sx={{ w: "100%", m: "auto" }} columns={3}>
        <Grid item>
          <Paper style={TBox}></Paper>
        </Grid>

        <Grid item>
          <Paper style={DBox}>
            <FontAwesomeIcon
              style={image_style}
              icon={newData[1].type.iconName}
              color={newData[1].color}
            />
          </Paper>
        </Grid>
      </Grid>
      <Grid container sx={{ w: "100%", m: "auto" }} columns={3}>
        <Grid item>
          <Paper style={TBox}></Paper>
        </Grid>

        <Grid item>
          <Paper style={DBox}>
            <FontAwesomeIcon
              style={image_style}
              icon={newData[0].type.iconName}
              color={newData[0].color}
            />
          </Paper>
        </Grid>
      </Grid>
    </Grid>,
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      ref={questionRefs.current[index].optionRefs[3]}
      sx={{ w: "100%", m: "auto", backgroundColor: "transparent" }}
    >
      <Grid container sx={{ w: "100%", m: "auto" }} columns={3}>
        <Grid item>
          <Paper style={TBox}></Paper>
        </Grid>

        <Grid item>
          <Paper style={DBox}>
            <FontAwesomeIcon
              style={image_style}
              icon={newData[2].type.iconName}
              color={newData[2].color}
            />
          </Paper>
        </Grid>
      </Grid>
      <Grid container sx={{ w: "100%", m: "auto" }} columns={3}>
        <Grid item>
          <Paper style={DBox}>
            <FontAwesomeIcon
              style={image_style}
              icon={newData[4].type.iconName}
              color={newData[4].color}
            />
          </Paper>
        </Grid>
        <Grid item>
          <Paper style={DBox}>
            <FontAwesomeIcon
              style={image_style}
              icon={newData[0].type.iconName}
              color={newData[0].color}
            />
          </Paper>
        </Grid>

        <Grid item>
          <Paper style={DBox}>
            <FontAwesomeIcon
              style={image_style}
              icon={newData[1].type.iconName}
              color={newData[1].color}
            />
          </Paper>
        </Grid>
      </Grid>
      <Grid container sx={{ w: "100%", m: "auto" }} columns={3}>
        <Grid item>
          <Paper style={TBox}></Paper>
        </Grid>

        <Grid item>
          <Paper style={DBox}>
            <FontAwesomeIcon
              style={image_style}
              icon={newData[3].type.iconName}
              color={newData[3].color}
            />
          </Paper>
        </Grid>
      </Grid>
      <Grid container sx={{ w: "100%", m: "auto" }} columns={3}>
        <Grid item>
          <Paper style={TBox}></Paper>
        </Grid>

        <Grid item>
          <Paper style={DBox}>
            <FontAwesomeIcon
              style={image_style}
              icon={newData[5].type.iconName}
              color={newData[5].color}
            />
          </Paper>
        </Grid>
      </Grid>
    </Grid>,
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
    "You are required to determine which of the figures could be folded to make the following 3D cube:";
  question.correct_ans = correct_ans;
  // return question;
  return Promise.resolve(question);
};

export default cube2;
