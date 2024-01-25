import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import { Box, Pagination, Stack } from "@mui/material";
import QuestionCard from "../../../Components/QuestionCard";
import { BButton2 } from "../../../../../../Components/Common/Button";
import DownloadPDF from "../../../Components/PDF/DownloadPDF";
import AlertBox from "../../../../../../Components/Common/AlertBox";
import { useMutation, useQuery } from "@tanstack/react-query";
import adminTokenAxios from "../../../../../../Hooks/AdminTokenAxios";
import { ParaText4 } from "../../../../../../Components/Common/ParaText";
type CsvItem = {
  Answer: string;
  Conversation?: string;
  Paragraph?: string;
  Explanation: string;
  Option_A: string;
  Option_B: string;
  Option_C: string;
  Option_D: string;
  Question: string;
};

type mapData = {
  Conversation?: string;
  Paragraph?: string;
  Answer: string;
  Explanation: string;
  Options: string[];
  Question: string;
  images: string[];
};

interface ThinkingProps {
  csvData?: any;
  formData: any;

  setCsvData?: any;
  reset?: any;
  edit: boolean;
  topicId?: number | string;
  handleClose?: () => void;
  setTopic?: any;
}

const Thinking = ({
  csvData,
  formData,
  setCsvData,
  reset,
  edit,
  topicId,
  handleClose,
  setTopic,
}: ThinkingProps) => {
  const [category, topicGen, totalQuestions, testType, topicName] = formData;

  const [resData, setResData] = useState<any>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [errMessage, setErrMessage] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = resData.slice(startIndex, endIndex);
  // console.log(
  //   Math.round(totalQuestions / csvData.length),
  //   csvData.length,
  //   totalQuestions
  // );
  // console.log("len "+resData.length);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setCurrentPage(newPage);
  };

  const handleAlertBoxOpen = () => {
    setOpen(true);
  };

  const handleAlertBoxClose = () => {
    setOpen(false);
  };

  const [open2, setOpen2] = useState<boolean>(false);
  const handleAlertBoxOpen2 = () => {
    setOpen2(true);
  };

  const handleAlertBoxClose2 = () => {
    setOpen2(false);
  };

  const { data } = useQuery({
    queryKey: ["images"],
    queryFn: async () => {
      return await adminTokenAxios.get(`/admin/get-image/${category}`);
    },
    enabled: !!category,
  });
  // console.log((typeof setTopic === 'function'), setTopic);
  
  let image_data = data?.data.images;
  // console.log(image_data);
  const image_keyword = image_data?.map((item: any) => {
    return item.image_name.toLowerCase();
  });
  // console.log(image_keyword);
  
  const addTestCTMu = useMutation({
    mutationFn: async (data: object[]) => {
      console.log(resData.length);

      return await adminTokenAxios.post(`/admin/add-test-series-topics`, {
        tsc_id: category,
        t_name: topicName,
        question: resData,
        topic: topicGen,
        ts_id: testType,
      });
    },
    onError: (error: any) => {
      console.error("Error creating user:", error.response?.data);
    },
    onSuccess: (res: any) => {
      if (res.status == 200) {
        console.log(res);
        handleAlertBoxOpen2();
        // navigate(`/admin/test-series/view-test-series-topics`);
        reset({
          tsc_id: "",
          topic: "",
        });
        setCsvData([]);
        setResData([]);
      }
    },
  });

  const updateTestCTMu = useMutation({
    mutationFn: async (data: object[]) => {
      return await adminTokenAxios.put(
        `/admin/update-test-series-topics/${topicId}`,
        { question: resData }
      );
    },
    onError: (error: any) => {
      console.error("Error creating user:", error.response?.data);
    },
    onSuccess: (res: any) => {
      if (res.status == 200) {
        console.log(res);
        handleAlertBoxOpen2();
        // navigate(`/admin/test-series/view-test-series-topics`);
        // reset({
        //   tsc_id: "",
        //   topic: "",
        // });
        setCsvData([]);
        setResData([]);
        setTopic(null);
        // if (typeof setTopic === 'function') {
      
        // }
        handleClose?.();
      }
    },
  });

  const handleUpload = async (data: any) => {
    if (category == 2) {
      const header3 = [
        "Paragraph",
        "Question",
        "Option_A",
        "Option_B",
        "Option_C",
        "Option_D",
        "Answer",
        "Explanation",
      ];

      const array2 = Object.keys(data[0]);

      if (JSON.stringify(header3) === JSON.stringify(array2)) {
        const filteredCsvData = csvData.filter((item: any) => {
          if (item.Question && item.Answer) {
            return true;
          }
          return false;
        });
        console.log(filteredCsvData);
        
        addTestCTMu.mutate(filteredCsvData);
      } else {
        
        setErrMessage(
          "upload csv in correct format"
        );
        handleAlertBoxOpen();
      }
    } else {
      addTestCTMu.mutate(resData);
    }
  };
  const handleGenerate = async () => {
    const header1 = [
      "Question",
      "Option_A",
      "Option_B",
      "Option_C",
      "Option_D",
      "Answer",
      "Explanation",
    ];
    const header2 = [
      "Paragraph",
      "Conversation",
      "Question",
      "Option_A",
      "Option_B",
      "Option_C",
      "Option_D",
      "Answer",
      "Explanation",
    ];
    const header3 = [
      "Paragraph",
      "Question",
      "Option_A",
      "Option_B",
      "Option_C",
      "Option_D",
      "Answer",
      "Explanation",
    ];
    const array2 = Object.keys(csvData[0]);

    if (
      JSON.stringify(header1) === JSON.stringify(array2) ||
      JSON.stringify(header2) === JSON.stringify(array2)
    ) {
      const filteredCsvData = csvData.filter((item: any) => {
        if (item.Question && item.Option_D) {
          // console.log(!!item.Question);
          return true;
        }
        return false;
      });
      // console.log(filteredCsvData);
      newRes.mutate(filteredCsvData);
    } else {
      alert("upload csv in correct formast");
    }
  };

  const newRes = useMutation({
    mutationFn: async (csvData: CsvItem[]) => {
      // console.log("object 2", input);
      const exception = new Error();
      exception.name = "CustomError";
      // throw exception;
      const responses: any[] = [];

      for (const [key, item] of csvData.entries()) {
        const topic = topicGen;
        const maleNames = [
          "John",
          "Nathan",
          "Austin",
          "Frank",
          "Bill",
          "Jenson",
          "Lloyd",
          "Oliver",
          "Louis",
          "Sam",
          "Chris",
          "David",
          "Tom",
          "Bobby",
          "Dennis",
          "Evan",
          "Philips",
          "James",
          "Adam",
          "Jay",
        ];
        const femaleNames = [
          "Alia",
          "Zoya",
          "Ruby",
          "Lucy",
          "Daisy",
          "Georgia",
          "Sally",
          "Nora",
          "Amelia",
          "Stella",
          "Natasha",
          "Marry",
          "Annie",
          "Clara",
          "Jessie",
          "Flora",
          "Myra",
          "Sarah",
          "Alice",
          "Eliza",
        ];
        let query = "";
        const t_m_name = [...maleNames];
        const t_f_name = [...femaleNames];
        // if (category == 3) {
          query = `Generate ${Math.round(
            totalQuestions / csvData.length
          )} new unique questions similar to the provided example question below:
          
          Example Question:
          ${item.Paragraph ? "Paragraph: " + item.Paragraph : ""} 
          ${item.Conversation ? "Conversation: " + item.Conversation : ""} 
          Question: ${item.Question}
          Options:
            a. ${item.Option_A}
            b. ${item.Option_B}
            c. ${item.Option_C}
            d. ${item.Option_D}
          Answer: ${
            item.Answer
              ? item.Answer
              : "Generate an Answer based on the question"
          }
          Explanation: ${
            item.Explanation
              ? item.Explanation
              : "Generate an explanation based on the question and correct answer"
          }
          
          ---
          
          Follow these guidelines for generating each question:
          
          1. For each question, use one of the specified names in order for persons. For males, use the first name from this list: ${
            t_m_name[Math.floor(Math.random() * 19)]
          }, ${
            t_m_name[Math.floor(Math.random() * 19)]
          }. For females, use the first name from this list: ${
            t_f_name[Math.floor(Math.random() * 19)]
          }, ${
            t_f_name[Math.floor(Math.random() * 19)]
          }.
          
          2. Maintain the question and explanation sentence structure; only modify variables like numbers.
          
          3. Ensure that each question includes options (a, b, c, d), a correct answer, and an explanation. If an explanation is not provided, mention that one should be generated.
          
          4. If there is a paragraph or conversation between persons, generate that as well.
          
          5. Provide the correct JSON representation, and each question should adhere to the following format:
          
          [
            {
              ${item.Paragraph ? "Paragraph: Replace with paragraph text" : ""}
              ${
                item.Conversation
                  ? "Conversation: Replace with paragraph text"
                  : ""
              } 
              "Question": "Replace with question text",
              "Options": {
                "a": "Option A text",
                "b": "Option B text",
                "c": "Option C text",
                "d": "Option D text"
              },
              "Answer": "Correct answer letter (a, b, c, or d)",
              "Explanation": "Explanation for the correct answer"
            },
            ...
          ]
          `;
          
        // }

        const openAi = new OpenAIApi(
          new Configuration({
            apiKey: import.meta.env.VITE_OPENAI_KEY,
          })
        );
        let questions;
        // console.log("QUERY", query);
        try {
        const response = await openAi.createChatCompletion({
          model: "gpt-4",
          // model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: query }],
          temperature: 0.5,
        });

        const message = response?.data?.choices[0]?.message?.content;
        // const questions = message?.split("Question:");
        // console.log(message);
        const sanitizedJsonString = message?.replace(/[\x00-\x1F\x7F-\x9F]/g, ''); 
          questions = sanitizedJsonString && JSON.parse(sanitizedJsonString);
          // const questions = message?.split("Question:");
          // console.log(questions);
          
          questions?.map((item: any, index: any) => {
            // if (category == 3) {
            // item.Paragraph = item.Paragraph.replace(/Paragraph:/g, "").replace(
            //   /\/n/g,
            //   ""
            // );
            if (
              !item.Paragraph ||
              item.Paragraph == "undefined" ||
              item.Paragraph == "N/A"
            ) {
              // console.log(!item.Paragraph);
              delete item.Paragraph;
            }
            // item.Conversation = item.Conversation.replace(
            //   /Paragraph:/g,
            //   ""
            // ).replace(/\/n/g, "");
            if (
              !item.Conversation ||
              item.Conversation == "undefined" ||
              item.Conversation == "N/A"
            ) {
              // console.log(!item.Conversation);
  
              delete item.Conversation;
            }
  
            // item.Paragraph =
            //   item.Paragraph && item.Paragraph != "undefined"
            //     ? item.Paragraph.replace(/Paragraph:/g, "").replace(/\/n/g, "")
            //     : "";
  
            item.Question =
              item.Question && item.Question != "undefined"
                ? item.Question.replace(/Conversation:/g, "").replace(/\/n/g, "")
                : "";
  
            // }
            item.Explanation =
              item.Explanation &&
              item.Explanation.replace(/Explanation:/g, "").replace(/\/n/g, "");
            // item.Question =
            //   item.Question &&
            //   item.Question.replace(/Question:/g, "").replace(/\/n/g, "");
            let data: string[] = [];
            // const keysToCheck = ["Paragraph", "Conversation", ""];
            // const itemKeys = Object.keys(item);
            // const exists = keysToCheck.every((key) => {
            //   return itemKeys.includes(key);
            // });
  
            // if (exists) {
            // if (item.Paragraph || item.Conversation) {
              const paragraphData = item.Paragraph?.split(" ") ?? [];
              const conversationData = item.Conversation?.split(" ") ?? [];
              const questionData = item.Question.split(" ") ?? [];
              data = [...paragraphData, ...conversationData, ...questionData];
              // console.log(paragraphData, conversationData, questionData);
            // }
            // data = [
            //   ...item.Paragraph?.split(" "),
            //   ...item.Conversation?.split(" "),
            // // ];
            // else {
            //   data = item.Question.split(" ");
            // }
            // console.log(data);
  
            item.images = [];
            let count: number = 0;
            // console.log(item.images?.length);
  
            // if (item.images?.length !== 2) {
            // if (exists) {
            // const m_random = Math.floor(Math.random() * 3);
  
            // const m_image_urls2:string[] = [...maleNames].splice(10,10).filter((name:string)=>{
            //   return image_keyword.includes(name)
            // });
            // let t = [...maleNames];
  
            // console.log(" girl " + m_random);
            if (count === 0) {
              const m_image_urls: string[] = [...maleNames]
                .splice(0, 10)
                .filter((name: string) => {
                  return image_keyword.includes(name.toLowerCase());
                });
              // console.log(image_keyword, m_image_urls);
  
              for (const search of m_image_urls) {
                const caps = search.toLowerCase();
                const match = data.find(
                  (word: string) => word.toLowerCase() === caps
                );
  
                if (match) {
                  // console.log(match);
                  const url = image_data.find(
                    (word: any) =>
                      word.image_name.toLowerCase() === match.toLowerCase()
                  );
                  // console.log(url, match);
                  item.images?.push(url.image_url);
                  count++;
                  break;
                }
              }
            }
  
            if (count == 0) {
              const g_image_urls = [...femaleNames]
                .splice(0, 10)
                .filter((name: string) => {
                  return image_keyword.includes(name.toLowerCase());
                });

              for (const search of g_image_urls) {
                // [...g_image_urls].forEach((search: string) => {
                const caps = search.toLowerCase();
                const match = data.find(
                  (word: string) => word.toLowerCase() === caps
                );
  
                if (match) {
                  // console.log(match);
                  const url = image_data.find(
                    (word: any) =>
                      word.image_name.toLowerCase() === match.toLowerCase()
                  );
                  // console.log(url, match);
                  item.images?.push(url.image_url);
                  count++;
                  break;
                }
              }
            }
  
            if (count <= 1) {
              const m_image_urls: string[] = [...maleNames]
                .splice(10, 10)
                .filter((name: string) => {
                  return image_keyword.includes(name.toLowerCase());
                });
              for (const search of m_image_urls) {
                const caps = search.toLowerCase();
                const match = data.find(
                  (word: string) => word.toLowerCase() === caps
                );
  
                if (match) {
                  // console.log(match);
                  const url = image_data.find(
                    (word: any) =>
                      word.image_name.toLowerCase() === match.toLowerCase()
                  );
                  // console.log(url, match);
                  item.images?.push(url.image_url);
                  count++;
                  break;
                }
              }
            }
  
            if (count <= 1) {
              const g_image_urls = [...femaleNames]
                .splice(10, 10)
                .filter((name: string) => {
                  return image_keyword.includes(name.toLowerCase());
                });
              for (const search of g_image_urls) {
                const caps = search.toLowerCase();
                const match = data.find(
                  (word: string) => word.toLowerCase() === caps
                );
  
                if (match) {
                  // console.log(match);
                  const url = image_data.find(
                    (word: any) =>
                      word.image_name.toLowerCase() === match.toLowerCase()
                  );
                  // console.log(url, match);
                  item.images?.push(url.image_url);
                  count++;
                  break;
                }
              }
            }
            // console.log(count);
            
            // const g_random = Math.floor(Math.random() * 1);
  
            // const g_image_urls2 = femaleNames.splice(0,10).filter((name:string)=>{
            //   image_keyword.includes(name)
            // });
            // console.log(" girl " + g_random);
  
            // }
            // image_data.forEach(
            //   (search: { image_name: string; image_url: string }) => {
            //     if (item.images?.length >= 2) {
            //       return true;
            //     }
            //     const caps = search.image_name.toUpperCase();
  
            //     const match = data.find(
            //       (word: string) => word.toUpperCase() === caps
            //     );
  
            //     if (match) {
            //       item.images?.push(search.image_url); // Add the image URL to the question
            //     }
            //   }
            // );
            // }
            // console.log(male,female);
  
            // if (item.images.length === 0) {
            //   delete item.images;
            // }
  
            responses.push(item); // Add the modified item to the responses array
          });
          // throw "error"
        } catch (e) {
          console.log(e);
          
          setErrMessage(`Question No.- ${key + 1} is not proper in Csv`);
          handleAlertBoxOpen();
        }
        // console.log(message);
        // console.log(questions);
       
        // console.log(responses);
      }
      console.log(responses);
      setResData(responses);
      return responses;
    },
    onSuccess: (data: any) => {
      console.log("Success Data", data);
    },
    onError: (error) => {
      // console.log(error);
      setErrMessage(
        "There is something wrong with Generator. Please try Again"
      );
      handleAlertBoxOpen();
      // <AlertBox />
    },
  });

  // console.log(!(totalQuestions));

  return (
    <>
      <AlertBox
        name={errMessage}
        type="error"
        bol={open}
        handleAlertBoxClose={handleAlertBoxClose}
      />

      <AlertBox
        name="Successfully added Topic"
        type="success"
        bol={open2}
        handleAlertBoxClose={handleAlertBoxClose2}
      />
      <Box marginY={5} marginLeft={2}>
      <ParaText4 text={`Total Question Generated: ${resData.length}`} css={{fontWeight:"bold"}}/>

      </Box>
      {!edit
        ? (csvData.length > 0 || category == "1") && (
            <Stack marginY="1rem" direction="row" spacing={2}>
              {resData.length == 0 &&
                category != 2 &&
                (newRes.isLoading ? (
                  <BButton2 type="button" name="Generating..." />
                ) : (
                  <BButton2
                    type="button"
                    func={handleGenerate}
                    name="Generate"
                  />
                ))}
              {resData.length != 0 && newRes.data && (
                <DownloadPDF
                  randomG={true}
                  data={newRes.data}
                  set={false}
                  bol={false}
                  topic={topicGen}
                  button={
                    <BButton2
                      type="button"
                      name="Download"
                      disabled={!totalQuestions}
                    />
                  }
                  total={totalQuestions}
                  cateId={category}
                />
              )}
              {(resData.length != 0 || category == 2) && (
                <BButton2
                  type="button"
                  func={() => handleUpload(newRes.data ? newRes.data : csvData)}
                  name={addTestCTMu.isLoading ? "Uploading..." : "Upload"}
                />
              )}
              {(resData.length != 0 || category == 2) && (
                <BButton2
                  type="button"
                  func={() => setResData([])}
                  name={"Reset"}
                />
              )}
            </Stack>
          )
        : csvData.length > 0 && (
            <Stack marginY="1rem" direction="row" spacing={2}>
              {resData.length == 0 &&
                category != 2 &&
                (newRes.isLoading ? (
                  <BButton2 type="button" name="Re-Generating..." />
                ) : (
                  <BButton2
                    type="button"
                    func={handleGenerate}
                    name="Re-Generate"
                  />
                ))}
              {/* {resData.length != 0 && newRes.data && (
                // <DownloadPDF
                //   data={resData}
                //   bol={!!resData}
                //   topic={topicGen}
                //   total={totalQuestions}
                //   button={<BButton2 type="button" name="Download" />}
                // />
              )} */}
              {(resData.length != 0 || category == 2) && (
                <BButton2
                  type="button"
                  func={() =>
                    !updateTestCTMu.isLoading &&
                    (newRes.data
                      ? updateTestCTMu.mutate(newRes.data)
                      : updateTestCTMu.mutate(csvData))
                  }
                  name={updateTestCTMu.isLoading ? "Uploading..." : "Upload"}
                />
              )}
            </Stack>
          )}
      {/* { csvData.length - 2 < currentIndex && <PdfMaker data={resData} />} */}
      {/* {generate ? (
        <Test
          key={currentData.Question}
          item={currentData}
          topic={topicGen}
          totalQuestions={totalQuestions}
        /> */}
      {/* ) : ( */}
      {/* <></> */}
      {/* )} */}
      {resData?.length > 1 && (
        <>
          {/* <Stack alignItems={"center"} mt={2} mb={1}>
            <Pagination
              color="secondary"
              variant="outlined"
              count={Math.ceil(resData.length / itemsPerPage)} // Calculate the number of pages
              page={currentPage}
              onChange={handlePageChange}
            />
          </Stack> */}
          <Stack spacing={2}>
            {currentData?.map((questionData: any, index: any) => (
              <QuestionCard
                key={index}
                // questionNo={index + 1}
                paragraph={questionData?.Paragraph}
                conversation={questionData?.Conversation}
                images={questionData?.images}
                question={questionData?.Question}
                options={questionData?.Options}
                answer={questionData?.Answer}
                explanation={questionData?.Explanation}
                index={index}
                data={resData}
                updateData={setResData}
              />
            ))}
          </Stack>
          <Stack alignItems={"center"} mt={2} mb={1}>
            <Pagination
              color="secondary"
              variant="outlined"
              count={Math.ceil(resData.length / itemsPerPage)} // Calculate the number of pages
              page={currentPage}
              onChange={handlePageChange}
            />
          </Stack>
        </>
      )}
    </>
  );
};

export default Thinking;
