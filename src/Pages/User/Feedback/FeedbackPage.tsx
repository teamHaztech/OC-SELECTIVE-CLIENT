import {
  Box,
  Container,
  Divider,
  outlinedInputClasses,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
// import { OButton3 } from "../../../../Components/Common/Button";

import emailjs from "@emailjs/browser";
import { OButton3 } from "../../../Components/Common/Button";
import AlertBox from "../../../Components/Common/AlertBox";
import { AppContext } from "../../../Context/AppContext";
import { Header3, Header4 } from "../../../Components/Common/HeaderText";
// import AlertBox from "../../../../Components/Common/AlertBox";
type Inputs = {

  subject: string;
  message: string;
};

interface formInput {
  type: string;
  label: string;
  area?: boolean;
  name: "subject" | "message";
}

function FeedbackPage() {
  const { user } = AppContext();
  const [val, setVal] = useState(false);
  const formData: formInput[] = [
    { type: "text", label: "Subject", name: "subject" },
    // { type: "email", label: user ? user?.email : "test", name: "user_email" },
    // { type: "text", label: "Phone Number", name: "number" },
    { type: "text", label: "Message", area: true, name: "message" },
  ];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const onSubmit: SubmitHandler<Inputs> = async (para_data: any) => {
    // console.log("contact form", para_data);
    const feedData = {
        user_name: user?.name ,
        user_email:user?.email,
        subject:para_data.subject,
        message:para_data.message
    }
    setLoading(true);
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICEID,
        import.meta.env.VITE_MAILJS_TEMPLATEID,
        feedData,
        import.meta.env.VITE_MAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log(result.text);
          setOpen(true);
          setLoading(false);
          reset();
        },
        (error) => {
          setLoading(false);
          console.log("error " + error.text);
        }
      );
  };
  return (
    <Container maxWidth="md" sx={{ my: 1 }}>
      <AlertBox
        bol={open}
        name="SuccessFully Sent"
        type="success"
        handleAlertBoxClose={() => setOpen(false)}
      />
      <Paper elevation={3} sx={{ px: 4,py:2 }}>
        
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection:"column",
        
            justifyContent: "space-between",
          }}
        >
          <Header4 header="Feedback" />
          <Divider sx={{ mb: 2 }} />
          <Stack sx={{ width: { lg: "640px" } }} spacing={2}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {formData.map((item: formInput, key) => {
                return (
                  <TextField
                    error={val}
                    type={item.type}
                    placeholder={item.label}
                    key={key}
                    required={true}
                    helperText={val}
                    multiline={item.area}
                    rows={4}
                    InputLabelProps={{
                      sx: {
                        color: "#000000",
                        fontWeight: "500",
                      },
                    }}
                    sx={{
                      width: "100%",
                      mb: "25px",
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "#FFFFFF",
                        color: "#000000",
                        [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                          borderColor: "#FA8128",
                        },
                        [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]:
                          {
                            border: "1px solid #FA8128",
                          },
                      },
                    }}
                    {...register(item.name)}
                  />
                );
              })}
              <OButton3
                name={loading ? "Sending..." : "Send"}
                type={loading ? "button" : "submit"}
              />
            </form>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}

export default FeedbackPage;
