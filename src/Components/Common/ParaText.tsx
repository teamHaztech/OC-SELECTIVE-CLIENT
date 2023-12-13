import { Box, Typography } from "@mui/material";

interface props {
  text: any; // string | number;
  css?: object;
  func?: () => void;
}
const ParaText1 = (props: props) => {
  return (
    <Typography
      onClick={props.func}
      sx={{
        fontSize: "16px",
        fontWeight: 400,
        color: "#000000",

        ...props.css,
      }}
    >
      {props.text}
    </Typography>
  );
};
const ParaText2 = (props: props) => {
  return (
    <Typography
      onClick={props.func}
      sx={{
        ...props.css,
        fontSize: "20px",
        fontWeight: 500,
        color: "#FFFFFF",
      }}
    >
      {props.text}
    </Typography>
  );
};
const ParaText3 = (props: props) => {
  return (
    <Typography
      onClick={props.func}
      sx={{
        fontSize: "16px",
        fontWeight: 550,
        color: "#000000",

        ...props.css,
      }}
    >
      {props.text}
    </Typography>
  );
};

const ParaText4 = (props: props) => {
  return (
    <Typography
      component={"p"}
      onClick={props.func}
      sx={{
        fontSize: "20px",
        color: "#000000",
        ...props.css,
      }}
    >
      {props.text}
    </Typography>
  );
};

const ConverationComp = (props: props) => {
  const parts = props.text.split(/(\w+):\s+/);

  const speakerParts: any = {};
  for (let i = 1; i < parts.length; i += 2) {
    const speakerName = parts[i];
    const speakerPart = parts[i + 1];
    speakerParts[speakerName] = speakerPart;
  }

  return (
    <>
      {Object.entries(speakerParts).map(
        ([speakerName, speakerPart]: any, index) => (
          <Box key={index} mb={1}>
            <Typography variant="h6" fontWeight="bold" display="inline">
              {speakerName}:{" "}
            </Typography>
            <Typography
              display="inline"
              sx={{
                ...props.css,
                fontSize: "20px",
                color: "#000000",
              }}
            >
              {speakerPart}
            </Typography>
          </Box>
        )
      )}
    </>
  );
};

export { ParaText1, ParaText2, ParaText3, ParaText4, ConverationComp };
