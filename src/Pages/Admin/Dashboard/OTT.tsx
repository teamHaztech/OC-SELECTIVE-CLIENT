import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UseGet from "../../../Hooks/UseGet";
import LoadingBar from "../../../Components/Headers/LoadingBar";

import SubData from "./SubData";
import adminTokenAxios from "../../../Hooks/AdminTokenAxios";
interface Props {
  value: string;
}

const OTT = ({ value }: Props) => {
  interface Option {
    name: string;
    value: number;
  }
  interface DataItem {
    name: string;
    total_purchases: string;
  }
  interface PerformanceItem {
    name: string;
    percentage: string;
  }

  const options: Option[] = [
    { name: "STT Package 1", value: 1 },
    { name: "STT Package 2", value: 2 },
    { name: "STT Package 3", value: 3 },
    { name: "STT Package 4", value: 4 },
    { name: "STT Package 5", value: 5 },
  ];

  const header = ["Package Name", "Total Purchases"];
  const tableData: DataItem[] = [
    { name: "STT Package 1", total_purchases: "2" },
    { name: "STT Package 1", total_purchases: "4" },
    { name: "STT Package 1", total_purchases: "4" },
    { name: "STT Package 1", total_purchases: "4" },
    { name: "STT Package 1", total_purchases: "4" },
  ];

  const header2 = ["Student Name", "Percentage"];
  const studentPerformance: PerformanceItem[] = [
    { name: "John Cena", percentage: "80%" },
    { name: "John Cena", percentage: "80%" },
    { name: "John Cena", percentage: "80%" },
    { name: "John Cena", percentage: "80%" },
    { name: "John Cena", percentage: "80%" },
    { name: "John Cena", percentage: "80%" },
    { name: "John Cena", percentage: "80%" },
    { name: "John Cena", percentage: "80%" },
    { name: "John Cena", percentage: "80%" },
  ];

  const [selectVal, setSelectVal] = useState<number>(1);

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["OC-Data", value],
    queryFn: () => adminTokenAxios.get(`admin/show-details/${value}`),
  });

  if (isLoading) {
    return <LoadingBar />;
  }

  return (
    <SubData
      options={options}
      func={setSelectVal}
      header={header}
      tableData={tableData}
      studentPerformance={studentPerformance}
      header2={header2}
      data={data?.data}
      name="OC"
    />
  );
};

export default OTT;
