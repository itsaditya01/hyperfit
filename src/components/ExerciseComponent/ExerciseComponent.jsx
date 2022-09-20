import React, { useState } from "react";
import "./ExerciseComponent.css";
import Mediapipe from "../Mediapipe/Mediapipe";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useEffect } from "react";
import { getAngle, getAngleZ } from "../Logics";

var data = {
  count: 0,
  exercises: ["Squats", "PushUps"],
  curr_exercise: 0,
  guide_text: [
    "Welcome to todays workout session",
    "These AI lines will guide you about your posture",
    "Lines will turn green indicating great posture",
  ],
  curr_guide_cnt: 0,
};

const first = {
  x: 100,
  y: 100,
  score: 1,
};
const second = {
  x: 0,
  y: 0,
  score: 1,
};
const third = {
  x: 200,
  y: 0,
  score: 1,
};

const ExerciseComponent = () => {
  console.log("angle", getAngle(first, second, third));
  useEffect(() => {
    data.curr_exercise = 0;
    console.log("Messege", data.guide_text[data.curr_guide_cnt]);
  }, [data.curr_guide_cnt]);

  const [activeTab, setActiveTab] = useState("squat");
  return (
    <div className="ec-main">
      <div className="ec-outer df">
        <div className="mediapipe-outer">
          <Mediapipe data={data} />
        </div>
        <div className="info-outer df">
          <div className="timer-outer df jcc aic">
            <h1>11 : 15</h1>
          </div>
          <div className="calory-counter df jcc aic">
            <div className="calory-outer">
              <Example label="Calories burned">
                <CircularProgressbar value={66} text={`${66}%`} />
              </Example>
            </div>
          </div>
          <hr style={{ border: "2px solid #ddd" }} />
          <div className="exercise-tabs-wrapper df jcc fc">
            <div className="exercise-tab-title df jcc aic">
              <h2>Exercises</h2>
            </div>
            <div className="exercises-outer df jcc fc">
              <div
                className="exercise-tab"
                style={{
                  backgroundColor: activeTab !== "squat" ? "black" : "aqua",
                }}
                onClick={() => {
                  setActiveTab("squat");
                  data.curr_exercise = 0;
                }}
              >
                <h3
                  style={{
                    color: activeTab === "squat" ? "black" : "aqua",
                  }}
                >
                  Squat
                </h3>
              </div>
              <div
                className="exercise-tab"
                style={{
                  backgroundColor: activeTab !== "pushup" ? "black" : "aqua",
                }}
                onClick={() => {
                  setActiveTab("pushup");
                  data.curr_exercise = 1;
                }}
              >
                <h3
                  style={{
                    color: activeTab === "pushup" ? "black" : "aqua",
                  }}
                >
                  Pushup
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function Example(props) {
  return (
    <div style={{ marginBottom: 20 }}>
      <hr style={{ border: "2px solid #ddd" }} />
      <div
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "column-reverse",
        }}
      >
        <div style={{ width: "auto", height: "100px", padding: "0px 30%" }}>
          {props.children}
        </div>
        <div style={{ width: "100%", height: "50px", textAlign: "center" }}>
          <h3 className="h5">{props.label}</h3>
          <p>{props.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ExerciseComponent;
