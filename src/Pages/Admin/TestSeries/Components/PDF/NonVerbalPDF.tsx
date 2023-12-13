import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import {
  ParaText3,
  ParaText4,
} from "../../../../../Components/Common/ParaText";

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
    paddingLeft: 20,
    paddingRight: 20,
    // border: "1pt solid #000",
  },
  Container: {
    padding: 2,
    paddingLeft: 20,
    paddingRight: 20,
    // marginTop:5
    // border: "1pt solid #000",
  },
  question: {
    fontSize: 16,
    margin: 0,
  },

  optionContainer: {
    padding: 2,
    marginTop: 20,
    marginBottom: 10,
  },
  options: {
    fontSize: 16,
    marginTop: 3,
    marginBottom: 3,
  },
  optionsImage2: {
    fontSize: 16,
    // marginTop: 2,
    // marginBottom: 2,
  },
  answer: {
    marginBottom: 2,
    fontSize: 24,
    color: "green",
  },

  answer2: {
    fontSize: 16,
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
    maxWidth: "500px",
    maxHeight: "250px",
    // border: "1pt solid #000",
  },
  optionImage: {
    maxWidth: "140px",
    maxHeight: "140px",
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
  options?: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
  option_1?: any;
  option_2?: any;
  option_3?: any;
  option_4?: any;
  correct_ans?: number;
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

const NonVerbalPDF = ({ props }: any) => {
  const { selected_question, topic } = props;
  let count = 1;
  return (
    <Box>
      <Box
        style={styles.page}
        sx={{
          breakAfter: "page",
        }}
      >
        <div style={styles.header}>{topic?.toUpperCase()}</div>
        <div style={styles.mainContainer}>
          {selected_question?.length != 0 &&
            selected_question?.map((item: questions, key: any) => {
              return (
                <Box
                  style={styles.Container}
                  key={key}
                  // className={`${
                  //   (key + 1) % 2 === 0 ? "break-after-page" : ""
                  // }  mt-8`}
                  sx={{
                    // breakAfter: (key + 1) % 2 === 0 ? "page" : "",
                    mt: 8,
                  }}
                >
                  {item?.options?.a ? (
                    <>
                      {
                        <Stack flexDirection={"row"} flexWrap={"wrap"}>
                          <Stack
                            flexDirection={"row"}
                            columnGap={1}
                            marginY={1}
                            width={"100%"}
                          >
                            <Typography sx={styles.mainText} className="">{`${
                              key + 1
                            }: `}</Typography>
                            <Typography>{` ${item.question}`}</Typography>
                          </Stack>
                          <Box>
                            {item?.question_image && (
                              // <div style={{ width:"100%",padding:"4px" }}>
                              <img
                                key={key}
                                style={styles.image}
                                src={item?.question_image}
                              />
                              // {/* </div> */}
                            )}
                          </Box>
                        </Stack>
                      }

                      {/* {item?.question_image && (
                        <div>
                          {item?.question_image.map(
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
                        </div> */}
                      {/* )} */}
                      <div style={styles.optionContainer}>
                        {item?.options?.a.split(":")[0] === "data" ? (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              // rowGap:1
                              // justifyContent: "space-between",
                            }}
                          >
                            <div
                              style={{
                                ...styles.optionContainer,
                                display: "flex",
                                // flexDirection: "row",
                              }}
                            >
                              <p style={styles.optionsImage2}>A.</p>
                              <img
                                style={styles.optionImage}
                                src={item?.options?.a}
                              />
                            </div>

                            {/* <Text>{`${import.meta.env.VITE_IMAGE_OAPI_URL}${item.option_2?.split("/")[3]}`}</Text> */}
                            <div
                              style={{
                                ...styles.optionContainer,
                                display: "flex",
                                // flexDirection: "row",
                              }}
                            >
                              <p style={styles.optionsImage2}>B.</p>
                              <img
                                style={styles.optionImage}
                                src={item?.options?.b}
                              />
                            </div>
                            <div
                              style={{
                                ...styles.optionContainer,
                                display: "flex",
                                // flexDirection: "row",
                              }}
                            >
                              <p style={styles.optionsImage2}>C.</p>
                              <img
                                style={styles.optionImage}
                                src={item.options?.c}
                              />
                            </div>
                            <div
                              style={{
                                ...styles.optionContainer,
                                display: "flex",
                                // flexDirection: "row",
                              }}
                            >
                              <p style={styles.optionsImage2}>D.</p>
                              <img
                                style={styles.optionImage}
                                src={item.options?.d}
                              />
                            </div>
                          </div>
                        ) : (
                          <Box style={styles.optionContainer} mb={4}>
                            <p
                              style={styles.options}
                            >{`A. ${item.options?.a}`}</p>
                            <p
                              style={styles.options}
                            >{`B. ${item.options?.b}`}</p>
                            <p
                              style={styles.options}
                            >{`C. ${item.options?.c}`}</p>
                            <p
                              style={styles.options}
                            >{`D. ${item.options?.d}`}</p>
                          </Box>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      {item?.paragraph && (
                        <Typography sx={{ my: "10px" }}>
                          {`${key + 1}: ${item.paragraph}`}
                        </Typography>
                      )}
                      {item?.paragraph && item?.images && (
                        <div>
                          {item?.images?.map((item2: any, key: any) => {
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
                          })}
                        </div>
                      )}

                      {
                        <Stack flexDirection={"row"} columnGap={1}>
                          <Typography sx={styles.mainText} className="">{`${
                            key + 1
                          }: `}</Typography>
                          <Typography>{` ${item.question}`}</Typography>
                        </Stack>
                      }

                      {item?.question_image && (
                        <div
                          style={{
                            marginTop: 20,
                            marginLeft: 15,
                          }}
                        >
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
                      )}

                      <div style={styles.optionContainer}>
                        {item?.option_1?.split(".")[1] === "png" ||
                        item?.option_1?.split(".")[1] === "jpg" ||
                        item?.option_1?.split(".")[1] === "jpeg" ? (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                            }}
                          >
                            <div
                              style={{
                                ...styles.optionContainer,
                                display: "flex",
                                // flexDirection: "row",
                              }}
                            >
                              <p style={styles.options}>A.</p>
                              <img
                                style={styles.optionsImage2}
                                src={
                                  import.meta.env.VITE_IMAGE_URL + item.option_1
                                }
                              />
                            </div>

                            {/* <Text>{`${import.meta.env.VITE_IMAGE_OAPI_URL}${item.option_2?.split("/")[3]}`}</Text> */}
                            <div
                              style={{
                                ...styles.optionContainer,
                                display: "flex",
                                // flexDirection: "row",
                              }}
                            >
                              <p style={styles.options}>B.</p>
                              <img
                                style={styles.optionsImage2}
                                src={
                                  import.meta.env.VITE_IMAGE_URL + item.option_2
                                }
                              />
                            </div>
                            <div
                              style={{
                                ...styles.optionContainer,
                                display: "flex",
                                // flexDirection: "row",
                              }}
                            >
                              <p style={styles.options}>C.</p>
                              <img
                                style={styles.optionsImage2}
                                src={
                                  import.meta.env.VITE_IMAGE_URL + item.option_3
                                }
                              />
                            </div>
                            <div
                              style={{
                                ...styles.optionContainer,
                                display: "flex",
                                // flexDirection: "row",
                              }}
                            >
                              <p style={styles.options}>D.</p>
                              <img
                                style={styles.optionsImage2}
                                src={
                                  import.meta.env.VITE_IMAGE_URL + item.option_4
                                }
                              />
                            </div>
                          </div>
                        ) : (
                          <>
                            <p
                              style={styles.options}
                            >{`A. ${item?.option_1}`}</p>
                            <p
                              style={styles.options}
                            >{`B. ${item?.option_2}`}</p>
                            <p
                              style={styles.options}
                            >{`C. ${item?.option_3}`}</p>
                            <p
                              style={styles.options}
                            >{`D. ${item?.option_4}`}</p>
                          </>
                        )}
                      </div>
                    </>
                  )}
                </Box>
              );
            })}
        </div>
      </Box>
      <Box style={styles.page}>
        <Box style={styles.mainContainer} sx={{ breakAfter: "page" }}>
          <div style={styles.header2}>Answers:</div>
          <div style={styles.Container}>
            {selected_question?.length != 0 &&
              selected_question?.map((item: questions, key: any) => {
                let ans;
                if (item?.correct_ans && item?.options) {
                  switch (item?.correct_ans) {
                    case 1:
                      ans = item?.options.a;
                      break;
                    case 2:
                      ans = item?.options.b;
                      break;
                    case 3:
                      ans = item?.options.c;
                      break;
                    case 4:
                      ans = item?.options.d;
                      break;
                  }
                } else {
                  switch (item?.correct_option) {
                    case "A":
                      ans = item.option_1;
                      break;
                    case "B":
                      ans = item.option_2;
                      break;
                    case "C":
                      ans = item.option_3;
                      break;
                    case "D":
                      ans = item.option_4;
                      break;
                  }
                }
                return (
                  <Stack
                    marginY={3}
                    rowGap={1}
                    // className={`${
                    //   (key + 1) % 5 === 0 ? "break-after-page" : ""
                    // }  mt-4`}
                    sx={{
                      breakAfter: (key + 1) % 5 === 0 ? "page" : "",
                      mt: 4,
                    }}
                  >
                    <p style={styles.answer} key={key}>
                      {item?.correct_option &&
                        `${key + 1}.  ${item?.correct_option}`}
                    </p>
                    {(item?.correct_option && ans?.split(".")[1] === "png") ||
                    ans?.split(".")[1] === "jpg" ||
                    ans?.split(".")[1] === "jpeg" ? (
                      <img
                        style={styles.optionImage}
                        src={import.meta.env.VITE_IMAGE_URL + ans}
                      />
                    ) : (
                      item?.correct_option && (
                        <p
                          style={{ ...styles.answer, color: "black" }}
                        >{`${ans}`}</p>
                      )
                    )}
                    <p style={styles.answer} key={key}>
                      {item?.correct_ans &&
                        `${key + 1} ${String.fromCharCode(
                          "A".charCodeAt(0) + (item?.correct_ans - 1)
                        )}`}
                    </p>
                    {item?.correct_ans && ans?.split(":")[0] === "data" ? (
                      <img style={styles.optionImage} src={ans} />
                    ) : (
                      item?.correct_ans && (
                        <p
                          style={{ ...styles.answer, color: "black" }}
                        >{` ${ans}`}</p>
                      )
                    )}
                  </Stack>
                );
              })}
          </div>
        </Box>
        <Box style={styles.mainContainer} mt={4}>
          <p style={styles.header2}>Explanation:</p>
          {selected_question?.length != 0 &&
            selected_question?.map((item: questions, key: any) => (
              <div style={styles.Container} key={key}>
                {
                  <>
                    <p style={styles.answer2}>{`${key + 1}.`}</p>
                    {!!item?.explanation ? (
                      <p
                      //   style={styles.explanation}
                      >{`${item.explanation}`}</p>
                    ) : (
                      <p
                      // style={styles.explanation}
                      >
                        No Explanation
                      </p>
                    )}
                  </>
                }
              </div>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default NonVerbalPDF;
