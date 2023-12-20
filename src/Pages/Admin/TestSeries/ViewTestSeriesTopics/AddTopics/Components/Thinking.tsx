import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import { Pagination, Stack } from "@mui/material";
import QuestionCard from "../../../Components/QuestionCard";
import { BButton2 } from "../../../../../../Components/Common/Button";
import DownloadPDF from "../../../Components/PDF/DownloadPDF";
import AlertBox from "../../../../../../Components/Common/AlertBox";
import { useMutation, useQuery } from "@tanstack/react-query";
import adminTokenAxios from "../../../../../../Hooks/AdminTokenAxios";
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
console.log(Math.round(totalQuestions/csvData.length),csvData.length,totalQuestions);

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
  let image_data = data?.data.images;
  // console.log(image_data);

  const addTestCTMu = useMutation({
    mutationFn: async (data: object[]) => {
      console.log(data);

      return await adminTokenAxios.post(`/admin/add-test-series-topics`, {
        tsc_id: category,
        t_name: topicName,
        question: data,
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
        { question: data }
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
        addTestCTMu.mutate(filteredCsvData);
      } else {
        alert("upload csv in correct formast");
      }
    } else {
      addTestCTMu.mutate(data);
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
      (JSON.stringify(header1) === JSON.stringify(array2)) ||
      (JSON.stringify(header2) === JSON.stringify(array2))
    ) {
      const filteredCsvData = csvData.filter((item: any) => {
        if (item.Question && item.Option_D) {
          // console.log(!!item.Question);
          return true;
        }
        return false;
      });
      console.log(filteredCsvData);
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
          "Henry",
          "James",
          "Nathan",
          "Carl",
          "John",
          "Peter",
          "Shane",
          "Alfred",
          "Bobby",
          "Clive",
          "Dennis",
          "Lloyd",
          "Luke",
          "Oliver",
          "Philip",
          "Winston",
          "Henry",
          "Jackson",
          "Charlie",
          "Roy",
          "Harrison",
          "Josh",
          "Billy",
        ];
        const femaleNames = [
          "Alice",
          "Zoya",
          "Emma",
          "Darcy",
          "Ella",
          "Mary",
          "Freda",
          "Janie",
          "Katty",
          "Myra",
          "Nora",
          "Martha",
          "Veverly",
          "Ruth",
          "Jenifer",
          "Jenifer",
          "Diana",
          "Lucy",
          "Daisy",
          "Georgia",
          "Matilda",
          "Eliza",
          "Clara",
          "Kate",
        ];
        let query = "";
        // if (category == 3) {
          query = `Generate ${Math.round(totalQuestions/csvData.length)} unique and challenging advanced-level practice questions designed for college students preparing for an aptitude exam on the topic of ${topic}. These questions should meet the following criteria:
   
          Example Question:
          Paragraph:${item.Paragraph}
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
  
          Please follow these guidelines for generating each MCQ:
  
          1. For each question, use one of the specified names in order for persons. For males, use ${maleNames.join(
            ", "
          )}, and for females, use ${femaleNames.join(", ")}.
  
          2. Maintain the question and Explanation sentence structure only modify variables like numbers.
  
          3. Ensure that each question includes options (a, b, c, d), a correct answer, and an explanation. If an explanation is not provided, mention that one should be generated.
  
          4. If there is a Paragraph ,conversation between persons, generate that as well.
  
          5. Provide the JSON representation of the five MCQs in the following format:
  
          [
            {
              "Paragraph": "Replace with paragraph text"
              "Conversation": "Replace with conversation text"
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
           ....
          ]
  `;
        // }

        const openAi = new OpenAIApi(
          new Configuration({
            apiKey: import.meta.env.VITE_OPENAI_KEY,
          })
        );
        console.log("QUERY", query);
        const response = await openAi.createChatCompletion({
          model: "gpt-4",
          // model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: query }],
        });

        const message = response?.data?.choices[0]?.message?.content;
        // const questions = message?.split("Question:");
        let questions;
        try {
          questions = message && JSON.parse(message);
          // throw "error"
        } catch (e) {
          setErrMessage(`Question No.- ${key + 1} is proper in Csv`);
          handleAlertBoxOpen();
        }
        // console.log(message);
        console.log(questions);
        questions?.map((item: mapData, index: any) => {
          // if (category == 3) {
            item.Paragraph = item.Paragraph && item.Paragraph != "undefined"
              ? item.Paragraph.replace(/Paragraph:/g, "")
              : "";
              
            item.Conversation = item.Conversation && item.Conversation != "undefined"
              ? item.Conversation.replace(/Conversation:/g, "")
              : "";
           
          // }
          item.Explanation =
            item.Explanation && item.Explanation.replace(/Explanation:/g, "");
          item.Question =
            item.Question && item.Question.replace(/Question:/g, "");
          let data: string[] = [];
          const keysToCheck = ["Paragraph", "Conversation", ""];
          const itemKeys = Object.keys(item);
          const exists = keysToCheck.every((key) => {
            return itemKeys.includes(key);
          }); 

          // if (exists) {
          // if (item.Paragraph || item.Conversation) {
          const paragraphData = item.Paragraph?.split(" ") ?? [];
          const conversationData = item.Conversation?.split(" ") ?? [];
          const questionData = item.Question.split(" ") ?? [];
          data = [...paragraphData, ...conversationData, ...questionData];
          console.log(paragraphData, conversationData, questionData);
          // console.log(data,paragraphData,conversationData,questionData);
          // }

          // data = [
          //   ...item.Paragraph?.split(" "),
          //   ...item.Conversation?.split(" "),
          // // ];
          // else {
          //   data = item.Question.split(" ");
          // }
          console.log(data);

          item.images = [];
          let count: number = 1;
          // console.log(item.images?.length);

          // if (item.images?.length !== 2) {
          // if (exists) {
            maleNames.forEach((search: string) => {
              if (item.images.length <= 2) {
                return true; // Exit the loop
              }
              const caps = search.toUpperCase();
              let match = data.find(
                (word: string) => word.toUpperCase() === caps
              );
              if (match) {
                match = data.find(
                  (word: string) => word.toUpperCase() === caps
                );
              }
              if (match) {
                switch (count) {
                  case 1:
                    item.images?.push("/images/boy.jpg");
                    count++;
                    break;
                  case 2:
                    item.images?.push("/images/left_boy.jpg");
                    count++;
                    break;
                  default:
                    item.images?.push("/images/left_boy.jpg");
                    count++;
                }
              }
              return count == 3;
            });
            femaleNames.forEach((search: string) => {
              if (item.images.length <= 2) {
                return true; 
              }
              const caps = search.toUpperCase();
              const match = data.find(
                (word: string) => word.replace(/:/g, "").toUpperCase() === caps
              );

              if (match) {
                switch (count) {
                  case 1:
                    item.images?.push("/images/right_girl.jpg");
                    count++;
                    break;
                  case 2:
                    item.images?.push("/images/girl.jpg");
                    count++;
                    break;
                  case 3:
                  default:
                    item.images?.push("/images/girl.jpg");
                    count++;
                }
              }
              return count == 3;
            });
          // }
          image_data.forEach(
            (search: { image_name: string; image_url: string }) => {
              if (item.images?.length === 1) {
                return true; // Exit the loop
              }
              const caps = search.image_name.toUpperCase();

              const match = data.find(
                (word: string) => word.toUpperCase() === caps
              );

              if (match) {
                item.images?.push(search.image_url); // Add the image URL to the question
              }

              return item.images?.length === 3;
            }
          );
          // }
          // console.log(male,female);

          // if (item.images.length === 0) {
          //   delete item.images;
          // }

          responses.push(item); // Add the modified item to the responses array
        });
        console.log(responses);
      }
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
                  <BButton2 type="button" name="Generating..." />
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
          <Stack alignItems={"center"} mt={2} mb={1}>
            <Pagination
              color="secondary"
              variant="outlined"
              count={Math.ceil(resData.length / itemsPerPage)} // Calculate the number of pages
              page={currentPage}
              onChange={handlePageChange}
            />
          </Stack>
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
                updateData={setResData}              />
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
