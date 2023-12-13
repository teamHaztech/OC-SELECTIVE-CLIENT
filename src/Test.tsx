// import axios from 'axios';
// import React from 'react'
// import js from './Pages/Admin/TestSeries/Question'
// import { OpenAIApi, Configuration } from 'openai'
// const Test = () => {
// // Function to generate a question using GPT API
//     // async function generateQuestion(prompt:any) {
//     //   try {
//     //     const response = await axios.post('https://api.openai.com/v1/chat/completions', {
//     //       prompt: prompt,
//     //       max_tokens: 100, // Adjust the desired length of the generated question
//     //       temperature: 0.7, // Adjust the temperature to control the randomness (0.0 to 1.0)
//     //       n: 1, // Number of questions to generate
//     //       stop: '\n' // Stop generation at the end of a line
//     //     }, {
//     //       headers: {
//     //         'Content-Type': 'application/json',
//     //         'Authorization': 'Bearer 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' // Replace with your OpenAI API key
//     //       }
//     //     });

//     //     const question = response.data.choices[0].text.trim();
//     //     return question;
//     //   } catch (error) {
//     //     console.error('Failed to generate question:', error);
//     //     return null;
//     //   }
//     // }

//     // Usage example
// const prompt = 'The capital city of France is';
// generateQuestion(prompt)
//   .then(question => {
//     console.log('Generated Question:', question);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });

//       const configuration = new Configuration({
//         apiKey: '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',
//       });

//       const openai = new OpenAIApi(configuration)

//       const completion = openai.createCompletion({
//         model:'text-davinci-003',
//         prompt: process.argv.slice(2).toString(),
//         max_tokens: 1000
//       })

//       console.info('loading...')
//       completion.then((r:any) =>{
//         console.info(r.data.choices[0].text)
//       })

//       return <div></div>;
// }

// export default Testimport React, { useState } from 'react';
import { Configuration, OpenAIApi } from "openai";
import readline from "readline";
import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { Stack } from "@mui/material";
// import QuestionCard from "./Pages/Admin/TestSeries/Components/QuestionCard";

const openAi = new OpenAIApi(
  new Configuration({
    apiKey: "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",
  })
);

type Inputs = {
  topic: string;
  question: string;
  a: string;
  b: string;
  c: string;
  d: string;
  answer: string;
  explanation: string;
};

interface TestProps {
  csvData?: any;
  item?: any;
  topic: string;
  generate?: boolean;
  resData?: any;
  totalQuestions?: any;
}

