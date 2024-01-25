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
  },
};
const FR_Selective = () => {
  const q_data = [
    {
      q: "Intellectual Stimulation:",
      ans: `Selective High Schools provide an environment where academically
      gifted students can interact with like-minded peers. This can lead to
      intellectual stimulation, peer collaboration, and a supportive academic
      community.`,
    },
    {
      q: "Specialized Programs and Resources:",
      ans: `Selective High Schools often offer specialized programs, resources, and
      extracurricular activities to cater to the unique needs and interests of
      academically advanced students.`,
    },
    {
      q: "Exposure to a Diverse Range of Subjects:",
      ans: `Students in Selective High Schools may have the opportunity to explore
      a diverse range of subjects, including advanced courses in mathematics,
      sciences, languages, and the humanities.`,
    },
    {
      q: "Preparation for Future Academic Challenges:",
      ans: `The advanced education provided in Selective High Schools can better
      prepare students for future academic challenges, including tertiary
      education and careers that require a strong academic foundation.`,
    },
    {
      q: "Enhanced Critical Thinking and Problem-Solving Skills:",
      ans: `The curriculum and learning activities in Selective High Schools are
      designed to enhance students&#39; critical thinking, analytical reasoning,
      and problem-solving skills, providing a strong foundation for lifelong
      learning.`,
    },
    {
      q: "Potential for Future Opportunities:",
      ans: `Graduates from Selective High Schools may have increased access to
      scholarships, academic competitions, and other opportunities that can
      contribute to their personal and academic development.`,
    },
    {
      q: "Network and Community Building:",
      ans: `Selective High Schools provide students with the opportunity to build a
      network of peers who share similar academic interests. This network
      can be valuable for future collaborations and professional connections.
      It's important to note that while there are potential benefits, the
      decision to participate in selective tests and attend a Selective High
      School should align with the individual needs, goals, and preferences of
      the student. Parents and students should carefully consider these
      factors and seek information from relevant educational authorities to
      make informed decisions.`,
    },
  ];

  return (
    <Container>
      <Typography sx={useStyles.heading}>
        What are Selective Tests in NSW?
      </Typography>
      <Typography sx={useStyles.paragraph}>
        Selective tests in New South Wales (NSW), Australia, refer to a series
        of assessments conducted to determine the eligibility of students for
        placement in Selective High Schools. Selective High Schools are
        government high schools that cater to academically gifted and talented
        students. These schools provide a challenging and enriched educational
        environment to meet the unique needs of students who demonstrate high
        academic potential.
      </Typography>
      <Typography sx={useStyles.paragraph}>
        The Selective High School Placement Test (HSPT) is the key component of
        the selective tests. This test is designed to assess students in the
        areas of:
      </Typography>
      <ul style={{ marginBottom: 4 }}>
        <li>
          <span style={{ fontWeight: "bold" }}>Reading:</span>Comprehension and
          interpretation of written information.
        </li>
        <li>
          <span style={{ fontWeight: "bold" }}>Mathematics:</span>{" "}
          Problem-solving ability and mathematical thinking.
        </li>
        <li>
          <span style={{ fontWeight: "bold" }}>Thinking Skills:</span>Cognitive
          abilities, including logical reasoning, abstract thinking, and spatial
          reasoning.
        </li>
      </ul>
      <Typography sx={useStyles.paragraph}>
        It's important for students and their parents to be aware of the
        specific requirements and details of the selective test process, as it
        may vary from year to year. The NSW Department of Education provides
        information and updates about the selective high school placement
        process, including key dates and test details. Interested individuals
        should check the official website of the NSW Department of Education or
        <a href="">Click Here.</a>
      </Typography>

      <Typography sx={useStyles.heading}>
        What are benefits of Selective tests/exam?
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
      <Typography sx={useStyles.heading}>
        Where are Selective Schools located in NSW?
      </Typography>
      <Typography sx={useStyles.paragraph}>
        Altogether there are 47 selected high schools accept Year 7 pupils,
        including Aurora College, an online program for rural and distant
        students.
      </Typography>
      <Typography sx={useStyles.paragraph}>
        17 selective high schools
      </Typography>
      <Typography sx={useStyles.paragraph}>
        There are 25 somewhat selective high schools.
      </Typography>
      <Typography sx={useStyles.paragraph}>
        4 agricultural selective high schools (some with boarding)
      </Typography>
      <Typography sx={useStyles.paragraph}>
        Aurora College, a virtual class, is available to rural and distant
        students through 182 authorised host schools.
      </Typography>
      <Typography sx={useStyles.paragraph}>
        Find a
        <Link href="#" sx={useStyles.link}>
          list of all the selective high schools.
        </Link>
      </Typography>
      <Typography sx={useStyles.paragraph}>
        For further information, see
        <Link href="#" sx={useStyles.link}>
          What are selective high schools.
        </Link>
      </Typography>

      <Typography sx={useStyles.heading}>How do I apply?</Typography>
      <Typography sx={useStyles.paragraph}>
        Applications for Year 7 entrance in 2025 are open beginning Monday,
        October 9, 2023, and closing Monday, November 20, 2023. During this
        time, you can apply online through the application website. The parent
        or carer who lives with their child most of the time should submit the
        application. The application takes about eight minutes to complete. To
        get the greatest viewing experience, use landscape orientation on your
        mobile phone.
      </Typography>
      <Typography sx={useStyles.header}>
        <b>Key Dates: Year 7 entrance in 2025*.</b>
      </Typography>
      <Box width={"70%"}>
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          marginBottom={2}
        >
          <Typography sx={useStyles.header}>
            <b>Date</b>
          </Typography>
          <Typography sx={useStyles.header}>
            <b>Activity</b>
          </Typography>
        </Stack>
        <Stack flexDirection={"row"} justifyContent={"space-between"}>
          <Typography sx={useStyles.paragraph}>9 October 2023</Typography>
          <Typography sx={useStyles.header}>Applications open</Typography>
        </Stack>
        <Stack flexDirection={"row"} justifyContent={"space-between"}>
          <Typography sx={useStyles.paragraph}>November 20, 2023</Typography>
          <Typography sx={useStyles.header}>
            Applications close May 9, 2024.
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

export default FR_Selective;
