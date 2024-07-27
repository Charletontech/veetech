import { useContext, useEffect, useState } from "react";
import { MainContext } from "../../App";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import FetchRequestOptions from "../FetchRequestOptions";

var examData = {
  examType: "",
  examYear: "",
  subjects: {},
  noOfQuestions: 0,
  accessToken: "",
  examDuration: 0,
};

const SetUpForm = () => {
  const { examType, noOfSubjects } = useContext(MainContext);
  const { setExamPaper } = useContext(MainContext);
  useEffect(() => {
    examData.examType = examType;
  });

  const navigate = useNavigate();

  const options = (
    <>
      <option value="--">---</option>
      <option value="mathematics">Mathematics</option>
      <option value="english">English</option>
      <option value="chemistry">Chemistry</option>
      <option value="biology">Biology</option>
      <option value="Physics">Physics</option>
      <option value="commerce">commerce</option>
      <option value="accounting">Accounting</option>
      <option value="englishlit">Lit. in English</option>
      <option value="government">Government</option>
      <option value="crk">C.R.K</option>
      <option value="geography">Geography</option>
      <option value="economics">Economics</option>
      <option value="irk">I.R.K</option>
      <option value="civiledu">Civic Education</option>
      <option value="insurance">insurance</option>
      <option value="currentaffairs">Current Affairs</option>
      <option value="history">History</option>
    </>
  );

  var subjects = [
    <div>
      <label htmlFor="subject1">Subject 1</label>
      <select
        name="subject1"
        onChange={(e) => (examData.subjects.subject1 = e.target.value)}
      >
        {options}
      </select>
    </div>,
    <div>
      <label htmlFor="subject2">Subject 2</label>
      <select
        name="subject2"
        onChange={(e) => {
          examData.subjects.subject2 = e.target.value;
        }}
      >
        {options}
      </select>
    </div>,
    <div>
      <label htmlFor="subject3">Subject 3</label>
      <select
        name="subject3"
        onChange={(e) => {
          examData.subjects.subject3 = e.target.value;
        }}
      >
        {options}
      </select>
    </div>,
    <div>
      <label htmlFor="subject4">Subject 4</label>
      <select
        name="subject4"
        onChange={(e) => {
          examData.subjects.subject4 = e.target.value;
        }}
      >
        {options}
      </select>
    </div>,
  ];

  // Sweetalert Custom alert
  function customAlert(title, message, icon) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: `${icon}`,
      title: `${title}`,
      text: `${message}`,
    });
  }

  // handle form submission
  const [buttonText, setButtonText] = useState("Start exam");
  const submitSetUpForm = (e) => {
    // validate subjects duplicate subjects
    var subjectsList = Object?.values(examData.subjects);
    function hasDuplicate(selectedSubJects) {
      return selectedSubJects.some(
        (subject, index) => selectedSubJects.indexOf(subject) !== index
      );
    }
    if (hasDuplicate(subjectsList)) {
      customAlert(
        "Duplicate subjects",
        "You cannot select the same subject twice. Please select different subjects for this test",
        "error"
      );
      return;
    }

    // validate that theres no invalid subject
    if (subjectsList.includes("--")) {
      customAlert("Select Subjects", "Complete all subjects", "error");
    }

    // validate number of subjects and set duration and number of questions for exam
    var noOfSelectedSubjects = Object?.values(examData.subjects).length;
    switch (examType) {
      case "JAMB":
        examData.examDuration = 1;
        examData.noOfQuestions = 80;
        if (noOfSelectedSubjects !== 4) {
          customAlert(
            "Incomplete subjects!",
            "You must select 4 subjects.",
            "error"
          );
          return;
        }

        break;
      case "WAEC":
        examData.examDuration = 1;
        examData.noOfQuestions = 40;
        if (noOfSelectedSubjects !== 1) {
          customAlert(
            "Invalid number of subjects!",
            "You must select just 1 subject.",
            "error"
          );
          return;
        }
        break;
      case "A-LEVEL":
        examData.examDuration = 2;
        examData.noOfQuestions = 100;
        if (noOfSelectedSubjects !== 2) {
          customAlert(
            "Incomplete subjects!",
            "You must select 2 subjects.",
            "error"
          );
          return;
        }
        break;

      default:
        console.log("complete subjects");
        break;
    }

    // validate access token
    if (examData.accessToken === "") {
      customAlert(
        "Access token absent",
        "please provide your access token.",
        "info"
      );
      return;
    }

    // validate exam year
    if (examData.examYear === "") {
      customAlert(
        "Exam year not selected",
        "please select your preferred exam year.",
        "info"
      );
      return;
    }

    // indicate that exam is loading on the button
    e.disabled = true;
    setButtonText("Loading exam, Please wait...");

    // send exam data to server: verify access token
    try {
      fetch(
        "http://localhost:5000/api/verify-exam-access",
        FetchRequestOptions("post", examData)
      )
        .then((res) => {
          if (res.status === 200) {
            customAlert("Success", "Exam started, Goodluck!", "success");
            // set login time for unlocking CBT route for 3 hours
            localStorage.setItem("loginTime", new Date().getTime());
            navigate("/cbt");
          } else if (res.status === 401) {
            customAlert(
              "Invalid Access Token",
              "Please provide a valid access token",
              "error"
            );
          } else {
            throw new Error("Request not successful");
          }

          setButtonText("Start exam");
          e.disabled = false;
          return res.json();
        })
        .then((data) => {
          setExamPaper(data);
        });
    } catch (err) {
      customAlert(
        "An error ocurred",
        "Please try again. (code: C.LOG)",
        "error"
      );
      console.log(err);
      setButtonText("Start exam");
      e.disabled = false;
    }
  };

  return (
    <div className="set-up-form">
      <form method="post" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="examType">Exam</label>
          <input type="text" name="examType" readOnly value={examType} />
        </div>

        <div>
          <label htmlFor="examYear">Exam year</label>
          <select
            name="examYear"
            onChange={(e) => {
              examData.examYear = e.target.value;
            }}
          >
            <option value="2000">2000</option>
            <option value="2001">2001</option>
            <option value="2002">2002</option>
            <option value="2003">2003</option>
            <option value="2004">2004</option>
            <option value="2005">2005</option>
            <option value="2006">2006</option>
            <option value="2007">2007</option>
            <option value="2008">2008</option>
            <option value="2009">2009</option>
            <option value="2010">2010</option>
            <option value="2011">2011</option>
            <option value="2012">2012</option>
            <option value="2013">2013</option>
            <option value="2014">2014</option>
            <option value="2015">2015</option>
            <option value="2016">2016</option>
            <option value="2017">2017</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
        </div>

        {subjects.slice(0, noOfSubjects).map((subject) => subject)}

        <div>
          <label htmlFor="accessToken">Access token</label>
          <input
            type="text"
            onChange={(e) => {
              examData.accessToken = e.target.value;
            }}
          />
        </div>

        <button onClick={(e) => submitSetUpForm(e)}>{buttonText}</button>
      </form>
    </div>
  );
};

export default SetUpForm;
