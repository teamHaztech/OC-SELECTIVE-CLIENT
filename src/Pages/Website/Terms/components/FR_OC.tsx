import { Typography, Container, Stack, Link, Box } from "@mui/material";
// import { Typography, Paper, makeStyles } from '@material-ui/core';
import React from "react";
import DoneIcon from "@mui/icons-material/Done";
const useStyles: any = {
  heading: {
    fontWeight: "bold",
    fontSize: "24px",
    marginBottom: 1,
    color: "green",
  },
  paragraph: {
    fontSize: "16px",
    marginBottom: 2,
    textAlign:"left"
  },
};
const FR_OC = () => {
  const q_data = [
    {
      q: "Enriched Learning Environment:",
      ans: `OC classes provide a more challenging and intellectually stimulating
        environment compared to regular primary school classes. Students
        engage in advanced coursework and activities tailored to their
        academic abilities.`,
    },
    {
      q: "Advanced Curriculum:",
      ans: `The curriculum in OC classes is designed to be more advanced and accelerated,
      allowing students to delve deeper into subjects and explore more complex
      concepts. This helps in fostering a love for learning and intellectual growth.`,
    },
    {
      q: "Opportunities for Academic Excellence:",
      ans: `Students in OC classes often have access to a range of educational opportunities,
        including participation in academic competitions, enrichment programs, and
        extracurricular activities that cater to their abilities and interests.ectual growth.`,
    },
    {
      q: "Peer Interaction with Like-Minded Students:",
      ans: `Being surrounded by peers with similar academic abilities creates a supportive
        learning environment. Students can collaborate, share ideas, and challenge each
        other, fostering a positive peer culture that encourages academic excellence.`,
    },
    {
      q: "Enhanced Critical Thinking and Problem-Solving Skills:",
      ans: `Being surrounded by peers with similar academic abilities creates a supportive
          learningThe advanced coursework and challenging activities in OC classes are designed to
          enhance students' critical thinking, analytical reasoning, and problem-solving
          skills. These skills are valuable not only academically but also in various aspects of
          life.`,
    },
    {
      q: "Support for Individual Learning Styles:",
      ans: `OC teachers are often trained to recognize and cater to different learning styles.
        This personalized approach helps students maximize their learning potential and
        ensures that their unique needs are addressed.`,
    },
    {
      q: "Development of a Growth Mindset:",
      ans: `Engaging in challenging academic work in OC classes encourages students to
        adopt a growth mindset, where they view challenges as opportunities to learn
        and improve. This mindset can contribute to long-term success in academics and
        beyond.`,
    },
    {
      q: "Preparation for Future Academic and Career Challenges:",
      ans: `The rigorous academic environment in OC classes helps students develop strong
        study habits, time management skills, and a solid foundation of knowledge. These
        skills prepare them for future academic challenges and contribute to their success
        in higher education and career pursuits.
        It's important to note that while OC classes offer numerous benefits, they may
        not be suitable for every student. Parents and educators should consider the individual needs and preferences of each student when deciding whether an
        Opportunity Class is the right fit.Engaging in challenging academic work in OC classes encourages students to
        adopt a growth mindset, where they view challenges as opportunities to learn
        and improve. This mindset can contribute to long-term success in academics and
        beyond.`,
    },
  ];

  return (
    <Container>
      <Typography sx={useStyles.heading}>
        What is an OC Placement Test in NSW?
      </Typography>
      <Typography sx={useStyles.paragraph}>
        An OC (Opportunity Class) Placement Test is a form of examination used
        in New South Wales (NSW), Australia, to select students for placement in
        Opportunity Classes. Opportunity classrooms are specialised classrooms
        in some primary schools for academically exceptional and talented
        students. These classes offer a more difficult and enriching educational
        environment for kids with exceptional intellectual potential.
      </Typography>
      <Typography sx={useStyles.paragraph}>
        Students often take the OC Placement Test in Year 4, which tests their
        skills in:
      </Typography>
      <ul style={{ marginBottom: 4 }}>
        <li>
          <span style={{ fontWeight: "bold" }}>Reading:</span> is the capacity
          to comprehend and interpret written material.
        </li>
        <li>
          <span style={{ fontWeight: "bold" }}>Mathematics:</span>{" "}
          Problem-solving ability and mathematical thinking.
        </li>
        <li>
          <span style={{ fontWeight: "bold" }}>Thinking Skills:</span> refers to
          cognitive abilities such as the ability to reason and think logically.
        </li>
      </ul>
      <Typography sx={useStyles.paragraph}>
        The test is designed to identify students who would benefit from the
        advanced and accelerated curriculum available in Opportunity Classes.
      </Typography>
      <Typography sx={useStyles.paragraph}>
        It's important for parents and students to be aware of the specific
        details, dates, and requirements related to the OC Placement Test in
        NSW. The NSW Department of Education or the relevant educational
        authorities typically provide information on the test, including sample
        questions and guidelines for preparation. Parents can obtain information
        about the test from their child's school or through official channels to
        ensure they are well-prepared for the testing process.
      </Typography>

      <Typography sx={useStyles.heading}>
        What are the benefits of OC classes?
      </Typography>
      <Typography sx={useStyles.paragraph}>
        Opportunity Classes (OC) in New South Wales, Australia, offer several
        benefits for academically gifted and talented students. Some of the key
        advantages of OC classes include:
      </Typography>
      {q_data.map((item) => (
        <>
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            columnGap={2}
            marginBottom={1}
          >
            <DoneIcon />
            <Typography style={{ fontSize: "18px", fontWeight: "bold" }}>
              {item.q}
            </Typography>
          </Stack>

          <Typography marginBottom={2}>{item.ans}</Typography>
        </>
      ))}
      <Typography sx={useStyles.heading}>Where are they located?</Typography>
      <Typography sx={useStyles.paragraph}>
        There are 76 elementary schools in New South Wales offering opportunity
        courses.
      </Typography>
      <Typography sx={useStyles.paragraph}>
        There are 45 schools in metropolitan Sydney.
      </Typography>
      <Typography sx={useStyles.paragraph}>
        Thirty schools are situated in rural or regional centers.
      </Typography>
      <Typography sx={useStyles.paragraph}>
        Aurora College, a virtual class, is available to rural and distant
        students at 618 authorized host schools.
      </Typography>
      <Typography sx={useStyles.paragraph}>
        See a list of NSW primary schools that offer opportunity classes.
      </Typography>
      <Typography sx={useStyles.paragraph}>
        To identify a nearby school, visit the{" "}
        <Link href="#" sx={useStyles.link}>
          map of opportunity classes
        </Link>
        .
      </Typography>
      <Typography sx={useStyles.paragraph}>
        Opportunity classes are not zoned, so you can apply regardless of where
        you live in NSW.
      </Typography>
      <Typography sx={useStyles.paragraph}>
        Students who are successfully placed will attend the opportunity class
        full-time in Years 5 and 6 at the corresponding public school.
      </Typography>
      <Typography sx={useStyles.paragraph}>
        In most circumstances, students who accept a position in an opportunity
        class will leave their present school.
      </Typography>

      <Typography sx={useStyles.heading}>How do I apply?</Typography>
      <Typography sx={useStyles.paragraph}>
        Applications for entry into Year 5 opportunity classes in 2024 open on
        Thursday 30 March and close Monday 15 May, 2023. Apply online during
        this time.
      </Typography>
      <Typography sx={useStyles.paragraph}>
        <b>Key dates for Year 5 entry in 2024:</b>
      </Typography>
      <Box width={"70%"} >
        <Stack flexDirection={"row"} justifyContent={"space-between"} marginBottom={2}>
          <Typography sx={useStyles.header}>
            <b>Date</b>
          </Typography>
          <Typography sx={useStyles.header} >
            <b>Activity</b>
          </Typography>
        </Stack>
        <Stack flexDirection={"row"} justifyContent={"space-between"}>
          <Typography sx={useStyles.paragraph}>
            30 March 2023:
          </Typography>
          <Typography sx={useStyles.header}>Applications open</Typography>
        </Stack>
        <Stack flexDirection={"row"} justifyContent={"space-between"}>
          <Typography sx={useStyles.paragraph}>
            15 May 2023:
          </Typography>
          <Typography sx={useStyles.header}>Applications close</Typography>
        </Stack>
        <Stack flexDirection={"row"} justifyContent={"space-between"}>
          <Typography sx={useStyles.paragraph}>
            27 July 2023:
          </Typography>
          <Typography sx={useStyles.header}>
            Opportunity Class Placement Test
          </Typography>
        </Stack>
        <Stack flexDirection={"row"} justifyContent={"space-between"}>
          <Typography sx={useStyles.paragraph}>
            20 October 2023:
          </Typography>
          <Typography sx={useStyles.header}>
          Placement outcome released (expected)
          </Typography>
        </Stack>
      </Box>

     
      <Typography sx={useStyles.paragraph}>
        Discover more about the application procedure by visiting{" "}
        <Link href="#" sx={useStyles.link}>
          NSW Department of Education
        </Link>
        .
      </Typography>
    </Container>
  );
};

export default FR_OC;
