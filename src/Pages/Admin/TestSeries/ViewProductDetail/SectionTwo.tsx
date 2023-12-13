import {
  Button,
  Card,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  Switch,
} from "@mui/material";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { ParaText4, ParaText3 } from "../../../../Components/Common/ParaText";
import { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  BButton,
  DeleteIconButton,
  DownloadIconButton,
  EditIconButton,
  SwitchComp,
} from "../../../../Components/Common/Button";
import PdfMaker from "../Components/PdfMaker";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import adminTokenAxios from "../../../../Hooks/AdminTokenAxios";
import AlertBox from "../../../../Components/Common/AlertBox";
import EditTestSetModal from "../../../../Components/Model/EditTestSetModal";
import { fetchAndReplaceImages } from "../../../../utils/docx";
import { demoDoc } from "../../../../utils/test";
import DownloadPDF from "../Components/PDF/DownloadPDF";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const SectionTwo = ({
  sets,
  onSwitchToggle,
  handleDelete,
  addNewSet,
  releaseStatus,
}: any) => {
  // console.log("sets", sets);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [setData, setSetData] = useState<any>(null);
  const { productdetails } = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const [open2, setOpen2] = useState<boolean>(false);
  const [open3, setOpen3] = useState<boolean>(false);
  const [setId, setSetId] = useState<any>("");
  const [setName, setSetSetName] = useState<any>("");

  const handleOpen = (setId: any, setName: string) => {
    setSetId(setId);
    setSetSetName(setName);
    // getTopics.refetch();

    setOpen3(true);
  };
  const handleClose = () => {
    setSetId("");
    setSetSetName("");
    setOpen3(false);
  };

  const handleAlertBoxOpen = () => {
    setOpen(true);
  };

  const handleAlertBoxClose = () => {
    setOpen(false);
  };

  const handleAlertBoxOpen2 = () => {
    setOpen2(true);
  };

  const handleAlertBoxClose2 = () => {
    setOpen2(false);
  };

  const [value, setValue] = useState<number>(0);
  const [tsc, setTsc] = useState<number>(1);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  // console.log(sets);

  const deleteSetMU = useMutation({
    mutationFn: async (id: number) => {
      return await adminTokenAxios.delete(`/admin/delete-set/${id}`);
    },
    onSuccess: (res) => {
      console.log(res.status);
      if (res.status == 200) {
        handleAlertBoxOpen2();
      } else {
        handleAlertBoxOpen();
      }
    },
  });

  useEffect(() => {
    setTsc(sets[value].id);
  }, [value]);

  const getSetQuestion = useMutation({
    mutationFn: async (id: number) => {
      return await adminTokenAxios.get(`admin/get-set-question/${id}`);
    },
    onSuccess: (res) => {
      const data = res?.data?.set_questions;
      console.log("Question66", data);
      fetchAndReplaceImages(data);
    },
    // onSettled: (res) => {
    //   setSetData(res?.data.set_questions);
    //   console.log(setData);

    //   if (buttonRef.current) {
    //     buttonRef.current.click();
    //   }
    // },
  });

  const handleDownload = (id: number) => {
    getSetQuestion.mutate(id);
  };
  const queryClient = useQueryClient();
  const para = useParams();
  const p_id = para.productdetails;
  const getProductDetail: any = queryClient.getQueryData([
    "ViewProductDetails1",
    p_id,
  ]);
  console.log(getProductDetail);
  
  return (
    <>
      {/* {setData && (
        <PdfMaker
          bol={true}
          data={setData?.questions}
          randomG={true}
          buttonRef={buttonRef}
          total={setData?.questions?.length}
          topic={setData?.set_name}
        />
      )} */}

      <AlertBox
        name="Cannot Delete The Set"
        type="error"
        bol={open}
        duration={6000}
        handleAlertBoxClose={handleAlertBoxClose}
      />
      <AlertBox
        name="Successfully Deleted The Set"
        type="success"
        bol={open2}
        handleAlertBoxClose={handleAlertBoxClose2}
      />
      <Card
        sx={{
          width: { lg: "1020px", md: "900px", sm: "900px", xs: "360px" },
          py: "14px",
          px: "2rem",
        }}
      >
        <Stack spacing={2}>
          <Stack flexDirection={"row"} justifyContent={"space-between"}>
            <ParaText4
              text="Sets"
              css={{ fontWeight: 550, paddingTop: "13px" }}
            />

            <BButton
              name="Add New Set"
              disabled={releaseStatus}
              func={() =>
                addNewSet.mutate({ p_id: productdetails, tsc_id: tsc })
              }
            />
          </Stack>
          <Divider
            sx={{
              // borderColor: "#FA8128",
              borderWidth: "2px",
              borderRadius: "3px",
              width: "100%",
            }}
          />
        </Stack>

        <Box width={"full"}>
          <Box sx={{ width: "100%" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              {sets?.map((category: any, index: number) => (
                <Tab key={index} label={category.tsc_type} />
              ))}
            </Tabs>
            {getProductDetail?.categories?.map((category: any, index: number) => (
              <CustomTabPanel key={index} value={value} index={index}>
                <Stack spacing={2}>
                  {category?.sets?.map((set: any) => (
                    <Box
                      paddingBottom={1}
                      borderBottom={1}
                      borderColor={"gray"}
                      key={set.id}
                    >
                      <Stack direction={"row"} justifyContent={"space-between"}>
                        <Typography variant="h6" fontWeight={"bold"}>
                          {set.set_name}
                        </Typography>
                        <Stack
                          direction={"row"}
                          alignItems={"center"}
                          spacing={2}
                        >
                          {/* <DownloadIconButton
                            type="button"
                            func={(set) => {
                              console.log("click");
                              const pdfButton = buttonRef.current;
                              if (pdfButton) {
                                pdfButton.click(); 
                              }
                            }}
                          /> */}

                          <EditIconButton
                            type="button"
                            func={() => handleOpen(set.id, set.set_name)}
                            disabled={releaseStatus}
                          />

                          <DeleteIconButton
                            type="button"
                            func={() => handleDelete.mutate(set.id)}
                            disabled={releaseStatus}
                          />
                          {/* <DownloadIconButton type="button" /> */}
                          {/* <PdfMaker
                            bol={true}
                            data={set?.questions}
                            randomG={true}
                            button={<DownloadIconButton type="button" />}
                            total={set?.questions?.length}
                            topic={set?.set_name}
                          /> */}
                          <DownloadPDF
                            bol={true}
                            data={set?.questions}
                            randomG={true}
                            total={set?.questions?.length}
                            topic={setData?.t_name}
                            set={true}
                            index={set?.index}
                            cateId={tsc} //need to set this properly
                          />
                          {/* <DownloadIconButton
                            type="button"
                            name="Docx"
                            func={() => handleDownload(set.id)}
                          /> */}

                          <SwitchComp
                            checked={set.status === 1}
                            onChange={() => onSwitchToggle(set.id, set.status)}
                          />
                        </Stack>
                      </Stack>

                      <Typography
                        marginBottom={1}
                        variant="subtitle2"
                        color={"gray"}
                      >
                        Topics
                      </Typography>
                      {set.topics.map((topic: any) => (
                        <Link key={topic.id} to={`/admin/view-topics`}>
                          <Typography
                            sx={{
                              padding: "0 1rem",
                              paddingBottom: "4px",
                              "&:hover": {
                                borderLeft: "4px solid orange",
                                borderRight: "4px solid orange",
                                fontWeight: 600,
                              },
                            }}
                          >
                            {topic.t_name}
                          </Typography>
                        </Link>

                        // <div key={topic.id}>{topic.t_name}</div>
                      ))}
                    </Box>
                  ))}
                </Stack>
              </CustomTabPanel>
            ))}
          </Box>
        </Box>
      </Card>

      <EditTestSetModal
        handleClose={handleClose}
        open={open3}
        tsc={tsc}
        setId={setId}
        setName={setName}
      />
    </>
  );
};

export default SectionTwo;
