import { TableBody, TableCell, TableRow } from "@mui/material";
import { ChartDatasetPropertiesCustomTypesPerDataset } from "chart.js";
import React from "react";
type dataType = {
  total_questions: number;
  total_answered: number;
  total_marks: number;
  right_answer: number;
  time_taken: number;
  wrong_answer: number;
  total_time: number;
  marks_obtained: number;
};
interface dataProps {
 data:any
}


const ExamResultTable = (props: dataProps) => {
    console.log(props.data.data);
  return (
    <TableBody>
      <TableRow>
        <TableCell align="center" sx={{ border: 0 }}>
          {props.data.total_questions}
        </TableCell>
        <TableCell align="center" sx={{ border: 0 }}>
          {props.data.total_marks}
        </TableCell>
        {/* <TableCell align="center" sx={{ border: 0 }}>
          {props.data.total_time}
        </TableCell> */}
        <TableCell align="center" sx={{ border: 0 }}>
          {props.data.time_taken}
        </TableCell>
        <TableCell align="center" sx={{ border: 0 }}>
          {props.data.total_answered}
        </TableCell>
        <TableCell align="center" sx={{ border: 0 }}>
          {props.data.wrong_answer}
        </TableCell>
        <TableCell align="center" sx={{ border: 0 }}>
          {props.data.right_answer}
        </TableCell>
        <TableCell align="center" sx={{ border: 0 }}>
          {props.data.marks_obtained}
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default ExamResultTable;
