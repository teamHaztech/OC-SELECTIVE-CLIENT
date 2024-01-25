import React from "react";
import {
  ParaText3,
  ParaText4,
} from "../../../../../Components/Common/ParaText";
import DefaultPDf from "./DefaultPDf";
import ReadingPDF from "./ReadingPDF";
import ThinkingPDF from "./ThinkingPDF";
import NonVerbalPDF from "./NonVerbalPDF";

const ComponentToPrint = React.forwardRef((props: any, ref: any) => {
  const { cateId, NVId,selected_question } = props;
  // console.log("DATA", selected_question);
  console.log(cateId,selected_question );

  return (
    <div ref={ref}>
      <>
        {/* <img
          src="http://127.0.0.1:8000/NVImages/oImage/option_A_15.png"
          alt=""
        /> */}
        {cateId === 1 && NVId === 1 ? (
          <NonVerbalPDF props={props} />
        ) : cateId === 2 ? (
          <ReadingPDF props={props} />
        ) : cateId == 3 ? (
          <ThinkingPDF props={props} />
          // <DefaultPDf props={props} />
        ) : (
          <DefaultPDf props={props} />
        )}
      </>
    </div>
  );
});

export default ComponentToPrint;
