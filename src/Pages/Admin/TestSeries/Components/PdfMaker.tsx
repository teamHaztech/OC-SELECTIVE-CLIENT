import {
  Document,
  Page,
  Text,
  View,
  Image,
  PDFDownloadLink,
  PDFViewer,
  BlobProvider,
} from "@react-pdf/renderer";

import { BButton, BButton2 } from "../../../../Components/Common/Button";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { blobToBase64 } from "../../../../utils/docx";
import { Console } from "console";
const styles = {
  page: {
    padding: 20,
  },
  section: {
    margin: 10,
  },
  mainContainer: {
    margin: 3,
    padding: 10,
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
    fontSize: 12,
    margin: 0,
  },
  conversation: {
    fontSize: 12,
    marginTop: 5,
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 12,
    marginTop: 5,
    marginBottom: 5,
  },
  optionContainer: {
    padding: 2,
    marginTop: 6,
    marginBottom: 15,

    // border: "1pt solid #000",
  },
  options: {
    fontSize: 12,
    marginTop: 5,
    marginBottom: 5,
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
    width: "100px",
    height: "100px",
  },
  optionImage: {
    width: "60px",
    height: "60px",
    marginBottom: 5,
    marginLeft: 5,
  },
  mainText: {
    fontSize: 13,
    fontWeight: 900,
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

// type questionList = {
//   id: number;
//   question: string;
//   option_1: string;
//   option_2: string;
//   option_3: string;
//   option_4: string;
//   option_5: null;
//   correct_option: string | number;
//   explanation: string;
//   tst_id: number;
//   marks: null | number;
//   status: number;
// };

interface props {
  data: questions[];

  randomG?: boolean;
  bol: boolean;
  topic: string;
  total: number;
  button?: ReactJSXElement;
}
const PdfMaker = (props: props) => {
  const [first, setFirst] = useState<any>([]);
  let selected_question: questions[] = [];

  const questions: questions[] = props.data;

  if (!props.randomG) {
    if (!!questions) {
      if (questions?.length > 15) {
        let count: number = props.total;
        for (let i = count - 1; i >= 0; i--) {
          const ran = Math.floor(Math.random() * (i + 1));
          const temp = questions[i];
          questions[i] = questions[ran];
          questions[ran] = temp;
          selected_question.push(questions[i]);
        }
      } else {
        selected_question = questions;
        console.log("pdf", selected_question);
      }
    }
  } else {
    selected_question = questions;
  }

  console.log("PDF COMP DATAselected_question", selected_question);

  const openPDFInNewTab = (blob: any, filename: string) => {
    const pdfUrl = URL.createObjectURL(blob);
    const newTab = window.open(pdfUrl, "_blank");
    if (newTab) {
      // Set the name for the generated PDF
      newTab.document.title = filename;
    }
    // setFirst([]);
  };

  return (
    // <PDFViewer
    // // document={
    // //   <MyDocument selected_question={selected_question} topic={props.topic} />
    // // }
    // // fileName={`${props.topic}.pdf`}
    // >
    //   {/* {props.button} */}
    //   <MyDocument selected_question={selected_question} topic={props.topic} />
    // </PDFViewer>

    <BlobProvider
      document={
        <MyDocument
          selected_question={selected_question}
          topic={props.topic}
          first={first}
          setFirst={setFirst}
          total={props.total}
        />
      }
    >
      {({ blob, url, loading, error }) => (
        <BButton
          type="button"
          name="Download PDF"
          // css={{ width: "100%" }}
          func={() => openPDFInNewTab(blob, `${props.topic}.pdf`)}
        />
      )}
    </BlobProvider>
  );
};

const MyDocument = ({
  selected_question,
  topic,
  first,
  setFirst,
  total,
}: {
  selected_question: questions[];
  topic: string;
  first: any;
  setFirst: any;
  total: number;
}) => {
  const base64: string = "data:image/png;base64,";
  const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;

  const fetchAndConvertImage = async function (imageUrl: string) {
    const firstLetter = imageUrl[0];
    if (firstLetter !== "/") {
      return imageUrl;
    }
    const url = import.meta.env.VITE_IMAGE_QAPI_URL;
    const response = await axios.post(url, {
      path: imageUrl,
    });

    if (response.status === 200) {
      console.log(response);
      return response.data;

      // const blob = response.data;
      // const base64Image = await blobToBase64(blob);
      // return base64Image;
    } else {
      console.error(`Failed to fetch image: ${imageUrl}`);
      return imageUrl;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        // Your async code here
        const result = await newQuestions();
        setFirst(result);
        console.log("result", result);
      } catch (error) {
        console.error("Error:", error);
      }
    })();
  }, [total]);

  const newQuestions = async () => {
    const selected_question1 = await Promise.all(
      selected_question.map(async (question: any) => {
        try {
          const updatedQuestion = { ...question };
          const images = question.question_image;

          const option1Image = question.option_1;
          const option2Image = question.option_2;
          const option3Image = question.option_3;
          const option4Image = question.option_4;

          updatedQuestion.option_1 = await fetchAndConvertImage(option1Image);
          updatedQuestion.option_2 = await fetchAndConvertImage(option2Image);
          updatedQuestion.option_3 = await fetchAndConvertImage(option3Image);
          updatedQuestion.option_4 = await fetchAndConvertImage(option4Image);

          updatedQuestion.images = await Promise.all(
            images.map(async (image: any) => {
              const imageUrl =
                import.meta.env.VITE_IMAGE_URL + `${image.image_url}`; // Replace with your base URL
              // console.log("url", imageUrl);

              const response = await axios.get(imageUrl, {
                responseType: "blob",
              });

              //   // return blob;
              //   const base64Image = await blobToBase64(blob);
              //   return base64Image;
              // } else {
              //   console.error(`Failed to fetch image: ${imageUrl}`);
              //   return null; // Return null for failed requests
              // }
            })
          );
          // console.log(base64Images);

          // Replace the image URLs with Base64-encoded images in the question object

          return updatedQuestion;
        } catch (error) {
          console.error("Error fetching or encoding image:", error);
          return question; // Return the original question object on error
        }
      })
    );

    return selected_question1;
  };

  return (
    <>
      {/* <img src="http://127.0.0.1:8000/images/product-7.jpg" alt="" /> */}

      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.header}>{topic?.toUpperCase()}</Text>
          <View style={styles.mainContainer}>
            {first?.length != 0 &&
              first?.map((item: questions, key: any) => (
                <View style={styles.Container} key={key}>
                  {item.Options ? (
                    <>
                      {item.Paragraph && (
                        <Text style={styles.paragraph}>
                          <Text style={styles.mainText}>{`${key + 1}: `}</Text>
                          {` ${item.Paragraph}`}
                        </Text>
                      )}
                      {item.paragraph && item?.question_image && (
                        <View>
                          {item?.images?.map((item2: any) => {
                            // console.log(
                            //   `${import.meta.env.VITE_IMAGE_QAPI_URL}${
                            //     item2?.image_url.split("/")[3]
                            //   }`
                            // );
                            // console.log(`${import.meta.env.VITE_IMAGE_OAPI_URL}${item.option_1?.split("/")[3]}`);
                            return (
                              <Image
                                style={styles.image}
                                // src={{
                                //   uri: `${import.meta.env.VITE_IMAGE_QAPI_URL}${
                                //     item2?.image_url.split("/")[3]
                                //   }`,
                                //   method: "GET",
                                //   headers: { "Cache-Control": "no-cache" },
                                //   body: "",
                                // }}
                                src={base64 + item2}
                              />
                            );
                          })}
                        </View>
                      )}
                      {item.Conversation && (
                        <Text style={styles.conversation}>
                          {`${item.Conversation}`}
                        </Text>
                      )}
                      {item.Conversation || item.Paragraph ? (
                        <Text
                          style={styles.question}
                        >{`${item.Question}`}</Text>
                      ) : (
                        <Text style={styles.question}>
                          <Text style={styles.mainText}>{`${key + 1}: `}</Text>
                          {item.Question}
                        </Text>
                      )}
                      {!item.paragraph && item?.question_image && (
                        <View>
                          {item?.images?.map((item2: any) => {
                            // console.log(`${import.meta.env.VITE_IMAGE_OAPI_URL}${item.option_1?.split("/")[3]}`);
                            return (
                              <Image
                                style={styles.image}
                                // src={{
                                //   uri: `${import.meta.env.VITE_IMAGE_QAPI_URL}${
                                //     item2?.image_url.split("/")[3]
                                //   }`,
                                //   method: "GET",
                                //   headers: { "Cache-Control": "no-cache" },
                                //   body: "",
                                // }}
                                src={base64 + item2}
                              />
                            );
                          })}
                        </View>
                      )}
                      {item?.question_image && (
                        <View>
                          {item?.images.map((item2: string) => {
                            return (
                              <Image
                                style={styles.image}
                                // src={{
                                //   uri: `${import.meta.env.VITE_IMAGE_QAPI_URL}${
                                //     item2.split("/")[3]
                                //   }`,
                                //   method: "GET",
                                //   headers: { "Cache-Control": "no-cache" },
                                //   body: "",
                                // }}
                                src={base64 + item2}
                              />
                            );
                          })}
                        </View>
                      )}
                      <View style={styles.optionContainer}>
                        <Text
                          style={styles.options}
                        >{`A. ${item.Options.a}`}</Text>
                        <Text
                          style={styles.options}
                        >{`B. ${item.Options.b}`}</Text>
                        <Text
                          style={styles.options}
                        >{`C. ${item.Options.c}`}</Text>
                        <Text
                          style={styles.options}
                        >{`D. ${item.Options.d}`}</Text>
                      </View>
                    </>
                  ) : (
                    <>
                      {item.paragraph && (
                        <Text style={styles.paragraph}>
                          {`${key + 1}: ${item.paragraph}`}
                        </Text>
                      )}
                      {item.paragraph && item?.question_image && (
                        <View>
                          {item?.images?.map((item2: any) => {
                            // console.log(
                            //   `${import.meta.env.VITE_IMAGE_QAPI_URL}${
                            //     item2?.image_url.split("/")[3]
                            //   }`
                            // );
                            // console.log(`${import.meta.env.VITE_IMAGE_OAPI_URL}${item.option_1?.split("/")[3]}`);
                            return (
                              <Image
                                style={styles.image}
                                // src={{
                                //   uri: `${import.meta.env.VITE_IMAGE_QAPI_URL}${
                                //     item2?.image_url.split("/")[3]
                                //   }`,
                                //   method: "GET",
                                //   headers: { "Cache-Control": "no-cache" },
                                //   body: "",
                                // }}
                                src={base64 + item2}
                              />
                            );
                          })}
                        </View>
                      )}
                      {item.conversation && (
                        <Text style={styles.conversation}>
                          {`${item.conversation}`}
                        </Text>
                      )}
                      {item.conversation || item.paragraph ? (
                        <Text
                          style={styles.question}
                        >{`${item.question}`}</Text>
                      ) : (
                        <Text style={styles.options}>
                          {`${key + 1}: ${item.question} `}
                        </Text>
                      )}
                      {!item.paragraph && item?.question_image && (
                        <View>
                          {item?.images?.map((item2: any) => {
                            // console.log(`${import.meta.env.VITE_IMAGE_OAPI_URL}${item.option_1?.split("/")[3]}`);
                            return (
                              <Image
                                style={styles.image}
                                // src={{
                                //   uri: `${import.meta.env.VITE_IMAGE_QAPI_URL}${
                                //     item2?.image_url.split("/")[3]
                                //   }`,
                                //   method: "GET",
                                //   headers: {
                                //     "Cache-Control": "no-cache",
                                //     "Content-Type": "image/png",
                                //   },
                                //   body: "",
                                // }}
                                src={base64 + item2}
                              />
                            );
                          })}
                        </View>
                      )}
                      <View style={styles.optionContainer}>
                        {
                          // item.option_1?.split(".")[1] === "png" ||
                          // item.option_1?.split(".")[1] === "jpg" ||
                          // item.option_1?.split(".")[1] === "jpeg"

                          item?.option_1.length > 150 ? (
                            <>
                              <View
                                style={{
                                  ...styles.optionContainer,
                                  display: "flex",
                                  flexDirection: "row",
                                }}
                              >
                                <Text style={styles.options}>A.</Text>
                                <Image
                                  style={styles.optionImage}
                                  // src={{
                                  //   uri: `${import.meta.env.VITE_IMAGE_OAPI_URL}${
                                  //     item.option_1?.split("/")[3]
                                  //   }`,
                                  //   method: "GET",
                                  //   headers: {
                                  //     "Cache-Control": "no-cache",
                                  //     "Content-Type": "image/png",
                                  //   },
                                  //   body: "",
                                  // }}
                                  src={base64 + item.option_1}
                                />
                              </View>

                              {/* <Text>{`${import.meta.env.VITE_IMAGE_OAPI_URL}${item.option_2?.split("/")[3]}`}</Text> */}
                              <View
                                style={{
                                  ...styles.optionContainer,
                                  display: "flex",
                                  flexDirection: "row",
                                }}
                              >
                                <Text style={styles.options}>B.</Text>
                                <Image
                                  style={styles.optionImage}
                                  // src={{
                                  //   uri: `${import.meta.env.VITE_IMAGE_OAPI_URL}${
                                  //     item.option_2?.split("/")[3]
                                  //   }`,
                                  //   method: "GET",
                                  //   headers: {
                                  //     "Cache-Control": "no-cache",
                                  //     "Content-Type": "image/png",
                                  //   },
                                  //   body: "",
                                  // }}
                                  src={base64 + item.option_2}
                                />
                              </View>
                              <View
                                style={{
                                  ...styles.optionContainer,
                                  display: "flex",
                                  flexDirection: "row",
                                }}
                              >
                                <Text style={styles.options}>C.</Text>
                                <Image
                                  style={styles.optionImage}
                                  // src={{
                                  //   uri: `${import.meta.env.VITE_IMAGE_OAPI_URL}${
                                  //     item.option_3?.split("/")[3]
                                  //   }`,
                                  //   method: "GET",
                                  //   headers: {
                                  //     "Cache-Control": "no-cache",
                                  //     "Content-Type": "image/png",
                                  //   },
                                  //   body: "",
                                  // }}
                                  src={base64 + item.option_3}
                                />
                              </View>
                              <View
                                style={{
                                  ...styles.optionContainer,
                                  display: "flex",
                                  flexDirection: "row",
                                }}
                              >
                                <Text style={styles.options}>D.</Text>
                                <Image
                                  style={styles.optionImage}
                                  // src={{
                                  //   uri: `${import.meta.env.VITE_IMAGE_OAPI_URL}${
                                  //     item.option_4?.split("/")[3]
                                  //   }`,
                                  //   method: "GET",
                                  //   headers: {
                                  //     "Cache-Control": "no-cache",
                                  //     "Content-Type": "image/png",
                                  //   },
                                  //   body: "",
                                  // }}
                                  src={base64 + item.option_4}
                                />
                              </View>
                            </>
                          ) : (
                            <>
                              <Text
                                style={styles.options}
                              >{`A. ${item.option_1}`}</Text>
                              <Text
                                style={styles.options}
                              >{`A. ${item.option_2}`}</Text>
                              <Text
                                style={styles.options}
                              >{`C. ${item.option_3}`}</Text>
                              <Text
                                style={styles.options}
                              >{`D. ${item.option_4}`}</Text>
                            </>
                          )
                        }
                      </View>
                    </>
                  )}
                </View>
              ))}
          </View>
        </Page>
        <Page size="A4" style={styles.page}>
          <View style={styles.mainContainer}>
            <Text style={styles.header2}>Answers:</Text>
            <View style={styles.Container}>
              {first?.length != 0 &&
                first?.map((item: questions, key: any) => (
                  <Text style={styles.answer} key={key}>
                    {item.Answer
                      ? `${key + 1}.  ${item.Answer?.toUpperCase()}`
                      : `${key + 1}.  ${item.correct_option}`}
                  </Text>
                ))}
            </View>
          </View>
          <View style={styles.mainContainer}>
            <Text style={styles.header2}>Explanation:</Text>
            {first?.length != 0 &&
              first?.map((item: questions, key: any) => (
                <View style={styles.Container} key={key}>
                  {item.Answer ? (
                    <>
                      <Text style={styles.answer2}>{`${key + 1}.`}</Text>
                      {!!item.explanation ? (
                        <Text
                          style={styles.explanation}
                        >{`${item.Explanation} `}</Text>
                      ) : (
                        <Text style={styles.explanation}>No Explanation</Text>
                      )}
                    </>
                  ) : (
                    <>
                      <Text style={styles.answer2}>{`${key + 1}.`}</Text>
                      {!!item.explanation ? (
                        <Text
                          style={styles.explanation}
                        >{`${item.explanation}`}</Text>
                      ) : (
                        <Text style={styles.explanation}>No Explanation</Text>
                      )}
                    </>
                  )}
                </View>
              ))}
          </View>
        </Page>
      </Document>
    </>
  );
};

export default PdfMaker;
