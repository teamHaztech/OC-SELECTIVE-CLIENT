import React, { useEffect, useRef, useState } from "react";
import PdfMaker from "./Pages/Admin/TestSeries/Components/PdfMaker";
import { BButton2 } from "./Components/Common/Button";

// import { useTime, useTimer } from 'react-timer-hook';
// import {
//   BlobProvider,
//   Document,
//   Page,
//   Text,
//   View,
//   Image,
//   Link,
//   StyleSheet,
//   PDFViewer,
//   PDFDownloadLink,
// } from "@react-pdf/renderer";
// import PdfMaker from "./Pages/Admin/TestSeries/Components/PdfMaker";
// import AlertBox from "./Components/Common/AlertBox";
// import { UserContext } from "./Context/UserContext";

// Create styles
// const styles = StyleSheet.create({
//   page: {
//     flexDirection: "row",
//     backgroundColor: "#E4E4E4",
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1,
//   },
// });

// const Test2 = () => {
// const val = `Question: Jack's age is 5 years less than twice Jill's age. If the sum of their ages is 35, what are their current ages? Options: a. 10 years, 25 years b. 8 years, 17 years c. 7 years, 14 years d. 6 years, 13 years Answer: B Explanation: Let Jill's age be x. Then, Jack's age is 2x - 5. The sum of their ages is x + (2x - 5) = 35. Combining like terms, we get 3x - 5 = 35. Adding 5 to both sides, we have 3x = 40. Dividing both sides by 3, we find x = 40/3. Therefore, Jill's age is approximately 13.33 years. Substituting this back into 2x - 5, we get Jack's age to be approximately 17.67 years. Since we cannot have fractions for ages, the closest answer choice is (B) 8 years, 17 years.
//   Question: Jack's age is 5 years less than twice Jill's age. If the sum of their ages is 35, what are their current ages? Options: a. 10 years, 25 years b. 8 years, 17 years c. 7 years, 14 years d. 6 years, 13 years Answer: B Explanation: Let Jill's age be x. Then, Jack's age is 2x - 5. The sum of their ages is x + (2x - 5) = 35. Combining like terms, we get 3x - 5 = 35. Adding 5 to both sides, we have 3x = 40. Dividing both sides by 3, we find x = 40/3. Therefore, Jill's age is approximately 13.33 years. Substituting this back into 2x - 5, we get Jack's age to be approximately 17.67 years. Since we cannot have fractions for ages, the closest answer choice is (B) 8 years, 17 years.`;

// const questions = val?.split("Question:");
// const objects:any = {};  ;
// const tempArray:any = [];

// questions?.map((question: string, index: any) => {
//   if(!question) return;
//   if(index==0) return;
//     const val1 = question?.split("Options:");
//     objects.question =  val1[0];
//     const val2 = val1[1]?.split("Answer:");
//     objects.options =  val2[0];
//     const val3 = val2[1]?.split("Explanation:");
//     objects.answer =  val3[0];
//     objects.explanation =  val3[1];

//     objects.options = {
//      "a": objects.options.split("a.")[1].split("b.")[0],
//      "b": objects.options.split("b.")[1].split("c.")[0],
//      "c": objects.options.split("c.")[1].split("d.")[0],
//      "d": objects.options.split("d.")[1],
//     }

//   tempArray.push(objects)

// });

// console.log(tempArray);
//   return (
//     <div>
//       {/* {questions?.map((item: any, key: any) => {
//         return <div key={key}>{item}</div>;
//       })} */}

//     </div>
//   );
// };

// function MyTime() {
//   const time: Date = new Date();
//   time.setSeconds(time.getSeconds()+(45*60));

//   const { seconds, minutes , hours } = useTimer({
//     expiryTimestamp: time,
//     onExpire: () => console.warn('onExpire called'),
//   });

//   return (
//     <div style={{ textAlign: 'center' }}>
//       <div style={{ fontSize: '100px' }}>
//         <span>{minutes}</span>:<span>{seconds}</span>
//       </div>
//     </div>
//   );
// }
// let data = `Generate five unique multiple-choice questions (MCQs), keeping the question  sentence the same as the provided example, but changing variables like numbers, names, and genders. Do not include question numbers after 'Question'. An example is provided below with options, correct answer, explanation, and question based on the topic ${topic}. Also keep the explanation similar:

// Question: ${pCurrentData.Question}

