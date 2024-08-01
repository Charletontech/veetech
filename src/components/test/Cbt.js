import { useState, useEffect, useMemo } from "react";
import Navbar from "../home/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

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

const Cbt = () => {
  // const { examPaper } = useContext(MainContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state;
  let examPaper = data;

  // Default values (structured to prevent accessing properties of undefined)
  const subjectsList = examPaper?.examInfo?.subjects
    ? Object.values(examPaper.examInfo.subjects)
    : [];
  const questions = examPaper?.questions || [];
  // set states of questions, ans, total etc..
  const [currentSubject, setCurrentSubject] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [totalScore, setTotalScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  // Setting the value of current question, etc.. (structured to Ensure that the current question data is always valid)
  const currentQuestionData =
    questions[currentSubject]?.data[currentQuestionIndex] || {};
  const currentQuestion = currentQuestionData.question || "";
  const currentOptions = currentQuestionData.option || {};
  const currentCorrectAns = currentQuestionData.answer || "";
  const hasImage = currentQuestionData.image || false;
  const hasSectionInstruction = currentQuestionData.section || false;

  // Timer implementation
  const examDuration = examPaper?.examInfo?.examDuration * 60 * 60; // duration in seconds
  const [timeRemaining, setTimeRemaining] = useState(examDuration);
  // structure/arrange the result into a result sheet variable
  const resultSheet = useMemo(
    () => ({
      totalScore: totalScore,
      noOfQuestions: examPaper?.examInfo?.noOfQuestions || 0,
      details: {},
    }),
    [totalScore, examPaper]
  );

  useEffect(() => {
    if (timeRemaining <= 0) {
      // Submit exam automatically when time is up
      navigate("/result", { state: { resultSheet } });
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [
    currentQuestionIndex,
    currentSubject,
    timeRemaining,
    navigate,
    resultSheet,
  ]);

  // format time remaining
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // function to change subjects
  const changeSubject = (i) => {
    setCurrentSubject(i);
    setCurrentQuestionIndex(0); // Reset question index when subject changes
    setSelectedOption("");
  };

  // score the current question
  const scoreAnswer = () => {
    if (selectedOption === "") return;

    // check if its the first question
    if (answeredQuestions.length < 1) {
      const isCorrect = selectedOption === currentCorrectAns;
      setTotalScore((prevScore) => (isCorrect ? prevScore + 1 : prevScore));
      setAnsweredQuestions((prevAnswered) => [
        ...prevAnswered,
        {
          ...currentQuestionData,
          solution: selectedOption,
          subject: currentSubject,
        },
      ]);
    }

    const alreadyAnsweredIndex = answeredQuestions.findIndex(
      (q) => q.id === currentQuestionData.id
    );

    if (alreadyAnsweredIndex === -1) {
      // Question hasn't been answered before
      const isCorrect = selectedOption === currentCorrectAns;
      setTotalScore((prevScore) => (isCorrect ? prevScore + 1 : prevScore));
      setAnsweredQuestions((prevAnswered) => [
        ...prevAnswered,
        {
          ...currentQuestionData,
          solution: selectedOption,
          subject: currentSubject,
        },
      ]);
    } else {
      // Question has been answered before
      const alreadyAnswered = answeredQuestions[alreadyAnsweredIndex];
      const wasCorrect = alreadyAnswered.solution === currentCorrectAns;
      const isNowCorrect = selectedOption === currentCorrectAns;

      if (wasCorrect && !isNowCorrect) {
        // Previously correct, now incorrect
        setTotalScore((prevScore) => prevScore - 1);
      } else if (!wasCorrect && isNowCorrect) {
        // Previously incorrect, now correct
        setTotalScore((prevScore) => prevScore + 1);
      }

      // Update the solution in the answeredQuestions array
      const updatedAnsweredQuestions = [...answeredQuestions];
      updatedAnsweredQuestions[alreadyAnsweredIndex].solution = selectedOption;
      updatedAnsweredQuestions[alreadyAnsweredIndex].subject = currentSubject;
      setAnsweredQuestions(updatedAnsweredQuestions);
    }
  };

  // function to change questions along with their options
  const changeOption = (e) => {
    setSelectedOption(e.target.value);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions[currentSubject]?.data?.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      if (examPaper.examInfo.examType === "WAEC" && currentSubject === 0) {
        changeSubject((prevQuestGroup) => prevQuestGroup + 1);
        setCurrentQuestionIndex((prevIndex) => prevIndex - prevIndex);
      } else {
        customAlert(
          "End of Subject",
          "You have reached the end of this subject.",
          "info"
        );
      }
    }
    scoreAnswer();
    console.log(
      `answered: ${answeredQuestions.length} \n total score: ${totalScore}`
    );
    setSelectedOption("");
  };

  // const previousQuestion = () => {
  //   if (currentQuestionIndex > 0) {
  //     setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  //   }
  //   scoreAnswer();
  //   console.log(
  //     `answered: ${answeredQuestions.length} \n total score: ${totalScore}`
  //   );
  // };

  // manually submit exam
  const submitExam = () => {
    scoreAnswer();
    structureResult();
  };

  function structureResult() {
    const result = answeredQuestions.reduce((acc, question) => {
      if (question.answer === question.solution) {
        if (!acc[question.subject]) {
          acc[question.subject] = 0;
        }
        acc[question.subject]++;
      }
      return acc;
    }, {});

    for (const [subject, score] of Object.entries(result)) {
      resultSheet.details[subjectsList[subject]] = score;
    }

    // send result to result page and navigate there
    navigate("/result", { state: { resultSheet } });
  }

  // Preloader screen
  if (!examPaper || !examPaper.examInfo || !examPaper.questions) {
    return (
      <div className="frame" style={{ background: "var(--bg)" }}>
        <Navbar />
        <div>Loading exam...</div>;
      </div>
    );
  }

  // main JSX
  return (
    <div className="frame" style={{ background: "var(--bg)" }}>
      <Navbar />
      <header className="cbt-header">
        <h4>{examPaper.examInfo.examType || ""}</h4>
        <p>
          Attempted: {answeredQuestions.length}/
          {examPaper?.examInfo?.noOfQuestions}
        </p>
        <b>{formatTime(timeRemaining)}</b>
      </header>
      <div className="subjects">
        {subjectsList.map((each, index) => (
          <button
            key={index}
            onClick={() => changeSubject(index)}
            style={{ textTransform: "capitalize" }}
          >
            {each}
          </button>
        ))}
      </div>

      <div className="questionsCont">
        <img
          style={hasImage ? { display: "initial" } : { display: "none" }}
          src={hasImage ? hasImage : "v-logo.png"}
          alt="img"
        />
        <article>
          {hasSectionInstruction ? (
            <article>
              <h4 style={{ marginBottom: "-0.8rem" }}>Instruction</h4> <br />{" "}
              <p style={{ marginBottom: "1.5rem" }}>{hasSectionInstruction}</p>
            </article>
          ) : (
            "."
          )}
        </article>
        <h4 style={{ marginBottom: "0.6rem" }}>Question</h4>
        <p>{currentQuestion}</p>

        <div className="options">
          <h4>Answers</h4>
          {Object.entries(currentOptions).map(([option, value], index) => (
            <div key={index} className="option">
              <input
                name="optionName"
                type="radio"
                value={option}
                checked={selectedOption === option}
                onChange={changeOption}
              />
              <label>{value}</label>
            </div>
          ))}
        </div>

        <div className="buttonsContainer">
          {/* <button
            onClick={previousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button> */}
          <button onClick={submitExam}>Submit exam</button>
          <button onClick={nextQuestion}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Cbt;
