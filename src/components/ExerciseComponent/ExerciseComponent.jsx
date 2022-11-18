import React, { useState, useContext } from "react";
import "./ExerciseComponent.css";
import Mediapipe from "../Mediapipe/Mediapipe";
import "react-circular-progressbar/dist/styles.css";
import { useEffect } from "react";
import Fire from "../../assets/fire.svg";
import { AnimatePresence, motion } from "framer-motion";
import squatImg from "../../assets/squats-illustration.jpg";
import { useRef } from "react";
import { UserContext } from "../Context/UserState";
import { useNavigate } from "react-router-dom";
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

const completed = [
  {
    name: "Squats",
    sets: 1,
    reps: 0,
    time: "1 min 20s",
    idealTime: "1 min",
    exe_img: squatImg,
  },
  {
    name: "Squats",
    sets: 1,
    reps: 0,
    time: "1 min 20s",
    idealTime: "1 min",
    exe_img: squatImg,
  },
];

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
var name = ["squats", "lunges", "pushUps", "leg-raise"];

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

const ExerciseInfo = ({ name, time, idealTime, exe_img, sets, reps }) => {
  return (
    <div className="info-main df aic jcsb">
      <div className="exe-img">
        <img src={exe_img} />
      </div>
      <div className="exerciseInfo df fc">
        <div className="exe-name">{name}</div>
        <div className="info-row-1">
          <div className="sets"> Sets: {sets}</div>
          <br />
          <div className="reps">Reps: {reps}</div>
          <br />
        </div>
        <div className="info-row-2">
          <div className="time">
            Timer taken: <br /> {time}
          </div>
          <br />
          <div className="idealTime">
            IDeal time: <br />
            {idealTime}
          </div>
        </div>
      </div>
    </div>
  );
};

const ExerciseComponent = () => {
  const context = useContext(UserContext);
  const { exerciseIndex } = context;
  const [count, setCount] = useState(0);
  const [guideText, setGuideText] = useState("");
  const [calories, setCalories] = useState(0);
  const [curr, setCurr] = useState(0);
  const [timerHour, setTimerHour] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const navigate = useNavigate(null);

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
    setCalories(count * perCalorie[curr]);
  }, [guideText, count]);

  const carousel = useRef();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);

  const changeExercise = () => {
    setCurr((num) => num + 1);
  };

  return (
    <div className="ec-main">
      <div className="ec-outer df">
        <div className="mediapipe-outer">
          <Mediapipe
            data={data}
            setcount={setcount}
            changeExercise={changeExercise}
            setguidetext={setguidetext}
            curr={exerciseIndex}
          />
        </div>
        <div className="info-outer df jcc aic">
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
                  {name[exerciseIndex]}
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
          <motion.div className="outer-carousel" ref={carousel}>
            <motion.div
              drag="x"
              dragConstraints={{ right: 0, left: -(width + 15) }}
              className="row-3 df"
            >
              {completed.map((val, key) => (
                <ExerciseInfo
                  name={val.name}
                  // key={key}
                  idealTime={val.idealTime}
                  time={val.time}
                  exe_img={val.exe_img}
                  sets={val.sets}
                  reps={val.reps}
                />
              ))}
            </motion.div>
          </motion.div>
          <AnimatePresence>
            {guideText && <PopUp text={guideText} />}
          </AnimatePresence>
          <button
            style={{ borderRadius: "1rem" }}
            className="end-exercise"
            onClick={() => navigate("/temp")}
          >
            End exercise
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExerciseComponent;
