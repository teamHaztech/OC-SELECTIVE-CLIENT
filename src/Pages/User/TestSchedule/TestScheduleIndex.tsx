import { useLocation, Route, Routes, Link } from "react-router-dom";
import Exam_Section from "./Exam_Section";
import MainTestSchedule from "./MainTestSchedule";
import TestSeries from "./TestSeries";

const TestScheduleIndex = () => {
  return (
    <Routes>
      <Route index element={<MainTestSchedule />} />
      
      
    </Routes>
  );
};

export default TestScheduleIndex;
