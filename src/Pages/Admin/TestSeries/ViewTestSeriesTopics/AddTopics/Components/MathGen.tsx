import { Pagination, Stack } from "@mui/material";
import React, { useState } from "react";
import QuestionCard from "../../../Components/QuestionCard";
import { BButton2 } from "../../../../../../Components/Common/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import adminTokenAxios from "../../../../../../Hooks/AdminTokenAxios";
import { Configuration, OpenAIApi } from "openai";
import AlertBox from "../../../../../../Components/Common/AlertBox";
import DownloadPDF from "../../../Components/PDF/DownloadPDF";

type mapData = {
  Conversation?: string;
  Paragraph?: string;
  Answer: string;
  Explanation: string;
  Options: string[];
  Question: string;
  images?: string[];
};

interface MathProps {
  formData: any;
  reset?: any;
  edit?: boolean;
  topicId?: number | string;
  handleClose?: () => void;
}
const MathGen = ({
  formData,
  reset,
  edit,
  topicId,
  handleClose,
}: MathProps) => {
  const [category, topicGen, totalQuestions, testType, topicName] = formData;

  const [resData, setResData] = useState([]);
  const [open, setOpen] = useState<boolean>(false);
  const [errMessage, setErrMessage] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = resData.slice(startIndex, endIndex);

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
        setResData([]);

        handleClose?.();
      }
    },
  });

  const handleUpload = async (data: any) => {
    addTestCTMu.mutate(data);
  };

  const handleGenerate = async () => {
    newRes.mutate();
  };

  const newRes = useMutation({
    mutationFn: async () => {
      // console.log("object 2", input);
      const exception = new Error();
      exception.name = "CustomError";
      // throw exception;
      const responses: any[] = [];
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

      if (testType == 2) {
        query = `Generate ${totalQuestions} unique and exceptionally challenging advanced-level practice questions designed for 25-year-old college students preparing for an aptitude exam on the topic of ${topic} that should be extremely difficult, requiring a high IQ of 140 and above.

        Criteria:
        - Scenario: Each question should intricately incorporate a real-life story or scenario related to the topic, making it profoundly contextually rich and engaging.no limit in how long the question is
        - Clarity: Craft questions that are not only clear and concise but also feature intricate details that demand careful consideration from the students.
        - Diversity: Create a diverse set of questions covering various nuanced aspects of the topic to ensure a comprehensive and thorough preparation experience.
        - Options: Formulate four multiple-choice answer options (A, B, C, and D) for each question, challenging students' knowledge and pushing their problem-solving skills to the limit.
        - Complexity: Ensure that the questions are not just challenging, but they should demand an exceptional level of critical thinking and intellectual prowess, reflecting the highest standards of advanced-level aptitude exams.
        - Answer: Provide the correct answer options (A, B, C, and D) for each question based on the intricacies of the scenario and sophisticated calculations.
        - Explanation: Furnish a detailed and elaborate explanation for the correct answer to help students comprehend the underlying concepts, encouraging a deep understanding of the subject matter.
        
        Names:
        For male characters, incorporate names such as ${maleNames.join(", ")}.
        For female characters, utilize names like ${femaleNames.join(", ")}.
        
        Provide JSON representation for the multiple-choice questions (MCQs) in the following format:
        [
          {
            "Question": "Replace with an exceptionally challenging and lengthy question text that demands critical thinking and analysis from the students.",
            "Options": {
              "a": "Option A text",
              "b": "Option B text",
              "c": "Option C text",
              "d": "Option D text"
            },
            "Answer": "Specify the correct option (A, B, C, or D) based on the scenario and calculations.",
            "Explanation": "Provide an in-depth and comprehensive explanation for the correct answer, unraveling the intricate details of the scenario and solution."
          },
           generate ${totalQuestions-2}  more like this 
        ]
        `;
        
      } else {
        query = `Generate ${totalQuestions} unique and challenging beginner-level practice word questions designed for 25 college year students who are preparing for an aptitude exam on the topic of ${topic}. Each question should be based on real-life scenarios, and no limit in how long the question is. 
        Ensure the following criteria for each question:

        1. Scenario: Incorporate a real-life scenario that relates to the topic and makes the question contextually rich.
        2. Clarity: Craft questions that are clear, concise, and easily understandable for 25 college year students.
        3. Diversity: Create a diverse set of questions that cover various aspects of the topic.
        4. Options: Formulate four multiple-choice answer options (A, B, C, and D) for each question.
        5. Complexity: Ensure that answer choices are complex and require critical thinking.
        6. Answer: Provide a correct answer options (A, B, C, and D) based on the question.
        7. Explanation: Provide a detailed explanation for the correct answer to help students understand the concepts.

        Names:
        For male characters, use names like ${maleNames.join(", ")}.
        For female characters, use names like ${femaleNames.join(", ")}. 
        Provide JSON representation for the multiple-choice questions (MCQs) in the following format:
    [
      {
        "Question": "Replace with a challenging question text",
        "Options": {
          "a": "Option A text with complexity",
          "b": "Option B text with intricacy",
          "c": "Option C text with nuance",
          "d": "Option D text with exceptions"
        },
        "Answer": "Correct answer letter (a, b, c, or d)",
        "Explanation": "Detailed explanation for the correct answer"
      },
      generate ${totalQuestions-2}  more like this 
    
   
    ]
    `;
      }

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
        setErrMessage(`something went wrong`);
        handleAlertBoxOpen();
      }
      // console.log(message);
      console.log("parsed", questions);
      questions?.map((item: mapData, index: any) => {
        item.Explanation =
          item.Explanation && item.Explanation.replace(/Explanation:/g, "");
        item.Question =
          item.Question && item.Question.replace(/Question:/g, "");
        let data: string[] = [];
        item.images = [];
        let count: number = 1;
        console.log(item.images?.length);

        image_data?.forEach(
          (search: { image_name: string; image_url: string }) => {
            if (item.images?.length === 1) {
              return true; 
            }
            const caps = search.image_name.toUpperCase();

            const match = data.find(
              (word: string) => word.toUpperCase() === caps
            );

            if (match) {
              item.images?.push(search.image_url); // Add the image URL to the question
            }
           
          }
        );
       // }
        // console.log(male,female);

        if (item.images?.length === 0) {
          delete item.images;
        }

        responses.push(item); // Add the modified item to the responses array
      });
      console.log("final", responses);
      return responses;
    },

    onSuccess: (data: any) => {
      setResData(data);
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
        ? category == "1" && (
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
              {resData.length != 0 && newRes.data && totalQuestions && (
                <DownloadPDF
                  randomG={true}
                  data={newRes.data}
                  set={false}
                  bol={false}
                  topic={`${testType == 1 ? "OC" : "Selective"} - ${topicName}`}
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
                  func={() => handleUpload(newRes.data)}
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
        : category == "1" && (
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
                    //   topic={topic1[1]}
                    //   total={totalQuestions}
                    //   button={<BButton2 type="button" name="Download" />}
                    // />
                  )} */}
              {(resData.length != 0 || category == 2) && (
                <BButton2
                  type="button"
                  func={() =>
                    !updateTestCTMu.isLoading &&
                    newRes.data &&
                    updateTestCTMu.mutate(newRes.data)
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
              topic={topic1[1]}
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
                data={resData}
                updateData={setResData}
                key={index}
                // questionNo={index + 1}
                index={index}
                paragraph={questionData?.Paragraph}
                conversation={questionData?.Conversation}
                images={questionData?.images}
                question={questionData?.Question}
                options={questionData?.Options}
                answer={questionData?.Answer}
                explanation={questionData?.Explanation}
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

export default MathGen;
