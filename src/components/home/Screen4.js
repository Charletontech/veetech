import React from "react";
import SetUpForm from "./SetUpForm";
import { useNavigate } from "react-router-dom";
const Screen4 = () => {
  const navigate = useNavigate();
  return (
    <div className="frame">
      <div className="screen4">
        <div className="screen4-hero">
          <div>
            <button class="circle-button" onClick={() => navigate("/screen3")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
              >
                <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
              </svg>
            </button>
            <h4>Set up exam</h4>
          </div>
        </div>

        <SetUpForm />
      </div>
    </div>
  );
};

export default Screen4;
