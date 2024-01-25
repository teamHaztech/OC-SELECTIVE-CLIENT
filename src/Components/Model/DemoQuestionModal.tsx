import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DemoQuestionComp from "../../Pages/User/TestResultAnalysis/Components/DemoQuestionComp";
import { ParaText1, ParaText3 } from "../Common/ParaText";
import { Divider } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",

  height: "full",
  minHeight: "300px",
  maxHeight: "calc(100vh - 200px)",
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

interface ModalProps {
  subject?: any;
  handleClose?: () => void;
  open: boolean;
  data: any;
}

const DemoQuestionModal = ({ handleClose, open, data }: ModalProps) => {
  console.log("mutation", data?.data?.topic_questions);
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
            <ParaText3
              text="Buy Weak Topic Questions"
              css={{ textAlign: "center" }}
            />
            <Divider
              sx={{
                borderColor: "#FA8128",
                borderWidth: "1px",
                borderRadius: "3px",
                width: "100%",
                my:'10px'
              }}
            />
            <Box mt={3}>
              {data?.data?.topic_questions.map((item: any, key: number) => (
                <Accordion key={item.id}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <ParaText3 text={item.topic}/>
                  </AccordionSummary>
                  <AccordionDetails>
                    <DemoQuestionComp
                      questions={item?.get_question}
                      total_questions={item}
                    />
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default DemoQuestionModal;
