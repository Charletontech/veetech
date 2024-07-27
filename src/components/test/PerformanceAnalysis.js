import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../home/Home.css";

const PerformanceAnalysis = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resultSheet } = location.state;

  const totalQuestions = resultSheet.noOfQuestions;
  const totalScore = resultSheet.totalScore;

  const percentageScore = ((totalScore / totalQuestions) * 100).toFixed(2);
  var remark = "Your performance.";
  if (percentageScore < 50) {
    remark = "Performance is below average. More work needs to be done!";
  }
  if (percentageScore >= 60 && percentageScore < 70) {
    remark = "Performance is good! keep it up.";
  }
  if (percentageScore >= 70) {
    remark = "Excellent! <br> You are a genius. Albert Einstein Junior!";
  }

  return (
    <div className="performance-analysis">
      <button
        className="circle-button"
        style={{ background: "var(--green" }}
        onClick={() => navigate("/screen2")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
        >
          <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
        </svg>
      </button>
      <h2 className="header">Examination result</h2>
      <p className="sub-header">
        {" "}
        <b>Remark:</b> <br /> {remark}{" "}
      </p>

      <div className="content">
        <div className="progress-circle">
          <svg viewBox="0 0 36 36" className="circular-chart green">
            <path
              style={{ background: "var(--bg" }}
              className="circle-bg"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="circle"
              strokeDasharray={`${percentageScore}, 100`}
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text x="18" y="20.35" className="percentage">
              {percentageScore}%
            </text>
          </svg>
        </div>

        <div className="breakdown">
          <p className="score-label">
            Your Score: {totalScore}/{totalQuestions}
          </p>
          <h3>General Breakdown</h3>
          {Object.entries(resultSheet.details).map(([subject, score]) => (
            <p key={subject}>
              <b style={{ textTransform: "capitalize" }}>{subject}:</b> {score}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalysis;

// import React from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// const PerformanceAnalysis = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { resultSheet } = location.state;
//   console.log(resultSheet);
//   return (
//     <div className="performance-analysis">
//       <button class="circle-button" onClick={() => navigate("/screen2")}>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           height="24px"
//           viewBox="0 -960 960 960"
//           width="24px"
//         >
//           <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
//         </svg>
//       </button>
//       <h2 className="header">See detailed analysis of your performance</h2>
//       <p className="sub-header">
//         You can see the topics you need to work on per subject and what you can
//         do to improve
//       </p>

//       <div className="content">
//         <div className="progress-circle">
//           <svg viewBox="0 0 36 36" className="circular-chart green">
//             <path
//               className="circle-bg"
//               d="M18 2.0845
//                 a 15.9155 15.9155 0 0 1 0 31.831
//                 a 15.9155 15.9155 0 0 1 0 -31.831"
//             />
//             <path
//               className="circle"
//               strokeDasharray="40, 100"
//               d="M18 2.0845
//                 a 15.9155 15.9155 0 0 1 0 31.831
//                 a 15.9155 15.9155 0 0 1 0 -31.831"
//             />
//             <text x="18" y="20.35" className="percentage">
//               40%
//             </text>
//           </svg>
//         </div>

//         <div className="breakdown">
//           <p className="score-label">Your Score: 165/250</p>
//           <h3>General Breakdown</h3>
//           <p>
//             <b>Mathematics:</b> 50
//           </p>
//           <p>
//             <b>English:</b> 26
//           </p>
//           <p>
//             <b>Physics:</b> 14
//           </p>
//           <p>
//             <b>Physics:</b> 14
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PerformanceAnalysis;
