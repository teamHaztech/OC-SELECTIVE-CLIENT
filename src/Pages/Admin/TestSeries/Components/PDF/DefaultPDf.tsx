import { Box, Stack, Typography } from "@mui/material";
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
    marginTop: 2,
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

const DefaultPDf = ({ props }: any) => {
  const { selected_question, topic, index } = props;
  let count = 1;
  console.log(selected_question,"d");
  return (
    <Box>
      <Box
        style={styles.page}
        sx={{
          breakAfter: "page",
          // px: 10,
        }}
      >
        <div style={styles.header}>{topic?.toUpperCase()}</div>
        <div style={styles.mainContainer}>
          {selected_question?.length != 0 &&
            selected_question?.map((item: questions, key: any) => {
              const index_data: any = index?.find((item: any) =>
                item.element.includes(count)
              );
              count++;
              return (
                <Box
                  style={styles.Container}
                  key={key}
                  sx={{
                    breakAfter: (key + 1) % 3 === 0 ? "page" : "",
                    mt: 10,
                  }}
                  // className={`${
                  //   (key + 1) % 3 === 0 ? "break-after-page" : ""
                  // }  mt-10`}
                >
              
                  {item?.Options ? (
                    <>
                      {item.Question && (
                        <Stack flexDirection={"row"} columnGap={1}>
                          <Typography sx={styles.mainText} className="">{`${
                            key + 1
                          }: `}</Typography>
                          <Typography>{` ${item.Question}`}</Typography>
                        </Stack>
                      )}
                      {item?.question_image && (
                        <div>
                          {item?.question_image?.map(
                            (item2: any, key: number) => {
                              return (
                                <img
                                  key={key}
                                  style={styles.image}
                                  src={import.meta.env.VITE_IMAGE_URL + item2}
                                />
                              );
                            }
                          )}
                        </div>
                      )}
                      {item?.images && (
                        <Stack flexDirection={"row"} columnGap={16}>
                          {item?.images?.map((item2: any, key: number) => {
                            return (
                              <img
                                key={key}
                                style={styles.image}
                                src={import.meta.env.VITE_IMAGE_URL + item2}
                              />
                            );
                          })}
                        </Stack>
                      )}

                      <Box style={styles.optionContainer} mb={4}>
                        <p style={styles.options}>{`A. ${item.Options.a}`}</p>
                        <p style={styles.options}>{`B. ${item.Options.b}`}</p>
                        <p style={styles.options}>{`C. ${item.Options.c}`}</p>
                        <p style={styles.options}>{`D. ${item.Options.d}`}</p>
                      </Box>
                    </>
                  ) : (
                    <>
                      {item.question && (
                        <Stack flexDirection={"row"} columnGap={1}>
                          <Typography sx={styles.mainText} className="">{`${
                            key + 1
                          }: `}</Typography>
                          <Typography>{` ${item.question}`}</Typography>
                        </Stack>
                      )}

                      {item?.question_image && (
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
                      )}

                      <div style={styles.optionContainer}>
                        {item?.option_1 && (
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
        <Box
          style={styles.mainContainer}
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
        <Box style={styles.mainContainer} mt={4}>
          <p style={styles.header2}>Explanation:</p>
          {selected_question?.length != 0 &&
            selected_question?.map((item: questions, key: any) => (
              <div style={styles.Container} key={key}>
                {item?.Answer ? (
                  <>
                    <p style={styles.answer2}>{`${key + 1}.`}</p>
                    {!!item?.Explanation ? (
                      <p
                      //   style={styles.explanation}
                      >{`${item?.Explanation} `}</p>
                    ) : (
                      <p
                      // style={styles.explanation}
                      >
                        No Explanation
                      </p>
                    )}
                  </>
                ) : (
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
                )}
              </div>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default DefaultPDf;
