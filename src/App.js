import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./App.css";
import Screen1 from "./components/home/Screen1";
import Screen2 from "./components/home/Screen2";
import Screen3 from "./components/home/Screen3";
import Screen4 from "./components/home/Screen4";
import Cbt from "./components/test/Cbt";
import AccessTokenForm from "./components/home/AccessTokenForm";
import PerformanceAnalysis from "./components/test/PerformanceAnalysis";
import Admin from "./components/admin/Admin";

export const MainContext = createContext();

const App = () => {
  const location = useLocation();

  // Logic to verify access to CBT exam is verified
  var isVerified = false;
  const currentDate = new Date().getTime();
  const loginTime = localStorage.getItem("loginTime");
  const threeHours = 3 * 60 * 60 * 1000;
  if (currentDate - loginTime < threeHours) {
    isVerified = true;
  }

  return (
    <div className="App">
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          classNames="fade"
          timeout={{ enter: 600, exit: 300 }}
        >
          <Routes location={location}>
            <Route path="/" element={<Screen1 />} />
            <Route path="/screen2" element={<Screen2 />} />
            <Route path="/screen3" element={<Screen3 />} />
            <Route path="/set-up-exam" element={<Screen4 />} />
            <Route path="/cbt" element={isVerified ? <Cbt /> : <Screen3 />} />
            <Route path="/result" element={<PerformanceAnalysis />} />
            <Route path="/get-access-token" element={<AccessTokenForm />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

const AppWrapper = () => {
  // all states data
  const [examType, setExamType] = useState("");
  const [noOfSubjects, setNoOfSubjects] = useState(0);
  const [setupFormData, SetSetupFormData] = useState({});
  const [examPaper, setExamPaper] = useState([]);
  return (
    <MainContext.Provider
      value={{
        examType,
        setExamType,
        noOfSubjects,
        setNoOfSubjects,
        setupFormData,
        SetSetupFormData,
        examPaper,
        setExamPaper,
      }}
    >
      <Router>
        <App />
      </Router>
    </MainContext.Provider>
  );
};

export default AppWrapper;