// Options:
// a. ${pCurrentData.Option_A},
// b. ${pCurrentData.Option_B},
// c. ${pCurrentData.Option_C},
// d. ${pCurrentData.Option_D}

// Answer: ${pCurrentData.Answer}

// Explanation:${
//   pCurrentData.Explanation
//     ? pCurrentData.Explanation
//     : "Generate an explanation based questions and correct answer"
// }
// `;
let ArrayData: any = [
  {
      "Paragraph": "All employees in Alfred's office were given an envelope containing money for a holiday party. However, their supervisor didn't have enough envelopes for every employee. Each envelope contained five tickets. Alfred saw that one of his co-workers hadn't received an envelope, so he gave two of his tickets to his co-worker. The co-worker was very touched by his actions. Therefore, all members of a working community should strive to ensure fairness where feasible.",
      "Question": "Which of the following, if true, would strengthen the above argument?",
      "Options": {
          "a": "In the office environment, ensuring fairness is not as simple as sharing holiday party tickets.",
          "b": "If every member of the working community prioritised fairness, unhealthy competition and workplace inequality would decrease, improving job satisfaction and productivity.",
          "c": "It is the responsibility of Human Resources rather than individual employees to ensure fairness at work.",
          "d": "Sharing with others creates a positive work environment."
      },
      "Answer": "b",
      "Explanation": "This option supports the idea that striving to ensure fairness has broader and more significant implications beyond the simple act of sharing party tickets. It suggests that if everyone in the working community prioritized fairness, it could lead to a reduction in unhealthy competition and workplace inequality, ultimately resulting in improved job satisfaction and productivity.",
      "Conversation": ""
  },
  {
      "Paragraph": "Henry, a university professor, believes that students who refrain from using electronic devices in class tend to perform better academically. Henry suggests that all professors should enforce a strict no-electronics policy in their classrooms in order to improve student performance.",
      "Conversation": "",
      "Question": "Which of the following, if true, would strengthen Henry's argument?",
      "Options": {
          "a": "Students who use electronic devices in class are mostly just taking notes or looking up relevant information.",
          "b": "A recent empirical study shows that students who do not use electronic devices in class scored 25% higher on exams than those who do.",
          "c": "Many professors already enforce a no-electronics policy in their classrooms, but it has not been proven to impact academic performance.",
          "d": "Most students find it easier to take notes using electronic devices rather than writing by hand."
      },
      "Answer": "b",
      "Explanation": "This answer is correct because it strengthens Henry's argument by providing empirical evidence to support his claim. If a study shows that students who do not use electronic devices in class scored significantly higher on exams than those who do, it supports the idea that a no-electronics policy could indeed improve student performance."
  },
  {
      "Paragraph": "Recent studies indicate that 90% of people in the UK feel fatigued. Symptoms of fatigue include lack of energy, feeling constantly tired, prolonged mental tasks becoming difficult and concentration requiring more effort. Alfred always feels tired and finds it challenging to concentrate; therefore, he is fatigued.",
      "Question": "Which of the following statements, if true, would most weaken the above argument?",
      "Options": {
          "a": "In the UK, fatigue is more common in individuals with high-stress jobs than those with less stressful jobs.",
          "b": "Alfred consumes a lot of caffeine and has reduced sleep patterns.",
          "c": "Alfred prioritizes work over self-care and seldom eats a proper meal or exercises.",
          "d": "Certain sleep disorders which cause inadequate or poor-quality sleep have been associated with feelings of being constantly tired and trouble concentrating."
      },
      "Answer": "D",
      "Explanation": "This answer is correct as it weakens the argument by providing an alternative explanation for the symptoms Alfred is exhibiting - sleep disorders.",
      "Conversation": ""
  },
  {
      "Paragraph": "Luke, a professional basketball player, proposed a change to the coach, stating that most professional games that are won by the team are mostly played on Tuesdays. Thus, to maximise the winning chances of their team, Luke suggested that the basketball club should schedule the maximum number of their games on a Tuesday.",
      "Conversation": "",
      "Question": "Which of the following, if true, would most likely weaken the argument made by Luke?",
      "Options": {
          "a": "Luke scores the maximum points in games that occur on Tuesday.",
          "b": "The team has won all their games played on Tuesday so far in the current season.",
          "c": "The opposing teams often have their weakest players play games on Tuesday due to schedule conflicts.",
          "d": "Most teams play on Saturdays leading to higher competition among the well-prepared teams."
      },
      "Answer": "c",
      "Explanation": "Option C weakens Luke's argument because if the opposing teams are sending their weakest players on Tuesdays, this might be the reason the team is winning, not because Tuesday games in general enhance their performance."
  },
  {
      "Paragraph": "Henry  tends to be very reserved and keeps to himself in social situations, often avoiding conversation and sticking to himself. This reserved behavior represents Henry's desire for peace, tranquility and a solitary life. Consequently, Henry will do anything to maintain this solitude, even if it means missing out on social interactions.",
      "Question": "Which of the following, if true, would strengthen the above argument?",
      "Options": {
          "a": "In a survey, extroverts valued solitude at the same level as introverts like Henry.",
          "b": "Henry is more likely to decline social invites when it encroaches upon his solitude.",
          "c": "Introvert individuals like Henry are statistically more peaceful than extroverts.",
          "d": "In a survey with a random group of people, those who claimed to be introverts, like Henry, also confirmed they prefer solitude to social interactions."
      },
      "Answer": "d",
      "Explanation": "This answer is CORRECT because it strengthens the argument that Henry, being an introvert, prefers solitude over social interaction. This is validated by a survey that found similar preferences among a group of self-proclaimed introverts.",
      "Conversation": ""
  },
  {
      "Paragraph": "The efficiency of wind turbines in generating enough power is subject to certain conditions like wind speed and turbine height. Some analysts have expressed concern over the fact that turbines are often situated in regions with inadequate airflow. Based on this, Philip believes the government should impose stricter guidelines on where turbines are to be located. Which of the following, if true, would most effectively strengthen Philip's argument?",
      "Question": "Which of the following, if true, most effectively strengthens Philip's argument on imposing stricter guidelines on wind turbine locations?",
      "Options": {
          "a": "In certain regions, wind turbines have been found to generate surplus power which is not utilised.",
          "b": "Citizens rely on the government to ensure a sustainable and efficient power generation.",
          "c": "The visual aesthetics of wind turbines are often criticized by the public.",
          "d": "There is scientific evidence showing that high wind speed areas can significantly improve the efficiency of wind turbines."
      },
      "Answer": "d",
      "Explanation": "Option D provides specific scientific evidence that supports Philip's argument. It points out the correlation between wind speed, turbine location and efficiency, thus justifying the need for stricter guidelines.",
      "Conversation": ""
  },
  {
      "Paragraph": "At the city library, reading rooms are always occupied and difficult to get a seat during peak hours. However, there is a special provision: 'If you are a member of the library's board and the book you want to read is a new addition to the library, you will have direct access to a reading room.'",
      "Question": "If the above is correct, which of the following must be true?",
      "Options": {
          "a": "Zoya did not reserve a spot, but she was able to secure a reading room spot during peak hours.",
          "b": "Zoya is a member of the library board and wanted to revisit one of her favourite old novels. Hence, Zoya was provided a spot even during peak hours.",
          "c": "Zoya is not acquainted with any board member. Therefore, she couldn't get a seat in the reading room during peak hours without prior reservation.",
          "d": "Zoya wants to read a new addition book but has not reserved a spot. It is assured that she will be able to access the reading room without a prior reservation."
      },
      "Answer": "c",
      "Explanation": "The answer is CORRECT C as if Zoya did not know any board member, she couldn't have been a member. Therefore, the special provision for direct access to a reading room wouldn't apply during peak hours without a prior reservation.",
      "Conversation": ""
  },
  {
      "Paragraph": "In a recent survey about a redevelopment plan for a downtown district, more negative opinions were gathered from the residents than positive ones. David asserts that the pollsters are biased against the project because they have gathered more negative opinions.",
      "Conversation": "",
      "Question": "Which one of the following, if true, most seriously weakens David's argument?",
      "Options": {
          "a": "The redevelopment project will significantly increase the traffic in the downtown area.",
          "b": "Majority of the residents were unacquainted with the specifics of the redevelopment plan prior to the survey.",
          "c": "The pollsters were former residents of the same downtown district.",
          "d": "Before the survey was conducted, a considerable majority of the residents were already against the redevelopment plan."
      },
      "Answer": "d",
      "Explanation": "This information weakens David's argument by suggesting that the greater number of negative opinions gathered might just be reflecting the existing sentiment of the residents, rather than it being an indication of the pollsters' personal bias against the project. If the majority of the residents were already against the redevelopment plan even before the survey, then it would naturally lead to more negative responses, regardless of the pollsters' personal views about the project."
  },
  {
      "Paragraph": "Alfred is holding a birthday party. In his party invitation, Alfred mentioned that 'every type of cake in the party will be multi-layered and every chocolate cake will have cherries on top. None of the multi-layered cakes have cherries.'",
      "Conversation": "undefined",
      "Question": "Which of the following must be true according to Alfred's invitation?",
      "Options": {
          "a": "Some chocolate cakes are multi-layered.",
          "b": "Multi-layered cakes only contain flour, eggs, sugar, and cherries.",
          "c": "No multi-layered cakes are chocolate cakes.",
          "d": "All cakes in the party are chocolate cakes."
      },
      "Answer": "c",
      "Explanation": "This answer is CORRECT because if all chocolate cakes have cherries on top but none of the multi-layered cakes have cherries on top, there must be no overlap between chocolate cakes and multi-layered cakes. Therefore, no multi-layered cakes can be chocolate cakes."
  }
];

