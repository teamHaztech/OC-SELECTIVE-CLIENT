import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import {
  ParaText3,
  ParaText4,
} from "../../../../../Components/Common/ParaText";
// import ReactHtmlParser from 'react-html-parser';
import parse from "html-react-parser";

const styles = {
  //     pageBreak: {
  // breakAfter: "page"
  //     },
  page: {
    padding: 20,
    // breakAfter: "page",
  },
  section: {
    margin: 10,
  },
  mainContainer: {
    // marginTop: 3,
    // padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
    // border: "1pt solid #000",
  },
  Container: {
    padding: 2,
    paddingLeft: 10,
    paddingRight: 10,
    // border: "1pt solid #000",
  },
  question: {
    fontSize: 16,
    margin: 0,
  },
  conversation: {
    fontSize: 12,
    marginTop: 5,
    marginBottom: 5,
  },
  paragraph: {
    // fontSize: 12,
    // marginTop: 5,
    // marginBottom: 5,
  },
  optionContainer: {
    padding: 2,
    marginTop: 6,
    marginBottom: 10,

    // border: "1pt solid #000",
  },
  options: {
    fontSize: 16,
    // marginTop: 2,
    marginBottom: 2,
  },

  answer: {
    fontSize: 12,
    color: "green",
  },

  answer2: {
    fontSize: 12,
    margin: 7,
    // marginBottom:7
  },
  header2: {
    fontSize: 12,
    margin: 5,
  },
  explanation: {
    fontSize: 12,
    color: "red",
    whiteSpace: "pre-line",
    lineHeight: 1.5,
  },
  header: {
    fontSize: 20,
    marginBottom: 5,
    textAlign: "center" as const,
  },
  image: {
    maxWidth: "150px",
    height: "110px",
  },
  optionImage: {
    width: "100px",
    height: "100px",
    marginBottom: 5,
    marginLeft: 5,
  },
  mainText: {
    fontSize: 16,
    fontWeight: 700,
  },
};

type questions = {
  Question?: string;
  question?: string;
  Options?: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
  option_1?: any;
  option_2?: any;
  option_3?: any;
  option_4?: any;
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
  images?: any;
  question_image?: any;
};

