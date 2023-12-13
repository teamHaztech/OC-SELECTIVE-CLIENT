import React from "react";
import { Typography, Box, Grid, Card, CardContent } from "@mui/material";

// interface StudentDetailsProps {
//   student: {
//     id: string;
//     name: string;
//     email: string;
//     phone: string;
//     DOB: string;
//     state: string;
//     city: string;
//     totalTestsAnswered: number;
//     completedTests: number;
//     incompleteTests: number;
//     missedTests: number;
//     remainingTests: number;
//   };
// }

interface StudentDetailProps {
  data: {
    user: {
      id: number;
      name: string;
      email: string;
      phone: string;
      DOB: null | string; // Assuming DOB can be null or a string
      email_verified_at: null | string; // Assuming email_verified_at can be null or a string
      created_at: null | string; // Assuming created_at can be null or a string
      updated_at: null | string; // Assuming updated_at can be null or a string
    };
    total_test: number;
    complete_test: number;
    incomplete_test: number;
    Remaining_test: number;
  };
}

const Details = ({ data }: StudentDetailProps) => {
  const fields = [
    // { label: "Student ID:", value: student.id },
    { label: "Name:", value: data.user.name },
    { label: "Email:", value: data.user.email },
    { label: "Phone No.:", value: data.user.phone },
    {
      label: "Birth Date:",
      value: data.user.DOB === null ? "-" : data.user.DOB,
    },

    // { label: "State:", value: student.state },
    // { label: "City:", value: student.city },
    { label: "Total Tests:", value: data.total_test },
    { label: "Completed Tests:", value: data.complete_test },
    { label: "Incomplete Tests:", value: data.incomplete_test },
    { label: "Remaining Tests:", value: data.Remaining_test },
  ];
  return (
    <Card elevation={3} sx={{paddingY:"20px"}}>
      <CardContent>
        <Grid paddingLeft={4} container spacing={2}>
          {fields.map((field) => (
            //React.Fragment same as <></>
            <React.Fragment key={field.label}>
              <Grid item xs={4}>
                <Typography variant="body1" align="left">
                  <strong>{field.label}</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{field.value}</Typography>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Details;
