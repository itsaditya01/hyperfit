import React, { useState } from "react";
import "./ExerciseComponent.css";
import Mediapipe from "../Mediapipe/Mediapipe";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ExerciseComponent = () => {
  const [activeTab, setActiveTab] = useState("squat");
  return (
    <div className="ec-main">
      <div className="ec-outer df">
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
          <div className="exercise-tabs-wrapper df jcc">
            <div className="exercises-outer df jcc fc">
              <div
                className="exercise-tab"
                style={{
                  backgroundColor: activeTab === "squat" ? "black" : "aqua",
                }}
                onClick={() => setActiveTab("squat")}
              >
                <h2
                  style={{
                    color: activeTab !== "squat" ? "black" : "aqua",
                  }}
                >
                  Squat
                </h2>
              </div>
              <div
                className="exercise-tab"
                style={{
                  backgroundColor: activeTab === "pushup" ? "black" : "aqua",
                }}
                onClick={() => setActiveTab("pushup")}
              >
                <h2
                  style={{
                    color: activeTab !== "pushup" ? "black" : "aqua",
                  }}
                >
                  Pushup
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseComponent;