// export default function Test2() {
// const { handleAlertBoxOpen, alertBox } = UserContext();

// const click = () => {
//   // handleAlertBoxOpen();
//   data?.map((item: any, key: number) => {
//     let data = item.question.split(" ").sort();
//     item.images = [];

//     ["boys", "girls", "Two"].sort().forEach((search: string) => {
//       let s = 0;
//       let e = data.length - 1;
//       let caps = search.toUpperCase();
//       while (s <= e) {
//         let mid = Math.floor((s + e) / 2);

//         if (data[mid].toUpperCase() === caps) {
//           // console.log(item);
//           item.images.push(caps);
//           break;
//         }

//         if (data[mid].toUpperCase() < caps) {
//           s = mid + 1;
//         } else {
//           e = mid - 1;
//         }
//       }
//     });
//     if (item.images.length == 0) {
//       delete item.images;
//     }
//   });
//   // console.log(data);
// };

// return (
// <>
{
  /* <AlertBox name="Error" type="error" bol={ alertBox} /> */
}
{
  /* <PdfMaker data={data} bol={true} topic="ratio"/> */
}
{
  /* <button onClick={click}>click</button>
   */
}
{
  /* <img src="http://127.0.0.1:8000/images/nike.jpg" alt="" /> */
}
{
  /* <img src={`${import.meta.env.VITE_IMAGE_URL}/images/boy.jpg`} alt="dd" /> */
}
{
  /* {data && (
        <PdfMaker
          data={data}
          bol={!!data}
          topic={"new"}
          total={20}
          button={<BButton2 type="button" name="Download" />}
        />
      )} */
}

