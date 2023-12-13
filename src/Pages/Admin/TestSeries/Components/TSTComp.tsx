import { Button, Stack, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MRT_ColumnDef } from "material-react-table";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import adminTokenAxios from "../../../../Hooks/AdminTokenAxios";
import SimpleTable from "../../../../Components/Common/SimpleTable";
import LoadingBar from "../../../../Components/Headers/LoadingBar";
import {
  DeleteIconButton,
  DownloadIconButton,
  EditIconButton,
} from "../../../../Components/Common/Button";
import AlertBox from "../../../../Components/Common/AlertBox";
import UploadModal from "../../../../Components/Model/UploadModal";
import PdfMaker from "./PdfMaker";
import DownloadPdfModel from "../../../../Components/Model/DownloadPdfModel";

interface TableCompProps {
  tabId: string | number;
  selectValue: number;
}

type topicList = {
  id: number;
  t_name: string;
  tsc_id: number;
  nv_topic: number;
  status: number;
};
const TSTComp = ({ tabId, selectValue }: TableCompProps) => {
  const [topicIde, setTopicIde] = useState<any>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [open1, setOpen1] = useState<boolean>(false);
  const [open2, setOpen2] = useState<boolean>(false);
  const [setData, setSetData] = useState<any>(null);
  const [open3, setOpen3] = useState<boolean>(false);
  const [open4, setOpen4] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTopicIde(null);
  };

  const handleAlertBoxOpen = () => {
    setOpen1(true);
  };
  const handleAlertBoxClose3 = () => {
    setOpen4(false);
  };
  const handleAlertBoxClose = () => {
    setOpen1(false);
  };

  const handleAlertBoxOpen2 = () => {
    setOpen2(true);
  };

  const handleAlertBoxClose2 = () => {
    setOpen2(false);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };
  const queryClient = useQueryClient();

  const topics = useQuery({
    queryKey: ["topicList", tabId, selectValue],
    queryFn: async () => {
      return await adminTokenAxios.get(
        `admin/show-topics/${tabId}/${selectValue}`
      );
    },
  });

  // console.log(topics?.data?.data.topics);

  const deleteTopicMutation = useMutation({
    mutationFn: async (topicId: any) => {
      console.log("mutation data", topicId);
      return await adminTokenAxios.delete(`/admin/delete-topic/${topicId}`);
    },
    onError: (error: any) => {
      console.log("Error Deleting Set:", error);
    },
    onSuccess: (res: any) => {
      console.log("Mutation Reponse", res);
      // setMessage(res?.response?.data?.Message);
      // handleAlertBoxOpen();
      // navigate(-1);
      if (res.status == 200) {
        queryClient.setQueryData(["topicList", tabId, selectValue], res);
        handleAlertBoxOpen2();
      } else {
        handleAlertBoxOpen();
      }
    },
  });

  const handleDeleteTopic = (topicId: any) => {
    // console.log("delete", topicId);
    deleteTopicMutation.mutate(topicId);
  };

  const topicCheck = useQuery({
    queryKey: ["TopicCheck", topicIde],
    queryFn: async () => {
      console.log("Query fn", topicIde);
      const response = await adminTokenAxios.get(
        `admin/check-topic/${topicIde}`
      );
      if (response.status === 200) {
        handleOpen();
      } else {
        setOpen4(true);
        setTopicIde(null);
      }
      // console.log(response.data?.topic_data?.topic);
      return response.data;
    },
    enabled: !!topicIde,
  });

  const handleEdit = (topicId: any) => {
    setTopicIde(topicId);

    // console.log("click", topicCheck?.data?.status);
    // // handleOpen();
    // if (topicCheck?.data?.status === 200) {
    //   handleOpen();
    // } else {
    //   alert("can't edit");
    // }
  };
  const getTopicQuestion = useMutation({
    mutationFn: async (id: number) => {
      console.log(id);

      return await adminTokenAxios.get(`admin/get-topic-question/${id}`);
    },
    onSuccess: (res) => {
      setSetData(res?.data.topic_questions);
      setOpen3(true);
      // console.log("muta", res?.data.topic_questions);
    },
  });
  console.log(getTopicQuestion.data);

  const columns = useMemo<MRT_ColumnDef<topicList>[]>(
    //column definitions...
    () => [
      {
        accessorKey: "t_name",
        header: "Topic Name",
      },

      {
        accessorKey: "id",
        header: "",
        Cell: ({ cell, row }) => (
          <Stack direction={"row"} spacing={1}>
            {tabId === 2 ? (
              <Link to={`topic-details/${cell.getValue<string>()}`}>
                <Button type="button" variant="outlined">
                  View
                </Button>
              </Link>
            ) : (
              <EditIconButton
                type="button"
                disabled={cell.row.original.nv_topic === 1}
                func={() => handleEdit(cell.getValue<string>())}
              />
            )}

            {/* <PdfMaker
              bol={true}
              topic={topics.t_name}
              data={questions}
              button={}
            /> */}
            {/* <DownloadIconButton /> */}

            <DeleteIconButton
              type="button"
              func={() => handleDeleteTopic(cell.getValue<string>())}
            />
            <DownloadIconButton
              type="button"
              func={() =>
                getTopicQuestion.mutate(parseInt(cell.getValue<string>()))
              }
            />
          </Stack>
        ),
      },
    ],
    []
    //end
  );

  return (
    <>
      <AlertBox
        name="Cannot Delete The Topic"
        type="error"
        bol={open1}
        duration={6000}
        handleAlertBoxClose={handleAlertBoxClose}
      />
      <AlertBox
        name="Cannot Edit The Topic"
        type="error"
        bol={open4}
        duration={6000}
        handleAlertBoxClose={handleAlertBoxClose3}
      />
      <AlertBox
        name="Successfully Deleted The Topic"
        type="success"
        duration={6000}
        bol={open2}
        handleAlertBoxClose={handleAlertBoxClose2}
      />

      {topics.isLoading ? (
        <LoadingBar />
      ) : topics.isSuccess ? (
        <SimpleTable columns={columns} data={topics?.data?.data.topics} />
      ) : (
        <div>No Data</div>
      )}

      <UploadModal
        open={open}
        // handleOpen={handleOpen}
        handleClose={handleClose}
        topic={[
          topicCheck.data?.topic_data?.tsc_id,
          topicCheck.data?.topic_data?.topic,
        ]}
        topicId={topicIde}
        setTopic={setTopicIde}
        // handleSubmit={handleSubmit}
        // setCsvData={setCsvData}
      />

      <DownloadPdfModel
        cate_id={tabId}
        open={open3}
        handleClose={handleClose3}
        data={getTopicQuestion.data?.data}
      />
    </>
  );
};

export default TSTComp;
