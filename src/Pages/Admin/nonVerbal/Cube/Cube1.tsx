import { Grid, Paper } from "@mui/material";
import imagetosvg from "../../../../utils/imagetosvg";
import randomicon from "../../../../utils/randomicon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  border: "1px solid ",
  paddingY: "10px",
  display: "flex",
  justifyContent: "center",
  alignItem: "center",
};
const cube1 = async (index: number, questionRefs: any) => {
  // console.log(index);
  const image_style = {
    width: "80%",
    height: "80%",
    margin: "auto",
  };
  let newData: any = [];
  const options: any = [];

  let question: any = {};
  for (let i = 5; i >= 0; i--) {
    let random = Math.floor(Math.random() * (i + 1));
    let imageData = randomicon();
    newData.push(imageData);
  }
  
  const Option_random = Math.floor(Math.random() * 5);
  let option_arr = [
    { arr: [0, 1, 2], rotation: [0, 0, 0] },
    { arr: [2, 4, 3], rotation: [90, 0, 90] },
    { arr: [4, 3, 2], rotation: [180, 180, 180] },
    { arr: [0, 2, 3], rotation: [90, 0, 0] },
    { arr: [2, 1, 4], rotation: [0, 270, 0] },
    { arr: [4, 2, 1], rotation: [180, 180, 180] },
  ];

  let question_image = (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      ref={questionRefs.current[index].questionRef}
      maxWidth={"460px"}
    >
      <Grid
        item
        xs={12}
        sm={5}
        sx={{ w: "80%", m: "auto", backgroundColor: "transparent" }}
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
      </Grid>
    </Grid>
  );
  let random = Math.floor(Math.random() * 6);
  let ans:any = [];
  ans = option_arr[Option_random]
  // if (random < 3) {
  //   ans.push(newData[random], newData[random + 1], newData[random + 2]);
  // } else {
  //   ans.push(newData[random], newData[random - 1], newData[random - 2]);
  // }
  // console.log(random);
  let temp_options = [
    <div className="cube" ref={questionRefs.current[index].optionRefs[0]}  style ={{maxWidth: "160px"}}>
      <div className="face top" style={Line}>
        <FontAwesomeIcon
          style={{...image_style,transform: `rotate(${ans.rotation[0]}deg)`,}}
          icon={newData[ans.arr[0]].type.iconName}
          color={newData[ans.arr[0]].color}
        />
      </div>
      <div className="face left" style={Line}>
        <FontAwesomeIcon
          style={{...image_style,transform: `rotate(${ans.rotation[1]}deg)`,}}
          icon={newData[ans.arr[1]].type.iconName}
          color={newData[ans.arr[1]].color}
        />
      </div>
      <div className="face front" style={Line}>
        <FontAwesomeIcon
          style={{...image_style,transform: `rotate(${ans.rotation[2]}deg)`,}}
          icon={newData[ans.arr[2]].type.iconName}
          color={newData[ans.arr[2]].color}
        />
      </div>
    </div>,
    <div className="cube" ref={questionRefs.current[index].optionRefs[1]} style ={{maxWidth: "160px"}}>
      <div className="face front" style={Line}>
        <FontAwesomeIcon
          style={{...image_style,transform: `rotate(${ans.rotation[1]}deg)`,}}
          icon={newData[1].type.iconName}
          color={newData[1].color}
        />
      </div>
      <div className="face top" style={Line}>
        <FontAwesomeIcon
          style={{...image_style,transform: `rotate(${ans.rotation[0]}deg)`,}}
          icon={newData[3].type.iconName}
          color={newData[3].color}
        />
      </div>
      <div className="face left" style={Line}>
        <FontAwesomeIcon
          style={{...image_style,transform: `rotate(${ans.rotation[2]}deg)`,}}
          icon={newData[4].type.iconName}
          color={newData[4].color}
        />
      </div>
    </div>,
    <div className="cube" ref={questionRefs.current[index].optionRefs[2]}  style ={{maxWidth: "160px"}}>
      <div className="face front" style={Line}>
        <FontAwesomeIcon
          style={{...image_style,transform: `rotate(${ans.rotation[0]}deg)`,}}
          icon={newData[0].type.iconName}
          color={newData[0].color}
        />
      </div>
      <div className="face top" style={Line}>
        <FontAwesomeIcon
          style={{...image_style,transform: `rotate(${ans.rotation[1]}deg)`,}}
          icon={newData[3].type.iconName}
          color={newData[3].color}
        />
      </div>
      <div className="face left" style={Line}>
        <FontAwesomeIcon
          style={{...image_style,transform: `rotate(${ans.rotation[2]}deg)`,}}
          icon={newData[2].type.iconName}
          color={newData[2].color}
        />
      </div>
    </div>,
    <div className="cube" ref={questionRefs.current[index].optionRefs[3]}  style ={{maxWidth: "160px"}}>
      <div className="face front" style={Line}>
        <FontAwesomeIcon
          style={{...image_style,transform: `rotate(${ans.rotation[0]}deg)`,}}
          icon={newData[5].type.iconName}
          color={newData[5].color}
        />
      </div>
      <div className="face top" style={Line}>
        <FontAwesomeIcon
          style={{...image_style,transform: `rotate(${ans.rotation[2]}deg)`,}}
          icon={newData[2].type.iconName}
          color={newData[2].color}
        />
      </div>
      <div className="face left" style={Line}>
        <FontAwesomeIcon
          style={{...image_style,transform: `rotate(${ans.rotation[1]}deg)`,}}
          icon={newData[0].type.iconName}
          color={newData[0].color}
        />
      </div>
    </div>,
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
    "You are required to determine which of the cubes could be formed by folding the following figure:";
  question.correct_ans = correct_ans;
  // return question;
  return Promise.resolve(question);
};

export default cube1;