const ReadingPDF = ({ props }: any) => {
  const { selected_question, topic, index } = props;

  let count = 1;
  return (
    <Box>
      <Box
        sx={{
          breakAfter: "page",
          px: 8,
          py: 5,
        }}
      >
        {/* <div style={styles.header}>{topic?.toUpperCase()}</div> */}
        <div style={styles.mainContainer}>
          {selected_question?.length != 0 &&
            selected_question?.map((item: questions, key: any) => {
              const index_data: any = index?.find((item: any) =>
                item?.element?.includes(count)
              );
              count++;
              return (
                <Box marginTop={6}>
                  {index &&
                    index?.length != 0 &&
                    index_data &&
                    key + 1 == index_data?.start &&
                    item?.paragraph && (
                      <Stack
                        sx={{
                          breakBefore:
                            key + 1 == index_data?.start ? "page" : "avoid",
                        }}
                      >
                        <Typography
                          marginBottom={1}
                        >{`Read the extracts below then answer the question`}</Typography>
                        {/* <Typography
                          textAlign={"center"}
                          fontSize={"30px"}
                          marginY={4}
                        >
                          {para[0]}
                        </Typography> */}
                        <Box
                          dangerouslySetInnerHTML={{ __html: item?.paragraph }}
                        />

                        {/* <Box> {parse(item?.paragraph)}</Box> */}
                      </Stack>
                    )}
                  {item?.Options ? (
                    <>
                      {item?.Paragraph && (
                        <Stack flexDirection={"row"} columnGap={1}>
                          <Typography sx={styles.mainText} className="">{`${
                            key + 1
                          }: `}</Typography>

                          <div
                            dangerouslySetInnerHTML={{
                              __html: item?.Paragraph,
                            }}
                          />
                          {/* <div>{parse(item?.Paragraph)}</div> */}
                        </Stack>
                      )}
                      {/* {item?.question_image && (
                        <div>
                          {item?.question_image?.map(
                            (item2: any, key: number) => {
                              return (
                                <img
                                  key={key}
                                  style={styles.image}
                                  src={
                                    import.meta.env.VITE_IMAGE_URL +
                                    item2?.image_url
                                  }
                                />
                              );
                            }
                          )}
                        </div>
                      )} */}

                      <Typography>{` ${item?.Question}`}</Typography>

                      <div style={styles.optionContainer} className="mb-4">
                        <p style={styles.options}>{`A. ${item?.Options?.a}`}</p>
                        <p style={styles.options}>{`B. ${item?.Options?.b}`}</p>
                        <p style={styles.options}>{`C. ${item?.Options?.c}`}</p>
                        <p style={styles.options}>{`D. ${item?.Options?.d}`}</p>
                      </div>
                    </>
                  ) : (
                    <Stack
                      spacing={1}
                      marginBottom={3}
                      sx={{
                        breakBefore:
                          key + 1 == index_data?.start ? "page" : "avoid",
                      }}
                      // className={`${
                      //   key + 1 == index_data.start
                      //     ? "break-after-page"
                      //     : "page-break-inside: avoid"
                      // }`}
                    >
                      {key + 1 == index_data?.start && item?.paragraph && (
                        <Stack spacing={2} marginTop={16}>
                          <ParaText4
                            text={
                              <span>
                                For questions
                                <strong>
                                  {` ${index_data?.start} - ${index_data?.end} `}
                                </strong>
                                choose the option <strong>(A,B,C or D)</strong>{" "}
                                which think the best answers the question
                              </span>
                            }
                          />
                        </Stack>
                      )}

                      {item.question && (
                        <Stack
                          paddingTop={1}
                          marginTop={0}
                          flexDirection={"row"}
                          columnGap={2}
                          sx={{
                            breakBefore: key + (1 % 5) == 0 ? "page" : "avoid",
                          }}
                        >
                          <Typography padding={0}>{key + 1}</Typography>
                          <Typography
                            padding={0}
                          >{`${item?.question}`}</Typography>
                        </Stack>
                      )}
                      <Stack marginY={""} paddingX={"50px"}>
                        <Typography>
                          <span>
                            <strong>A </strong>
                            {`${item?.option_1}`}
                          </span>
                        </Typography>
                        <Typography>
                          <span>
                            <strong>B </strong>
                            {`${item?.option_2}`}
                          </span>
                        </Typography>
                        <Typography>
                          <span>
                            <strong>C </strong>
                            {`${item?.option_3}`}
                          </span>
                        </Typography>
                        <Typography>
                          <span>
                            <strong>D </strong>
                            {`${item?.option_4}`}
                          </span>
                        </Typography>
                      </Stack>
                    </Stack>
                  )}
                </Box>
              );
            })}
        </div>
      </Box>
      <Box style={styles.page}>
        <Box
          style={styles.mainContainer}
          // className="break-after-page"
          sx={{
            breakAfter: "page",
          }}
        >
          <div style={styles.header2}>Answers:</div>
          <div style={styles.Container}>
            {selected_question?.length != 0 &&
              selected_question?.map((item: questions, key: any) => (
                <p style={styles.answer} key={key}>
                  {item?.Answer
                    ? `${key + 1}.  ${item?.Answer?.toUpperCase()}`
                    : `${key + 1}.  ${item?.correct_option}`}
                </p>
              ))}
          </div>
        </Box>
        <div style={styles.mainContainer} className="mt-4">
          <p style={styles.header2}>Explanation:</p>
          {selected_question?.length != 0 &&
            selected_question?.map((item: questions, key: any) => (
              <div style={styles.Container} key={key}>
                {item?.Answer ? (
                  <>
                    <Typography
                      style={styles.answer2}
                      sx={{
                        breakBefore: key + (1 % 12) == 0 ? "page" : "avoid",
                      }}
                    >{`${key + 1}.`}</Typography>
                    {!!item?.Explanation ? (
                      <Typography
                      //   style={styles.explanation}
                      >{`${item?.Explanation} `}</Typography>
                    ) : (
                      <Typography
                      // style={styles.explanation}
                      >
                        No Explanation
                      </Typography>
                    )}
                  </>
                ) : (
                  <>
                    <Typography
                      style={styles.answer2}
                      sx={{
                        breakBefore: key + (1 % 12) == 0 ? "page" : "avoid",
                      }}
                    >{`${key + 1}.`}</Typography>
                    {!!item?.explanation ? (
                      <Typography
                      //   style={styles.explanation}
                      >{`${item?.explanation}`}</Typography>
                    ) : (
                      <p
                      // style={styles.explanation}
                      >
                        No Explanation
                      </p>
                    )}
                  </>
                )}
              </div>
            ))}
        </div>
      </Box>
    </Box>
  );
};

export default ReadingPDF;