//   </>
// );

import DownloadPDF from "./Pages/Admin/TestSeries/Components/PDF/DownloadPDF";
import adminTokenAxios from "./Hooks/AdminTokenAxios";
import { useQuery } from "@tanstack/react-query";
// import potrace from "potrace-js";
const MyComponent = () => {
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
  const { data } = useQuery({
    queryKey: ["images"],
    queryFn: async () => {
      return await adminTokenAxios.get(`/admin/get-image/3`);
    },
   
  });
  const responses: any[] = [];
  let image_data = data?.data.images;
  ArrayData?.map((item: any, index: any) => {

      item.Paragraph = item.Paragraph
        ? item.Paragraph.replace(/Paragraph:/g, "")
        : "";
      item.Conversation = item.Conversation
        ? item.Conversation.replace(/Conversation:/g, "")
        : "";
 
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
    // console.log(paragraphData, conversationData, questionData);
    // console.log(data,paragraphData,conversationData,questionData);
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
    let count: number = 1;
    // console.log(item.images?.length);

    // if (item.images?.length !== 2) {
    // if (exists) {
      maleNames.forEach((search: string) => {
        if (item.images?.length === 2) {
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
        if (item.images?.length === 2) {
          return true; // Exit the loop
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
    image_data?.forEach(
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
    
    if (item.images?.length === 0) {
      delete item.images;
    }
    console.log(item);
    responses.push(item); // Add the modified item to the responses array
  });
  return (
  
   
        <DownloadPDF
        randomG={true}
        data={ArrayData}
        set={false}
        bol={false}
        topic={"ff"}
        button={
          <BButton2
            type="button"
            name="Download"
            disabled={false}
          />
        }
        total={ArrayData.length}
        cateId={3}
      />
  
  );
 
};

export default MyComponent;
