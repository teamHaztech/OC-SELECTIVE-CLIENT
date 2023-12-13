import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { Stack } from "@mui/material";

import { useState } from "react";
import JoditReact from "jodit-react-ts";
import { BButton2 } from "../Common/Button";
import { useMutation } from "@tanstack/react-query";
import adminTokenAxios from "../../Hooks/AdminTokenAxios";
import AlertBox from "../Common/AlertBox";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",

  height: "100%",
  minHeight: "300px",
  maxHeight: "calc(100vh - 200px)",
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

interface ModalProps {
  handleOpen?: () => void;
  handleClose?: () => void;
  handleAlertBoxOpen: () => void;
  open: boolean;
  data?: any;
  readingTopicD: any;
}

const PassageEditModal = ({
  open,
  handleClose,
  data,
  handleAlertBoxOpen,
  readingTopicD,
}: ModalProps) => {
  const [value, setValue] = useState("");

  const updateReadingPassageMU = useMutation({
    mutationFn: async (formattedData: any) => {
      return await adminTokenAxios.put(
        `/admin/update-reading-question`,
        formattedData
      );
    },
    onError: (error: any) => {
      console.error("Error creating user:", error.response?.data);
    },
    onSuccess: (res) => {
      handleAlertBoxOpen();
      handleClose?.();
      readingTopicD.refetch();
    },
  });

  const handleUpdate = () => {
    const formattedData = {
      question: data.question.map((question: any) => ({
        ...question,
        paragraph: value,
      })),
    };

    // console.log("formattedData", formattedData);

    updateReadingPassageMU.mutate(formattedData);
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              sx={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
              }}
            >
              <CloseIcon />
            </IconButton>

            <Box mt={4}>
              <JoditReact
                onChange={(content: any) => setValue(content)}
                defaultValue={data?.paragraph}
              />
              <Stack my={2} textAlign={"center"}>
                <BButton2 name={"Update"} func={handleUpdate} />
              </Stack>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default PassageEditModal;
