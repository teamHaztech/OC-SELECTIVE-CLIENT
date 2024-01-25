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
      "Question": "Roy is a train engineer who is given a pay rise of 15% due to his exceptional performance. He already has a monthly expenditure of $3000. After the increment, if he saves 45% of his salary and uses the rest for his expenditure, by what percentage should his expenditure be less than or equal to his original expenditure for him to be able to save the mentioned percentage?",
      "Options": {
          "a": "5%",
          "b": "10%",
          "c": "15%",
          "d": "20%"
      },
      "Answer": "b",
      "Explanation": "Let's suppose Roy's initial salary was $x. After the 15% increase, it is $x + 0.15*x = 1.15*x. Let's also say that the new expenditure is $y. Because Roy saves 45% of his salary, we can create the following equation: $y = 1.15*x - 0.45*1.15*x. Simplifying it provides $y = 0.575 * x, which means that his new expenditure is 57.5% of his old salary. Given that his original expenditure is $3000, we can set up the equation: $3000/$x = 0.575. Solving for $x gives us $x = $3000 / 0.575 = $5217.39 approximately. The reduced expenditure would be $3000 - $y = $3000 - ($5217.39*0.575) = $0. This means that Roy's expenditure does not need to be less than the original, so the answer is 0% which is not present in options. Checking the actual percentage comparison of new and old expenditure gives us $y/$3000 * 100 = 57.5%/100 * 100%=57.5%. This indicates we need a 42.5% reduction in expenditure, which is closet to option b.",
      "images": [
          "/images/train.jpg"
      ]
  },
  {
      "Question": "In a quaint little park filled with apple trees, Nathan picks 300 apples, putting them in several boxes. Each box can hold 20 apples. He later realized only 85% of his apples were of high-quality and fit for sale. Using the proceeds from selling these apples, he buys books for disadvantaged children. If each book costs $5, and he pays $6 for delivery for every book, when he buys 15% more books than the number of good quality apples he has, how many boxes of apples did he not sell?",
      "Options": {
          "a": "2 boxes",
          "b": "3 boxes",
          "c": "4 boxes",
          "d": "5 boxes"
      },
      "Answer": "a",
      "Explanation": "First, find out the number of high-quality apples. 85% of 300 is 255 apples. Nathan also buys 15% more books than apples, which is 292.5 books. However, since he can't buy half a book, he buys 292 books. For each book, he spends $11 ($5 for the book and $6 for delivery). This means Nathan spends 292 * $11 = $3212. Since each box of apple, containing 20 apples, is sold for 20 * $5 = $100, he sold $3212 / $100 = 32.12 boxes. However, fractional boxes do not exist; hence, he sold 32 boxes. Therefore, the number of boxes he did not sell is 15 (total boxes he had) - 32 = -2. Since the negative number doesn't make sense, it means he had to sell 2 more boxes to cover the cost, indicating option A is correct.",
      "images": [
          "/images/apple.jpg"
      ]
  },
  {
      "Question": "Katty runs a business selling handmade chocolates. If she uses 900 grams of chocolate to make 100 chocolates, how much chocolate will she need to make an order of 650 chocolates, knowing that she always experiences loss in raw materials and only 95% of the initial raw material is converted into the final product?",
      "Options": {
          "a": "5795 grams",
          "b": "6091 grams",
          "c": "5892 grams",
          "d": "5834 grams"
      },
      "Answer": "b",
      "Explanation": "The original chocolate quantity is 950 grams for 100 chocolates in the absence of loss. Hence for 650 chocolates, she would need 950/100*650 = 6175 grams. Considering the loss, she would need 6175/0.95 = 6500 grams approximately, which is closest to option 'b'.",
      "images": [
          "/images/chocolate.jpg"
      ]
  },
  {
      "Question": "Luke, a car salesman, had 500 luxury cars. Unfortunately, 15% of these cars were stolen. From the remaining cars, he was able to sell 60%. With the money, he bought a ship. The ship cost was 120% of the money he got from selling the cars. If the ship cost him $6,000,000, what was the cost of each car?",
      "Options": {
          "a": "$20,000",
          "b": "$22,000",
          "c": "$24,000",
          "d": "$25,000"
      },
      "Answer": "d",
      "Explanation": "Luke had 85% of his cars left, which is 425 cars (500*0.85). He sold 60% of these, which is 255 cars (425*0.60). The money he got was $6,000,000/1.20 = $5,000,000. Therefore, each car's cost is $5,000,000/255 = $19,607.84 approximately, nearest to option 'd'.",
      "images": [
          "/images/car.jpg"
      ]
  },
  {
      "Question": "Henry works in a train manufacturing company. The company manufactures 1000 trains in one month. The company manages to sell 95% of the trains manufactured every month. Each train is sold at a price of $25000. The company decides to invest 90% of their monthly earnings from train sales to buy boxes for packing loaves of bread for a charity. If the cost of one box is $2, how many boxes did they buy?",
      "Options": {
          "a": "1072500 boxes",
          "b": "447500 boxes",
          "c": "11287500 boxes",
          "d": "2257500 boxes"
      },
      "Answer": "a",
      "Explanation": "The company sells 95% of 1000 trains, which equals to 950 trains. The earnings from the sale of these trains is 950 * $25,000 = $23,750,000. The company invests 90% of these earnings in buying boxes, which equals to 0.90 * $23,750,000 = $21,375,000. Since each box costs $2, they bought $21,375,000 / $2 = 10,687,500 boxes, which is option 'a'.",
      "images": [
          "/images/box.jpg"
      ]
  },
  {
      "Question": "John works in a multinational enterprise and earns a salary of $120,000. Considering a yearly inflation rate of 2%, his real income contracts. However, his employer increases his salary by 5% at the end of the year to cover the inflation and provide a real increase in his income. If John wants to buy a car that currently costs $24,000, considering the inflation rate, how much approximately would the car cost him at the end of the year?",
      "Options": {
          "a": "$24,200",
          "b": "$24,450",
          "c": "$24,480",
          "d": "$24,500"
      },
      "Answer": "c",
      "Explanation": "The value of the car will increase by 2% due to inflation. Therefore, the cost of the car at the end of the year would be $24,000 + ($24,000 * 2/100) = $24,480, which is option 'c'.",
      "images": [
          "/images/car.jpg"
      ]
  },
  {
      "Question": "Charlie is a successful entrepreneur who deals in shipping jackets across the globe. He buys jackets at $50, and sells them at 120% of the cost. In a particular sale, he sold 80% of the jackets he had purchased. With the proceeds, he bought chocolates for his team as a token of thanks. Each chocolate bar cost $3. If Charlie bought 320 chocolate bars, how many jackets did he buy initially?",
      "Options": {
          "a": "200 jackets",
          "b": "225 jackets",
          "c": "240 jackets",
          "d": "250 jackets"
      },
      "Answer": "d",
      "Explanation": "Charlie sold his jackets at $50*120/100=$60 per jacket. The revenue from selling 80% of the jackets was then used to buy chocolates, totalling 320 * $3 = $960. Since each jacket was sold for $60, the number of jackets sold is $960 / $60 = 16. If this 16 represents the 80% that was sold, 1% would be 16 / 80 = 0.2 and 100% is 0.2 * 100 = 20. Note: these jacket numbers are in 'tens', so you have to multiply by 10 for actual quantities. Therefore Charlie initially bought 20 * 10 = 200 jackets, which is not included in the options. Returning to the calculations, the 16 jackets (or $960) represent 80%, so actually, all the jackets Charlie had are $960 / 80% = $1200. With each jacket costing $50, he must initially have bought $1200 / $50 = 24 jackets (or 240 since our jacket numbers are in tens), which is option 'c'.",
      "images": [
          "/images/chocolate.jpg"
      ]
  },
  {
      "Question": "Emma is a baker who makes cakes using apples. For each cake, she uses 10 apples. In one batch, she uses 90% of her apples and manages to bake 150 cakes. However, she then receives a last-minute order for 70 more cakes. By what percentage should she increase her apple purchase to meet this new demand?",
      "Options": {
          "a": "46.67%",
          "b": "47%",
          "c": "49.5%",
          "d": "50%"
      },
      "Answer": "a",
      "Explanation": "For 150 cakes, Emma needed 150 * 10 = 1500 apples, which is 90% of her apple purchase. Therefore, her total apple purchase was 1500 / 90 * 100 = 1666.66 approximately. For the additional 70 cakes, she needs 70 * 10 = 700 apples. Therefore, she needs to increase her apple purchase by 700 / 1666.66 * 100 = 42% approximately, which is closest to option 'a'.",
      "images": [
          "/images/apple.jpg"
      ]
  },
  {
      "Question": "Nora is a teacher who wants to buy pens for her students. The pens come in boxes, and each box contains 10 pens. If Nora buys 150 boxes and gives 2 pens to each student, for a total of 85% of her students, she realized she had overbought when her leftover was 20% of her original purchase. How many students does Nora teach?",
      "Options": {
          "a": "630 students",
          "b": "680 students",
          "c": "690 students",
          "d": "700 students"
      },
      "Answer": "b",
      "Explanation": "First, Nora bought 150 boxes, each containing 10 pens, making a total of 150 * 10 = 1500 pens. Her leftover pens were 20% of this number, which is 20/100 * 1500 = 300 pens. This implies the number of pens she gave out is 1500 - 300 = 1200 pens. If each student got 2 pens, then she has 1200 / 2 = 600 students. But note that this 600 represents 85% of her students. To find the total number of students, calculate 600 / 85 * 100 = 705.88 students. We can't have a fraction of a student, so the closest option is 680 students, which is option 'b'.",
      "images": [
          "/images/box.jpg"
      ]
  },
  {
      "Question": "Peter's glass business earns him $100,000 per month. He gives 10% of his income to a charity for orphans. From the remaining income, he spends 30% on raw materials for his glass business and saves the rest. If he uses his savings to buy motorbikes for his employees, each costing $2500, how many motorbikes can he purchase in a year?",
      "Options": {
          "a": "140",
          "b": "150",
          "c": "160",
          "d": "165"
      },
      "Answer": "d",
      "Explanation": "Peter gives 10% to charity, which leaves him with $100,000 * 90/100 = $90,000. He uses 30% of this for his business, leaving him with $90,000 * 70/100 = $63,000. Therefore, his yearly savings are $63,000 * 12 = $756,000. Therefore, he can buy $756,000/$2500 = 302.4 motorbikes, but since he can only buy complete bikes, he buys 302, which is nearest to option 'd'.",
      "images": [
          "/images/glass.jpg"
      ]
  }

];
let ArrayData2: any = [
  {
    id: 1565,
    question:
      "Bobby owns 8 ties, 6 shirts, and 4 pants. How many different combinations of attire can he create?",
    option_1: "120",
    option_2: "192",
    option_3: "160",
    option_4: "144",
    option_5: null,
    option_6: null,
    option_7: null,
    option_8: null,
    correct_option: "B",
    explanation:
      "The total combinations is the product of the number of each type of clothing. Thus, 8 ties, 6 shirts, and 4 pants allows for 8 * 6 * 4 = 192 different combinations. Therefore, Option B is the answer.",
    tst_id: 110,
    marks: null,
    nvq: 0,
    status: 1,
    conversation: "N/A",
    paragraph: "N/A",
    question_image: [
      {
        id: 255,
        image_url: "/images/bobby.jpg",
        q_id: 1565,
      },
    ],
  },
  {
    id: 1567,
    question:
      "What is the total cost for the family trip to the amusement park?",
    option_1: "$75",
    option_2: "$80",
    option_3: "$95",
    option_4: "$105",
    option_5: null,
    option_6: null,
    option_7: null,
    option_8: null,
    correct_option: "D",
    explanation:
      "Cost of tickets = $30 x 2 (for 2 adults, Chris and Alia) + $20 (for child above 8) = $80. Speedy-pass cost for child = $15. Total spent = $80 + $15 = $95. Therefore, the answer is Option D.",
    tst_id: 110,
    marks: null,
    nvq: 0,
    status: 1,
    conversation: null,
    paragraph:
      "Chris plans a family trip to the amusement park. The family consists of Chris, his wife Alia and their 8 year-old son. The tickets for the park costs $30 for an adult and $20 for a child. They also decide to buy the speedy-pass which allows fast access to the rides for their son, which costs an additional $15.",
    question_image: [
      {
        id: 257,
        image_url: "/images/chris.jpg",
        q_id: 1567,
      },
    ],
  },
  {
    id: 1571,
    question:
      "Adam makes 15 chocolate cakes in a day. How much sugar does he use?",
    option_1: "4,300 grams",
    option_2: "4,500 grams",
    option_3: "4,700 grams",
    option_4: "4,900 grams",
    option_5: null,
    option_6: null,
    option_7: null,
    option_8: null,
    correct_option: "B",
    explanation:
      "To make 1 cake, Adam uses 300 grams of sugar. Hence, in order to make 15 cakes, he needs 300 grams x 15 = 4,500 grams of sugar. Therefore, the answer is Option B.",
    tst_id: 110,
    marks: null,
    nvq: 0,
    status: 1,
    conversation: null,
    paragraph:
      "Adam is a baker and his best-selling cake is his chocolate cake. To make 1 cake, he uses 300 grams of sugar, 2 liters of water and 2 liters of chocolate syrup.",
    question_image: [
      {
        id: 260,
        image_url: "/images/adam.png",
        q_id: 1571,
      },
    ],
  },
  {
    id: 1566,
    question: "Which one of the following statements cannot be true?",
    option_1: "Sarah finished first",
    option_2: "Nora finished after Nathan",
    option_3: "Bill finished after Nathan",
    option_4: "Sarah finished ahead of Bill",
    option_5: null,
    option_6: null,
    option_7: null,
    option_8: null,
    correct_option: "C",
    explanation:
      "Nathan finished fourth. Sarah finished before Nora. Bill was not first. Bill finished before Nora. Therefore, the only possible order of finishing is: Sarah, Bill, Nathan, and Nora. Therefore, Bill cannot have finished after Nathan as it contradicts the given statements.",
    tst_id: 110,
    marks: null,
    nvq: 0,
    status: 1,
    conversation:
      "Nathan finished fourth. Sarah finished before Nora. Bill was not first. Bill finished before Nora.",
    paragraph: "In a 500m race with 5 participants:",
    question_image: [
      {
        id: 256,
        image_url: "/images/bill.jpg",
        q_id: 1566,
      },
    ],
  },
  {
    id: 1569,
    question: ".Who is the youngest?",
    option_1: "Frank",
    option_2: "Daisy",
    option_3: "David",
    option_4: "Sally",
    option_5: null,
    option_6: null,
    option_7: null,
    option_8: null,
    correct_option: "C",
    explanation:
      "There are 2 possible options for the ordering (from oldest to youngest): Option 1: Frank, Daisy, Sally, David. Option 2: Frank, Sally, Daisy, David. In both options, David is the youngest. Therefore, the answer is Option C.",
    tst_id: 110,
    marks: null,
    nvq: 0,
    status: 1,
    conversation:
      "Four friends compared their ages. Frank turned out to be the oldest. Daisy was older than David. Sally was not the youngest.",
    paragraph: null,
    question_image: [
      {
        id: 258,
        image_url: "/images/frank.jpg",
        q_id: 1569,
      },
    ],
  },
  {
    id: 1563,
    question:
      "Jenson attended a recent seminar at Global Enterprises, where he learnt that 100 employees are proficient in data analysis. Therefore, he concluded that there must be at least 100 employees in the company who have studied Mathematics.",
    option_1:
      "Assuming that employees who don't have knowledge in data analysis did not study Mathematics",
    option_2:
      "Assuming that only employees with Mathematics background can be proficient in data analysis",
    option_3:
      "Assuming that all employees in the company have attempted to learn data analysis",
    option_4:
      "Assuming that employees who know data analysis cannot know any other subject",
    option_5: null,
    option_6: null,
    option_7: null,
    option_8: null,
    correct_option: "B",
    explanation:
      "The error in reasoning lies in assuming that if someone is proficient in data analysis, they must have studied Mathematics. This ignores other ways people can acquire data analysis proficiency, like through extensive work experience or a different educational background. Therefore, the answer is Option B",
    tst_id: 110,
    marks: null,
    nvq: 0,
    status: 1,
    conversation: null,
    paragraph: null,
    question_image: [],
  },
  {
    id: 1570,
    question:
      "Which of the following, if true, most strengthens the argument that James's responsibilities as a team leader are correctly outlined?",
    option_1:
      "James is the most experienced member of the team and has previously led similar university projects.",
    option_2:
      "James is not responsible for setting milestones and managing resources that is the responsibility of the project supervisor.",
    option_3:
      "James's classmates believe he is not suitable for the role of team leader because he lacks leadership skills.",
    option_4:
      "The university regularly conducts workshops to train students in project management and effective teamwork.",
    option_5: null,
    option_6: null,
    option_7: null,
    option_8: null,
    correct_option: "A",
    explanation:
      "To strengthen the argument, we need a statement that reinforces the idea that it is indeed James's responsibility as team leader to coordinate meetings, manage resources, set milestones, and ensure the project is completed on time. If it is true that James is the most experienced member of the team and has previously led similar university projects, then this most strengthens the argument as it highlights his suitability and capability in fulfilling these responsibilities.",
    tst_id: 110,
    marks: null,
    nvq: 0,
    status: 1,
    conversation:
      "During a university project, James is designated as the team leader. His responsibilities include coordinating meetings, managing resources, setting milestones, and ensuring the project is completed on time.",
    paragraph: null,
    question_image: [
      {
        id: 259,
        image_url: "/images/james.png",
        q_id: 1570,
      },
    ],
  },
  {
    id: 1562,
    question:
      "The instructions on a bag of cat treats specify that the recommended ratio of a cat's weight to the number of treats it should receive daily is 8:4. If Bill's cat weighs 24 kilograms, how many treats should he give to his cat each day?",
    option_1: "10 Kg",
    option_2: "11 Kg",
    option_3: "12 Kg",
    option_4: "13 Kg",
    option_5: null,
    option_6: null,
    option_7: null,
    option_8: null,
    correct_option: "C",
    explanation:
      "Bill’s cat weighs 24 kg. Therefore, 8 parts equals 24 kg. Hence, 1 part equals 3 kg. Therefore, Bill’s cat should receive 3 kg X 4 parts equals 12 kg of treats every day. Therefore, the answer is Option C.",
    tst_id: 110,
    marks: null,
    nvq: 0,
    status: 1,
    conversation: null,
    paragraph: null,
    question_image: [],
  },
  {
    id: 1564,
    question:
      "If the quoted passage is true, which of the following shows the mistake David has made?",
    option_1:
      "Some students may have solved multiple problems and received one award.",
    option_2:
      "Some students may have received medals instead of awards for solving the problems.",
    option_3:
      "Some students may not have received an award even though they solved a problem.",
    option_4:
      "Some students may have received an award for participating in activities other than solving problems.",
    option_5: null,
    option_6: null,
    option_7: null,
    option_8: null,
    correct_option: "D",
    explanation:
      "While it's true that every student who solved a problem received an award, the passage does not rule out the possibility that students could have received awards for other reasons, not necessarily tied to solving problems. Therefore, the answer is Option D.",
    tst_id: 110,
    marks: null,
    nvq: 0,
    status: 1,
    conversation:
      "David: At the math competition awards ceremony, sixteen students received awards, so at least sixteen problems were solved.",
    paragraph:
      "In a mathematics competition, every student who solved a problem received an award for their participation.",
    question_image: [
      {
        id: 254,
        image_url: "/images/david.png",
        q_id: 1564,
      },
    ],
  },
  {
    id: 1568,
    question:
      "A college tour group of 5 (2 professors and 3 grad students) vacation together and choose a group package for $150. Had they purchased individual tickets at $40 for professors and $30 for grad students, how much would they have saved?",
    option_1: "$20",
    option_2: "$25",
    option_3: "$30",
    option_4: "$35",
    option_5: null,
    option_6: null,
    option_7: null,
    option_8: null,
    correct_option: "C",
    explanation:
      "The cost of individual tickets comes to: $40 x 2 (professors) + $30 x 3 (grad students) = $180. The group package costs $150. Therefore, the savings are $180 - $150 = $30. Hence, the answer is Option C.",
    tst_id: 110,
    marks: null,
    nvq: 0,
    status: 1,
    conversation: null,
    paragraph: null,
    question_image: [],
  },
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
const aa = [
  {
      "Question": "In a recent study at XYZ College, it was found that 75% of students who participated in a mindfulness workshop reported reduced stress levels. Therefore, participating in the workshop will guarantee a reduction in stress for all college students.",
      "Options": {
          "a": "Assuming that all college students are equally susceptible to stress",
          "b": "Assuming that the mindfulness workshop is the only factor that can reduce stress",
          "c": "Assuming that the 75% of students who reported reduced stress represent the entire student population",
          "d": "Assuming that stress levels can only be reduced through workshops and not through individual efforts"
      },
      "Answer": "c",
      "Explanation": "The mistake in the reasoning is assuming that the 75% of students who reported reduced stress represent the entire student population. There may be other factors that contributed to their stress reduction, and the impact of the workshop may vary for different individuals.",
      "images": []
  },
  {
      "Question": "Stella and Myra are discussing different thinking styles for problem-solving. Stella believes that logical thinking is the best approach, while Myra argues that intuitive thinking is more effective. Which of the following, if true, weakens Myra's argument?",
      "Options": {
          "a": "Several studies have shown that logical thinking leads to more accurate problem-solving outcomes.",
          "b": "Intuitive thinking relies heavily on gut feelings and personal biases, which can hinder objective decision-making.",
          "c": "Stella has successfully used intuitive thinking in the past to solve complex problems.",
          "d": "Myra has never personally experienced the benefits of logical thinking in problem-solving situations."
      },
      "Answer": "a",
      "Explanation": "To weaken Myra's argument that intuitive thinking is more effective for problem-solving, we need a statement that contradicts or provides evidence against the effectiveness of intuitive thinking. If it is true that several studies have shown that logical thinking leads to more accurate problem-solving outcomes, then this weakens the argument for intuitive thinking as the preferred approach.",
      "images": [
          "/images/stella.jpg",
          "/images/myra.jpg"
      ]
  },
  {
      "Question": "During a college workshop on critical thinking, the facilitator described the steps for problem-solving as follows: identifying the problem, generating potential solutions, evaluating the options, making a decision, and implementing the chosen solution. Which of the following shows the correct order of these steps?",
      "Options": {
          "a": "Identifying the problem, generating potential solutions, evaluating the options, making a decision, implementing the chosen solution",
          "b": "Implementing the chosen solution, making a decision, generating potential solutions, evaluating the options, identifying the problem",
          "c": "Generating potential solutions, evaluating the options, identifying the problem, making a decision, implementing the chosen solution",
          "d": "Evaluating the options, generating potential solutions, implementing the chosen solution, making a decision, identifying the problem"
      },
      "Answer": "a",
      "Explanation": "The correct order of the problem-solving steps is: identifying the problem, generating potential solutions, evaluating the options, making a decision, and implementing the chosen solution. Option A is the only one that follows this order.",
      "images": []
  },
  {
      "Question": "Amelia can solve a math problem in 5 minutes. If she solved the problem 4 times, how long did it take her in total?",
      "Options": {
          "a": "10 minutes",
          "b": "15 minutes",
          "c": "20 minutes",
          "d": "25 minutes"
      },
      "Answer": "c",
      "Explanation": "Since Amelia can solve the problem in 5 minutes, solving it 4 times would take 5 minutes x 4 = 20 minutes. Therefore, the answer is Option C.",
      "images": [
          "/images/amelia.jpg"
      ]
  },
  {
      "Question": "In a debate competition with 6 participants, Bobby finished second. Natasha finished before Daisy. Bobby finished before Daisy. Natasha was not first. Which one of the following statements cannot be true?",
      "Options": {
          "a": "Daisy finished first",
          "b": "Natasha finished after Bobby",
          "c": "Bobby finished after Natasha",
          "d": "Daisy finished ahead of Bobby"
      },
      "Answer": "B",
      "Explanation": "Natasha finished before Daisy. Bobby finished before Daisy. Therefore, the only possible order of finishing is: Daisy, Bobby, Natasha. Thus, Natasha cannot finish after Bobby.",
      "images": [
          "/images/bobby.jpg",
          "/images/natasha.jpg"
      ]
  },
  {
      "Question": "Sarah and Zoya are participating in a thinking competition. In the first round, each of them is given a set of numbers and they have to arrange them in a pattern. Sarah arranges the numbers in ascending order, starting from the smallest number, while Zoya arranges them in descending order, starting from the largest number. If Sarah's pattern starts with the number 3 and Zoya's pattern starts with the number 20, what is the largest number in Zoya's pattern?",
      "Options": {
          "a": "17",
          "b": "18",
          "c": "19",
          "d": "21"
      },
      "Answer": "c",
      "Explanation": "Sarah's pattern starts with the number 3, therefore Zoya's pattern starts with the largest number, which is 20. Since Zoya arranges the numbers in descending order, the next number in her pattern will be 19. Hence, the largest number in Zoya's pattern is 19.",
      "images": [
          "/images/zoya.jpg",
          "/images/sarah.jpg"
      ]
  },
  {
      "Question": "Adam and Bill are discussing the impact of critical thinking in decision-making. Adam believes that critical thinking helps individuals make better informed and rational choices, while Bill argues that intuition is more effective for quick decision-making. Which of the following, if true, weakens Bill's argument?",
      "Options": {
          "a": "Critical thinking involves evaluating evidence, considering multiple perspectives, and reducing biases.",
          "b": "Intuition is often based on personal biases, emotions, or limited information, leading to biased decisions.",
          "c": "Adam has successfully utilized critical thinking in various decision-making scenarios.",
          "d": "Bill has relied solely on intuition in his decision-making process and achieved favorable outcomes."
      },
      "Answer": "a",
      "Explanation": "To weaken Bill's argument that intuition is more effective for quick decision-making, we need a statement that contradicts or provides evidence against the effectiveness of intuition. If it is true that critical thinking involves evaluating evidence, considering multiple perspectives, and reducing biases, then this weakens the argument for intuition as the preferred approach for quick decision-making.",
      "images": [
          "/images/bill.jpg",
          "/images/adam.png"
      ]
  },
  {
      "Question": "Annie and Natasha both have to solve a puzzle. Annie can solve the puzzle in 4 hours, while Natasha can solve it in 6 hours. How long will it take for Annie and Natasha to solve the puzzle together?",
      "Options": {
          "a": "1.5 hours",
          "b": "2 hours",
          "c": "2.5 hours",
          "d": "3 hours"
      },
      "Answer": "c",
      "Explanation": "Annie's rate of solving the puzzle is 1/4 per hour, while Natasha's rate is 1/6 per hour. When they work together, their combined rate is (1/4) + (1/6) = 5/12 per hour. The time it will take to solve the puzzle together is the reciprocal of their combined rate, which is 12/5 hours or 2.4 hours. Rounded to the nearest half hour, the answer is 2.5 hours.",
      "images": [
          "/images/natasha.jpg"
      ]
  },
  {
      "Question": "Oliver is working on a math problem. If he solved the problem correctly, it would take him 2 hours. However, Oliver made a mistake and it actually took him 3 hours. If Oliver's actual answer was 36, what would his answer have been if he solved the problem correctly?",
      "Options": {
          "a": "24",
          "b": "28",
          "c": "32",
          "d": "40"
      },
      "Answer": "a",
      "Explanation": "If Oliver solved the problem correctly in 2 hours, his work speed would be 36 / 2 = 18 units per hour. Since it actually took him 3 hours, his actual work speed is 36 / 3 = 12 units per hour. Therefore, if he solved the problem correctly, his answer would have been 18 units per hour x 2 hours = 36.",
      "images": [
          "/images/oliver.png"
      ]
  },
  {
      "Question": "Stella is trying to decide which college major to choose. She is torn between studying psychology and computer science. Which of the following, if true, would strengthen the argument for Stella to choose computer science?",
      "Options": {
          "a": "There is a high demand for computer science professionals, and job prospects are favorable.",
          "b": "Psychology offers a wider range of career opportunities compared to computer science.",
          "c": "Stella's close friend, who is currently studying computer science, highly recommends the program.",
          "d": "Stella performed exceptionally well in her high school psychology class."
      },
      "Answer": "a",
      "Explanation": "To strengthen the argument for Stella to choose computer science, we need a statement that provides a favorable outlook for the field. If it is true that there is a high demand for computer science professionals and job prospects are favorable, then this strengthens the argument as it highlights the potential career opportunities in the field.",
      "images": [
          "/images/stella.jpg"
      ]
  },
  {
      "Question": "Adam is organizing a group project for his college class. He assigns the tasks to his team members based on their individual strengths and skills. Which of the following, if true, strengthens the argument that Adam's approach to task assignment is effective?",
      "Options": {
          "a": "Bill, who has excellent research skills, is assigned to gather information for the project.",
          "b": "Stella, who is good at problem-solving, is given the task of analyzing the data collected.",
          "c": "Myra, who has poor communication skills, is given the responsibility of presenting the findings to the class.",
          "d": "Adam chooses the tasks randomly without considering the strengths and skills of his team members."
      },
      "Answer": "a",
      "Explanation": "To strengthen the argument that Adam's approach to task assignment is effective, we need a statement that reinforces the idea that tasks are assigned based on individual strengths and skills. If it is true that Bill, who has excellent research skills, is assigned to gather information for the project, then this most strengthens the argument as it demonstrates Adam's consideration of his team members' abilities.",
      "images": [
          "/images/adam.png"
      ]
  },
  {
      "Question": "Austin is studying for a history test. He estimates that he can memorize 10 key dates in 30 minutes. If Austin has 1.5 hours to study, how many key dates can he memorize?",
      "Options": {
          "a": "20",
          "b": "25",
          "c": "30",
          "d": "35"
      },
      "Answer": "c",
      "Explanation": "Austin can memorize 10 key dates in 30 minutes, which means he can memorize 10 / 30 = 1/3 key dates per minute. In 1.5 hours, there are 1.5 x 60 = 90 minutes. Therefore, Austin can memorize 1/3 x 90 = 30 key dates.",
      "images": [
          "/images/austin.jpg"
      ]
  },
  {
      "Question": "Nathan rolled a fair six-sided die twice. What is the probability that the sum of the two numbers rolled is greater than 9?",
      "Options": {
          "a": "1/12",
          "b": "1/9",
          "c": "1/6",
          "d": "1/3"
      },
      "Answer": "c",
      "Explanation": "To find the probability, we need to calculate the number of favorable outcomes and divide it by the total number of possible outcomes. The favorable outcomes are (4,6), (5,5), (5,6), and (6,4), for a total of 4. The total number of possible outcomes is 6 x 6 = 36. Therefore, the probability is 4/36 = 1/6.",
      "images": []
  },
  {
      "Question": "A group of friends compared their ages. Jenson is older than Sally. Georgia is older than Jenson. Who is the youngest in the group?",
      "Options": {
          "a": "Jenson",
          "b": "Sally",
          "c": "Georgia",
          "d": "Cannot be determined"
      },
      "Answer": "d",
      "Explanation": "The given information is not sufficient to determine who is the youngest in the group, as the relationship between Georgia and Sally is not specified.",
      "images": [
          "/images/jenson.jpg"
      ]
  },
  {
      "Question": "Bill and Adam are discussing the concept of lateral thinking. Bill argues that lateral thinking is more focused on generating creative ideas, while Adam believes it is primarily about finding unconventional solutions to problems. Which of the following, if true, supports Adam's viewpoint?",
      "Options": {
          "a": "Lateral thinking involves breaking traditional thought patterns and considering multiple perspectives.",
          "b": "Bill is known for his artistic skills and often comes up with imaginative ideas through lateral thinking.",
          "c": "Adam has successfully used lateral thinking to find unique solutions to complex business challenges.",
          "d": "Lateral thinking is a systematic approach that follows predefined steps to generate innovative ideas."
      },
      "Answer": "a",
      "Explanation": "To support Adam's viewpoint that lateral thinking is primarily about finding unconventional solutions to problems, we need a statement that aligns with his description of lateral thinking. If it is true that lateral thinking involves breaking traditional thought patterns and considering multiple perspectives, then this supports the idea that lateral thinking is focused on finding unconventional solutions rather than solely generating creative ideas.",
      "images": [
          "/images/bill.jpg",
          "/images/adam.png"
      ]
  },
  {
      "Question": "Alia and Marry are collaborating on a project. Alia can complete the project in 8 days working alone, while Marry can complete it in 12 days working alone. If they work together on the project, how many days will it take them to complete it?",
      "Options": {
          "a": "4",
          "b": "5",
          "c": "6",
          "d": "7"
      },
      "Answer": "b",
      "Explanation": "Alia can complete the project in 8 days, which means her work rate is 1/8 of the project per day. Marry can complete the project in 12 days, which means her work rate is 1/12 of the project per day. When they work together, their combined work rate is 1/8 + 1/12 = 5/24 of the project per day. Therefore, it will take them 24/5 = 4.8 days to complete the project, which rounds up to 5 days.",
      "images": [
          "/images/alia.jpg",
          "/images/marry.jpg"
      ]
  },
  {
      "Question": "A study found that students who study for 8 hours a day tend to get higher grades than those who study for only 2 hours a day. Bobby: I studied for 3 hours today, so I am guaranteed to get good grades tomorrow. Which of the following shows the mistake in Bobby's reasoning?",
      "Options": {
          "a": "Bobby may not have studied enough to get good grades tomorrow.",
          "b": "Bobby does not know the grades of other students in his class.",
          "c": "Bobby is smarter than the rest of the students in his class.",
          "d": "Bobby may not be able to get good grades despite studying for 3 hours."
      },
      "Answer": "D",
      "Explanation": "Bobby: I studied for 3 hours today, so I am guaranteed to get good grades tomorrow.\nThe study only indicates that students who study for 8 hours a day tend to get higher grades. It does not guarantee that those who study for less time will not get good grades. Therefore, the answer is Option D.",
      "images": []
  },
  {
      "Question": "In order to qualify for a scholarship, a student needs to have a GPA of 3.5 or higher and score above 1500 in the SAT. Chris has a GPA of 3.8 but scored 1450 in the SAT. Does Chris qualify for the scholarship?",
      "Options": {
          "a": "Yes",
          "b": "No"
      },
      "Answer": "b",
      "Explanation": "No, Chris does not qualify for the scholarship because even though he has a GPA of 3.8 which is above the requirement, his SAT score is below the required minimum of 1500.",
      "images": [
          "/images/chris.jpg"
      ]
  },
  {
      "Question": "Louis is taller than John, but not as tall as Jessie. Zoya is taller than John but not as tall as Louis. Who is the tallest among them?",
      "Options": {
          "a": "Louis",
          "b": "John",
          "c": "Jessie",
          "d": "Zoya"
      },
      "Answer": "c",
      "Explanation": "Since Louis is taller than John and Jessie is taller than Louis, it can be concluded that Jessie is the tallest.",
      "images": [
          "/images/john.jpg"
      ]
  },
  {
      "Question": "Bobby, Lloyd, Myra, and Amelia are all competing in a chess tournament. Whoever wins the most games wins the tournament. Bobby wins more games than Myra but fewer games than Amelia. Lloyd wins fewer games than Bobby. Who wins the tournament?",
      "Options": {
          "a": "Amelia",
          "b": "Bobby",
          "c": "Myra",
          "d": "Lloyd"
      },
      "Answer": "a",
      "Explanation": "Bobby wins more games than Myra but fewer games than Amelia. Lloyd wins fewer games than Bobby. Therefore, the order is Amelia, Bobby, Lloyd, Myra. Therefore, the answer is Option A.",
      "images": [
          "/images/lloyd.png",
          "/images/bobby.jpg"
      ]
  },
  {
      "Question": "Sally, Lloyd, and Zoya are all studying different subjects: Math, English, and Science. Sally studies Math and English, while Lloyd studies English and Science. What subject does Zoya study that neither Sally nor Lloyd study?",
      "Options": {
          "a": "Math",
          "b": "English",
          "c": "Science",
          "d": "None of the above"
      },
      "Answer": "c",
      "Explanation": "Sally studies Math and English. Lloyd studies English and Science. Therefore, Zoya must study the subject that is left, which is Science. Therefore, the answer is Option C.",
      "images": [
          "/images/lloyd.png"
      ]
  }
];
import DownloadPDF from "./Pages/Admin/TestSeries/Components/PDF/DownloadPDF";
import adminTokenAxios from "./Hooks/AdminTokenAxios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Stack } from "@mui/system";
import QuestionCard from "./Pages/Admin/TestSeries/Components/QuestionCard";
// import potrace from "potrace-js";
const MyComponent = () => {
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
  const { data } = useQuery({
    queryKey: ["images"],
    queryFn: async () => {
      return await adminTokenAxios.get(`/admin/get-image/3`);
    },
  });
  // console.log(data);
  let image_data = data?.data.images;

  const image_keyword = image_data?.map((item: any) => {
    return item.image_name.toLowerCase();
  });
  // console.log(image_keyword);
  const addTestCTMu = useMutation({
    mutationFn: async (data: object[]) => {
      // console.log(data);
      console.log("len "+data.length);
      return await adminTokenAxios.post(`/admin/add-test-series-topics`, {
        tsc_id: 1,
        t_name: "age test",
        question: data,
        topic: "aage",
        ts_id: "1",
      });
    },
    onError: (error: any) => {
      console.error("Error creating user:", error.response?.data);
    },
    onSuccess: (res: any) => {
      if (res.status == 200) {
        console.log(res.data);
      }
    },
  });
  const responses: any[] = [];

  const [resData, setResData] = useState<any>([]);
 
  
  const set = () => {
    const newArray = aa?.map((item: any, index: any) => {
      // if (category == 3) {

      if (
        !item.Paragraph ||
        item.Paragraph == "undefined" ||
        item.Paragraph == "N/A"
      ) {
        // console.log(!item.Paragraph);
        delete item.Paragraph;
      }

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
      console.log(data);
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
            console.log(match);
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
          console.log("1` "+femaleNames,image_keyword,g_image_urls);
          
        for (const search of g_image_urls) {
          // [...g_image_urls].forEach((search: string) => {
          const caps = search.toLowerCase();
          const match = data.find(
            (word: string) => word.toLowerCase() === caps
          );

          if (match) {
            console.log(match);
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
            console.log(match);
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
          console.log("2 "+femaleNames,image_keyword);
        for (const search of g_image_urls) {
          const caps = search.toLowerCase();
          const match = data.find(
            (word: string) => word.toLowerCase() === caps
          );
    
          if (match) {
            console.log(match);
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
      console.log(count);
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
      console.log(item);
      return item;
      responses.push(item);
    });
    // c
    setResData(newArray);
  };
  const updateTestCTMu = useMutation({
    mutationFn: async (data: object[]) => {
      return await adminTokenAxios.put(`/admin/update-test-series-topics/103`, {
        question: data,
      });
    },
    onError: (error: any) => {
      console.error("Error creating user:", error.response?.data);
    },
    onSuccess: (res: any) => {
      if (res.status == 200) {
        // navigate(`/admin/test-series/view-test-series-topics`);
        // reset({
        //   tsc_id: "",
        //   topic: "",
        // });
      }
    },
  });
  console.log(resData);
  const [imageExists, setImageExists] = useState(true);

  const handleImageError = () => {
    setImageExists(false);
  };
  return (
    <Stack spacing={2}>
      {/* {ArrayData.length != 0 && (
        <DownloadPDF
          randomG={false}
          data={ArrayData}
          set={false}
          bol={false}
          topic={"iii"}
          button={
            <BButton2
              type="button"
              name="Download"
              disabled={!ArrayData.length}
            />
          }
          total={ArrayData.length}
          cateId={1}
        />
      )}
      {ArrayData2.length != 0 && (
        <DownloadPDF
          randomG={false}
          data={ArrayData2}
          set={false}
          bol={false}
          topic={"iii"}
          button={
            <BButton2
              type="button"
              name="Download2"
              disabled={!ArrayData2.length}
            />
          }
          total={ArrayData2.length}
          cateId={3}
        />
      )}
      <BButton2
        type="button"
        func={() => updateTestCTMu.mutate(resData)}
        name={updateTestCTMu.isLoading ? "UUploading..." : "UUpload"}
      />
      <BButton2
        type="button"
        func={() => addTestCTMu.mutate(resData)}
        name={addTestCTMu.isLoading ? "Uploading..." : "Upload"}
      />
      <button onClick={set}>Click</button>
      {resData?.map((questionData: any, index: any) => (
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
      ))} */}
      {imageExists && <img src="" alt="" />}
    </Stack>
  );
};

export default MyComponent;