function Test({
  csvData,
  item,
  topic,
  generate,
  resData,
  totalQuestions,
}: TestProps) {
  // const [input, setInput] = useState("");
  // const [response, setResponse] = useState("");
  // const [resData, setResData] = useState([]);
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  //   reset,
  //   control,
  // } = useForm<Inputs>();

  // useEffect(() => {
  //   console.log("Input updated:", input);
  //   // if (generate) {
  //   //   onSubmit();
  //   onSubmit();
  //   // }
  // }, [input]);
  // console.log("testttt", item);
  // console.log(topic);

  // const onSubmit = async () => {
  //   setInput(`Generate 3 unique multiple-choice questions (MCQs),keep the question sentence same just change the variable like number, name, gender and don't give the questions number after Question, it should be based on ${topic}, with options, correct answers, explanations, the example provided below:

  //   Question:${item.Question}

  //   Options:
  //   a. ${item.Option_A},
  //   b. ${item.Option_B},
  //   c. ${item.Option_C},
  //   d. ${item.Option_C}

  //   Answer: ${item.Answer}

  //   Explanation:${
  //     item.Explanation
  //       ? item.Explanation
  //       : "Generate an explanation based questions and correct answer"
  //   }
  //   `);
  //   console.log("Input", input);
  //   newRes.mutate();
  // };

  // const newRes = useMutation({
  //   mutationFn: async () => {
  //     console.log("object");
  //     const response = await openAi.createChatCompletion({
  //       model: "gpt-3.5-turbo",
  //       messages: [{ role: "user", content: input }],
  //     });

  //     return response;
  //   },
  //   onSuccess: (response) => {
  //     const message = response?.data?.choices[0]?.message?.content;
  //     message && setResponse(message);
  //     const questions = message?.split("Question:");

  //     const data: {
  //       [key: string]: {
  //         question: string;
  //         options: string[];
  //         answer: string;
  //         explanation: string;
  //       };
  //     } = {};

  //     console.log(questions);
  //     const tempArray: any = [];

  //     questions?.map((question: string, index: any) => {
  //       if (!question) return;
  //       if (index == 0) return;
  //       const objects: any = {};
  //       const val1 = question?.split("Options:");
  //       objects.question = val1[0];
  //       const val2 = val1[1]?.split("Answer:");
  //       objects.options = val2[0];
  //       const val3 = val2[1]?.split("Explanation:");
  //       objects.answer = val3[0].replace(/\s/g, "");
  //       objects.explanation = val3[1];

  //       objects.options = {
  //         a: objects.options.split("a.")[1].split("b.")[0].replace(/\s/g, ""),
  //         b: objects.options.split("b.")[1].split("c.")[0].replace(/\s/g, ""),
  //         c: objects.options.split("c.")[1].split("d.")[0].replace(/\s/g, ""),
  //         d: objects.options.split("d.")[1].replace(/\s/g, ""),
  //       };

  //       tempArray.push(objects);
  //     });
  //     setResData(tempArray);
  //     console.log(tempArray);
  //     setInput("");
  //   },
  // });

  // if (newRes.isLoading) {
  //   return <h1>Loading...</h1>;
  // }

  return (
    <div className="">
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <div className="border border-black p-4 rounded">
          <label htmlFor="topic" className="block mb-2">
            Topic
          </label>
          <input
            type="text"
            {...register("topic")}
            id="topic"
            className="w-full h-10 border border-black rounded mb-4 px-2"
          />

          <label htmlFor="question" className="block mb-2">
            Question
          </label>
          <input
            type="text"
            {...register("question")}
            id="question"
            className="w-full h-10 border border-black rounded mb-4 px-2"
          />

          <label htmlFor="a" className="block mb-2">
            Option A
          </label>
          <input
            type="text"
            {...register("a")}
            id="a"
            className="w-full h-10 border border-black rounded mb-4 px-2"
          />

          <label htmlFor="b" className="block mb-2">
            Option B
          </label>
          <input
            type="text"
            {...register("b")}
            id="b"
            className="w-full h-10 border border-black rounded mb-4 px-2"
          />

          <label htmlFor="c" className="block mb-2">
            Option C
          </label>
          <input
            type="text"
            {...register("c")}
            id="c"
            className="w-full h-10 border border-black rounded mb-4 px-2"
          />

          <label htmlFor="d" className="block mb-2">
            Option D
          </label>
          <input
            type="text"
            {...register("d")}
            id="d"
            className="w-full h-10 border border-black rounded mb-4 px-2"
          />

          <label htmlFor="answer" className="block mb-2">
            Answer
          </label>
          <input
            type="text"
            {...register("answer")}
            id="answer"
            className="w-full h-10 border border-black rounded mb-4 px-2"
          />

          <label htmlFor="explanation" className="block mb-2">
            Explanation
          </label>
          <input
            type="text"
            {...register("explanation")}
            id="explanation"
            className="w-full h-10 border border-black rounded mb-4 px-2"
          />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Send
          </button>
        </div>
      </form> */}
      {/* <button type="button" onClick={onSubmit}>
        Submit
      </button> */}
      {/* {totalQuestions.length === 0 ? (
        <div>
          <div>Error try again</div>
        </div>
      ) : (
        <Stack spacing={2}>
          {totalQuestions?.map((item: any, key: any) => (
            <QuestionCard
              key={key}
              questionNo={key + 1}
              question={item.question}
              Option_A={item.options.a}
              Option_B={item.options.b}
              Option_C={item.options.c}
              Option_D={item.options.d}
              answer={item.answer}
              explanation={item.explanation}
            />
          ))}
        </Stack> */}

        {/* totalQuestions?.map((item: any, key: any) => { */}
        {/* //   return ( */}
{/* 
        //     <div key={key} className="my-10">
        //       <h1>{`question ${key + 1}: ${item.question} `}</h1>
        //       <h1>{`option: a) ${item.options.a} b) ${item.options.b} c) ${item.options.c} d) ${item.options.d}`}</h1>
        //       <h1>{`answer: ${item.answer} `}</h1>
        //       <h1>{`explanation ${item.explanation} `}</h1>
        //     </div>
        //   );
        // }) */}
      {/* // )} */}
    </div>
  );
}

export default Test;
