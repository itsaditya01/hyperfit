import React, { useState } from "react";
import "./ExerciseComponent.css";
import Mediapipe from "../Mediapipe/Mediapipe";
import "react-circular-progressbar/dist/styles.css";
import { useEffect } from "react";
import Fire from "../../assets/fire.svg";
import { AnimatePresence, motion } from "framer-motion";

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
  curr_guide_text: "",
  partial_count: 0,
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

var perCalorie = [0.32, 0.36, 0.35, 0.6];
var name = ["squats", "pushups", "leg-raise", "lunges"];

const PopUp = ({ text }) => {
  return (
    <motion.div
      exit={{
        y: 100,
        opacity: 0,
        transition: {
          duration: 0.4,
          ease: "easeInOut",
        },
      }}
      className="pop-up-main"
    >
      <div className="pop-up-text">{text}</div>
    </motion.div>
  );
};

const ExerciseComponent = () => {
  const [count, setCount] = useState(0);
  const [guideText, setGuideText] = useState("");
  const [calories, setCalories] = useState(0);
  const [curr, setCurr] = useState(2);
  const [timerHour, setTimerHour] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(55);

  const setcount = (x) => {
    setCount(x);
  };
  useEffect(() => {
    const timer = setInterval(() => {
      let hour = timerHour;
      let minutes = timerMinutes;
      let seconds = timerSeconds;
      if (seconds === 59) {
        setTimerSeconds(0);
        minutes += 1;
      } else {
        setTimerSeconds(seconds + 1);
      }

      if (minutes >= 59) {
        hour += 1;
        setTimerMinutes(0);
      } else {
        setTimerMinutes(minutes);
      }
      setTimerHour(hour);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [timerSeconds]);
  const setguidetext = (message) => {
    setGuideText(message);
  };
  useEffect(() => {
    setCalories(count * 0.32);
  }, [guideText, count]);

  const [activeTab, setActiveTab] = useState("squat");
  return (
    <div className="ec-main">
      <div className="ec-outer df">
        <div className="mediapipe-outer">
          <Mediapipe
            data={data}
            setcount={setcount}
            setguidetext={setguidetext}
            curr={curr}
          />
        </div>
        <div className="info-outer df">
          <div className="counter-outer df jcc aic">
            <div className="timer-outer df jcc">
              <span>
                {timerHour < 10 ? "0" + timerHour : timerHour} :{" "}
                {timerMinutes < 10 ? "0" + timerMinutes : timerMinutes} :{" "}
                {timerSeconds < 10 ? "0" + timerSeconds : timerSeconds}
              </span>
            </div>
          </div>
          <div className="df row-2">
            <div className="reps-main">
              <div className="reps-outer df aic ">
                <div className="reps-count">{count}</div>
                <div className="reps-exercise" style={{ fontSize: 12 }}>
                  {name[curr]}
                </div>
              </div>
            </div>
            <div
              className="calory-outer df jcc aic fc"
              style={{ width: "50%" }}
            >
              <div className="calory df jcc aic">
                <p style={{ fontSize: 42, marginTop: 0 }}> {calories}</p>
                <img src={Fire} style={{ width: 52, height: 52 }} />
              </div>
              <div className="calory-text" style={{ fontSize: 12 }}>
                Calories burned
              </div>
            </div>
          </div>
          <div className="row-3">
            <img src="" alt="" />
          </div>
          <AnimatePresence>
            {guideText && <PopUp text={guideText} />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ExerciseComponent;
