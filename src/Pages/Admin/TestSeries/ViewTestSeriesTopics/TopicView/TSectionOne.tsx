import {
  Container,
  Stack,
  Card,
  Divider,
  Box,
  Switch,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

import Grid from "@mui/material/Unstable_Grid2";
import {
  ParaText1,
  ParaText3,
} from "../../../../../Components/Common/ParaText";
import { UserContext } from "../../../../../Context/UserContext";
import { MRT_ColumnDef } from "material-react-table";
import SimpleTable from "../../../../../Components/Common/SimpleTable";
import {
  DeleteIconButton,
  DownloadIconButton,
  EditIconButton,
} from "../../../../../Components/Common/Button";

import UploadModal from "../../../../../Components/Model/UploadModal";
import adminTokenAxios from "../../../../../Hooks/AdminTokenAxios";
import PdfMaker from "../../Components/PdfMaker";

interface Detail {
  title: string;
  data: string;
}

interface props {
  topics: {
    id: number;
    topic: string;
    t_name: string;
    tsc_id: number;
    status: number;
  };
  questions: questionList[];
  handleDeleteTopic: (id: any) => void;
  topicCheck?: any;
  topicId?: number | string;
}

type questionList = {
  id: number;
  question: string;
  option_1: string;
  option_2: string;
  option_3: string;
  option_4: string;
  option_5: null;
  correct_option: string | number;
  explanation: string;
  tst_id: number;
  marks: null | number;
  status: number;
};
const TSectionOne = ({
  topics,
  questions,
  handleDeleteTopic,
  topicCheck,
  topicId,
}: props) => {
  const { handlePEOpen, dataSubmit } = UserContext();

  // const [topicId, setTopicId] = useState(null);
  const [checked, setChecked] = useState(true);
  const [open, setOpen] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns = useMemo<MRT_ColumnDef<questionList>[]>(
    //column definitions...
    () => [
      {
        accessorKey: "question",
        header: "Question",
      },
      {
        accessorKey: "option_1",
        header: "Option 1",
      },
      {
        accessorKey: "option_2",
        header: "Option 2",
      },
      {
        accessorKey: "option_3",
        header: "Option 4",
      },
      {
        accessorKey: "option_4",
        header: "Option 4",
      },
      {
        accessorKey: "correct_option",
        header: "Correct Answer",
        Cell: ({ cell }) => {
          switch (cell.getValue<string>()) {
            case "1":
              return <span>A</span>;
            case "2":
              return <span>B</span>;
            case "3":
              return <span>C</span>;
            case "4":
              return <span>D</span>;
          }
        },
      },
      {
        accessorKey: "explanation",
        header: "Explanation",
      },
      // {
      //   accessorKey: "id",
      //   header: "",
      //   Cell: ({ cell }) => (
      //     <Link to={`view-product-detail/${cell.getValue<string>()}`}>
      //       <Button variant="outlined">View</Button>
      //     </Link>
      //   ),
      // },
    ],
    []
    //end
  );

  // const topicCheck = useQuery({
  //   queryKey: ["TopicCheck", topicId],
  //   queryFn: async () => {
  //     console.log("Query fn", topicId);
  //     return await adminTokenAxios.get(`admin/check-topic/${topicId}`);
  //   },
  //   enabled: !!topicId,
  // });

  const handleEdit = () => {
    console.log("click", topicCheck?.data?.status);
    // handleOpen();
    if (topicCheck?.data?.status === 200) {
      handleOpen();
    } else {
      alert("can't edit");
    }
  };

  return (
    <>
      <Card
        sx={{
          // boxShadow: "6px 6px 20px 0px #808080",
          // my: "15px",
          // width: { lg: "1020px", md: "900px", sm: "900px", xs: "360px" },
          // height: { lg: "auto", md: "286px", sm: "286px", xs: "286px" },
          py: "1rem",
          px: "2rem",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <ParaText3 text={`Topic Name - ${topics.t_name}`} />
          {/* <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />*/}
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <EditIconButton type="button" func={() => handleEdit()} />
            {/* <PdfMaker
              bol={true}
              topic={topics.t_name}
              data={questions}
              button={<DownloadIconButton />}
            /> */}

            <DeleteIconButton
              type="button"
              func={() => handleDeleteTopic(topics.id)}
            />
          </Stack>
        </Stack>

        <Box marginY={2}>
          {questions ? (
            <SimpleTable columns={columns} data={questions} />
          ) : (
            <div>No Data</div>
          )}
        </Box>
        <Box sx={{ width: "100%", textAlign: "right" }}></Box>
      </Card>

      <UploadModal
        open={open}
        // handleOpen={handleOpen}
        handleClose={handleClose}
        topic={[topics.tsc_id, topics.topic]}
        topicId={topicId}
        // handleSubmit={handleSubmit}
        // setCsvData={setCsvData}
      />
    </>
  );
};

export default TSectionOne;
