import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import "./ExercisesChoices.css";
import SquatsVid from "../assets/squats.mp4";
import Lunges from "../assets/lunges.mp4";
import PushUp from "../assets/pushup.mp4";
import LegRaise from "../assets/leg.mp4";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/Context/UserState";
import { useRef } from "react";
import Arrow from "../assets/arrow 1.png";
import JustDoIt from "../assets/just_do_it.png";

const ExerciseChoices = () => {
  const context = useContext(UserContext);
  const { setExerciseIndex } = context;
  const navigate = useNavigate(null);
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [play, setPlay] = useState(false);
  const [vid, setVid] = useState(SquatsVid);
  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
    },
    text: {
      height: 300,
      width: 300,
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      backgroundColor: "white",
      //   mixBlendMode: "difference",
    },
  };

  const textEnter = (exe_vid) => {
    setCursorVariant("text");
    setPlay(true);
    setVid(exe_vid);
  };
  const textLeave = () => {
    setCursorVariant("default");
    setPlay(false);
  };

  return (
    <div className="exer_drop">
      <div className="wrapper">
        <div className="exer_container">
          <h1
            onMouseEnter={() => textEnter(SquatsVid)}
            onMouseLeave={textLeave}
            className="exer_drop_title"
            onClick={() => {
              navigate("/exercises");
              setExerciseIndex(0);
            }}
          >
            Squat
            <img src={Arrow} className="arrow" />
          </h1>
          <h1
            onMouseEnter={() => textEnter(Lunges)}
            onMouseLeave={textLeave}
            className="exer_drop_title"
            onClick={() => {
              navigate("/exercises");
              setExerciseIndex(1);
            }}
          >
            Lunges
            <img src={Arrow} className="arrow" />
          </h1>
          <h1
            onMouseEnter={() => textEnter(PushUp)}
            onMouseLeave={textLeave}
            className="exer_drop_title"
            onClick={() => {
              navigate("/exercises");
              setExerciseIndex(2);
            }}
          >
            Pushups
            <img src={Arrow} className="arrow_new" />
          </h1>
          <h1
            onMouseEnter={() => textEnter(LegRaise)}
            onMouseLeave={textLeave}
            className="exer_drop_title"
            onClick={() => {
              navigate("/exercises");
              setExerciseIndex(3);
            }}
          >
            Leg Raises
            <img src={Arrow} className="arrow_new" />
          </h1>
        </div>
        {/* <img src={JustDoIt} />
         */}
        <div className="exercise_info">
          A squat is a strength exercise in which the trainee lowers their hips
          from a standing position and then stands back up. During the descent
          of a squat, the hip and knee joints flex while the ankle joint
          dorsiflexes; conversely the hip and knee joints extend and the ankle
          joint plantarflexes when standing up.
        </div>
      </div>
      <motion.div
        className="cursor"
        variants={variants}
        animate={cursorVariant}
        style={{
          backgroundColor: "white",
        }}
      >
        <video
          style={{
            height: 300,
            width: "auto",
            marginLeft: 50,
            visibility: !play && "hidden",
          }}
          src={vid}
          muted
          defaultmuted
          autoPlay
          loop
        />
      </motion.div>
    </div>
  );
};

export default ExerciseChoices;
