import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import {
  BButton,
  DownloadIconButton,
} from "../../../../../Components/Common/Button";
import React, { useEffect, useRef, useState } from "react";

import { Box, Button } from "@mui/material";
import ReactDOM from "react-dom/client";
import PdfMaker from "../PdfMaker";
import { BlobProvider, PDFViewer } from "@react-pdf/renderer";

import ReactToPrint, { useReactToPrint } from "react-to-print";
import ComponentToPrint from "./ComponentToPrint";

interface props {
  data: questions[];
  randomG?: boolean;
  bol: boolean;
  topic: string;
  total: number;
  button?: ReactJSXElement;
  set: boolean;
  index?: any;
  cateId: number;
  NVId?: number;
}

type questions = {
  Question?: string;
  question?: string;
  Options?: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
  option_1?: string;
  option_2?: string;
  option_3?: string;
  option_4?: string;
  Answer?: string;
  Explanation?: string;
  Conversation?: string;
  Paragraph?: string;
  conversation?: string;
  paragraph?: string;
  explanation?: string;
  correct_option?: string | number;
  tst_id?: number;
  marks?: null | number;
  status?: number;
  images?: string;
  question_image?: any;
};

const DownloadPDF = ({
  data,
  randomG,
  topic,
  total,
  set,
  index,
  cateId,
  NVId,
}: props) => {
  const [selected_question, setSelected_question] = useState<questions[]>([]);
  const pdfRef = useRef(null);

  const getPageMargins = () => {
    return `@page { margin: ${"50px"} ${"50px"} ${"100px"} ${"50px"} !important; }`;
  };

  const handlePrint = useReactToPrint({
    content: () => pdfRef.current,
    documentTitle: topic,
    pageStyle: getPageMargins(),
  });

  // console.log("data", data);
  // console.log("cateId", cateId);
  // useEffect(() => {
  //   setSelected_question(data);
  // }, []);

  useEffect(() => {
    const questions: questions[] = data;
    console.log(questions);

    // console.log(questions?.length < total);
    if (randomG) {
      if (!!questions) {
        if (questions?.length >= total) {
          const updatedSelectedQuestions = [];
          let count: number = total;
          // const updatedSelectedQuestions = [...selected_question];
          for (let i = count - 1; i >= 0; i--) {
            const ran = Math.floor(Math.random() * (i + 1));
            const temp = questions[i];
            questions[i] = questions[ran];
            questions[ran] = temp;
            updatedSelectedQuestions.push(questions[i]);
            console.log("3");
          }
          setSelected_question(updatedSelectedQuestions);
        } else {
          setSelected_question(questions);
          console.log("2");
        }
      }
    } else {
      console.log("1");

      setSelected_question(questions);
    }
    // console.log("change");
  }, [total]);

  // let selected_question: questions[] = [];
  let t_index: any;
  if (index && index?.length != 0 && cateId==2) {
    let count = 1;
    t_index = index.map((item: number) => {
      const start = count;
      const element = [];
      for (let i = 0; i < item; i++) {
        element.push(count++);
      }
      const end = count == 1 ? count : count - 1;
      return {
        end: end,
        start: start,
        element: element,
      };
    });
  }
  // const questions: questions[] = data;

  // if (!randomG) {
  //   if (!!questions) {
  //     if (questions?.length > 15) {
  //       let count: number = total;
  //       for (let i = count - 1; i >= 0; i--) {
  //         const ran = Math.floor(Math.random() * (i + 1));
  //         const temp = questions[i];
  //         questions[i] = questions[ran];
  //         questions[ran] = temp;
  //         selected_question.push(questions[i]);
  //       }
  //     } else {
  //       selected_question = questions;
  //       console.log("pdf", selected_question);
  //     }
  //   }
  // } else {
  //   selected_question = questions;
  // }

  // console.log( selected_question,data);
  return (
    <>
      <Box display={"none"}>
        <ComponentToPrint
          ref={pdfRef}
          selected_question={selected_question}
          topic={topic}
          index={t_index}
          cateId={cateId}
          NVId={NVId}
        />
      </Box>
      {set ? (
        <DownloadIconButton type="button" name="PDF" func={handlePrint} />
      ) : (
        <BButton type="button" name="Download PDF" func={handlePrint} />
      )}
    </>
  );
};

export default DownloadPDF;
