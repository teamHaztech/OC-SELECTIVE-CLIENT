import {
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Button,
} from "@mui/material";
import { ParaText3, ParaText1 } from "./ParaText";
import FindInPageOutlinedIcon from "@mui/icons-material/FindInPageOutlined";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import tokenAxios from "../../Hooks/TokenAxios";

interface headerProps {
  header: Array<string>;
}
interface dataProps {
  data: Array<object>;
  func?: () => void;
  url?: string;
  psId?: number;
  third?: boolean;
}

type mUData = {
  ps_id?: number;
  set_id: number;
};

const TableHeader = (props: headerProps) => {
  return (
    <TableHead>
      <TableRow>
        {/* <TableCell align="center" sx={{ border: 0 }}>
          <ParaText3 text="Sr. No" />
        </TableCell> */}
        {props.header.map((item, key) => {
          return (
            <TableCell key={key} align="center" sx={{ border: 0 }}>
              <ParaText3 text={item} />
            </TableCell>
          );
        })}

        {/* <TableCell align="center" sx={{ border: 0 }} colSpan={1}><ParaText3 text="Details" /></TableCell> */}
      </TableRow>
    </TableHead>
  );
};
const TableData = (props: dataProps) => {
  const TestMU = useMutation({
    mutationFn: async (data: mUData) => {
      console.log(data.set_id);

      return await tokenAxios.post("/post-user-test-status", {
        ps_id: data.ps_id,
        set_id: data.set_id,
      });
    },
    onSuccess: (response) => {
      console.log(response);

      // navigate(`/user/Test-schedule/Test-section/${response.data.uts_id}`);
      let url = `/#/user/Test-schedule/Test-section/${response.data.uts_id}`;
      window.open(url, "_blank", "width=1400,height=600");
    },
  });

  return (
    <TableBody>
      {props.data?.length === 0 ? (
        <TableRow>
          <TableCell align="center" sx={{ border: 0 }} colSpan={7}>
            No Item Found
          </TableCell>
        </TableRow>
      ) : (
        props.data?.map((item: any, key) => {
          const { id, ...item2 } = item;
          let temp: any = Object.values(item2);
          return (
            <TableRow key={key}>
              <TableCell align="center" sx={{ border: 0 }}>
                {key + 1}
              </TableCell>
              {temp.map((val: any, key: number) => {
                return (
                  <TableCell key={key} align="center" sx={{ border: 0 }}>
                    <ParaText1 text={val} />
                  </TableCell>
                );
              })}
              <TableCell align="center" sx={{ border: 0 }}>
                {props?.third ? (
                  <Link to="Test-schedule">
                    <FindInPageOutlinedIcon
                      sx={{ width: "25px", height: "25px", color: "#3A9BDC" }}
                      onClick={() =>
                        TestMU.mutate({
                          ps_id: props.psId,
                          set_id: item.id,
                        })
                      }
                    />
                  </Link>
                ) : (
                  <Link to={`${props.url}/${item.id}`}>
                    <FindInPageOutlinedIcon
                      sx={{ width: "25px", height: "25px", color: "#3A9BDC" }}
                    />
                  </Link>
                )}
              </TableCell>
            </TableRow>
          );
        })
      )}
    </TableBody>
  );
};
export { TableHeader, TableData };
