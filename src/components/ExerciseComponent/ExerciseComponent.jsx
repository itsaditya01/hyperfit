import React from "react";
import "./ExerciseComponent.css";
import Mediapipe from "../Mediapipe/Mediapipe";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ExerciseComponent = () => {
  return (
    <div className="ec-main">
      <div className="ec-outer df fc">
        <div className="mediapipe-outer">
          <Mediapipe />
        </div>
        <div className="info-outer df">
          <div className="timer-outer df jcc aic">
            <h1>11 : 15</h1>
          </div>
          <div className="calory-counter df jcc aic">
            <div className="calory-outer">
              <CircularProgressbar percentage={66} text={"Calories Burned"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseComponent;
