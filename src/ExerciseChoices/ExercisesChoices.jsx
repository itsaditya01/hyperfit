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

const BenefitingArea = [
  "Hips and calves",
  "Core, butt, and legs",
  "Triceps, pectoral muscles, and shoulders",
  "Core, hips and low back",
];

const infoText = [
  "A squat is a strength exercise in which the trainee lowers their hips from a standing position and then stands back up. During the descent of a squat, the hip and knee joints flex while the ankle joint dorsiflexes; conversely the hip and knee joints extend and the ankle joint plantarflexes when standing up.",
  "A lunge can refer to any position of the human body where one leg is positioned forward with knee bent and foot flat on the ground while the other leg is positioned behind.",
  "Traditional pushups are beneficial for building upper body strength. They work the triceps, pectoral muscles, and shoulders. Using proper form, they can also strengthen the lower back and core by engaging (pulling in) the abdominal muscles.",
  "The leg raise is a strength training exercise which targets the iliopsoas (the anterior hip flexors). Because the abdominal muscles are used isometrically to stabilize the body during the motion, leg raises are also often used to strengthen the rectus abdominis muscle and the internal and external oblique muscles.",
];

const name = ["Squats", "Lunges", "Pushups", "Leg raise"];

const ExerciseChoices = () => {
  const context = useContext(UserContext);
  const [area, setArea] = useState("");
  const [aboutText, setAboutText] = useState("");
  const [notimg, setNotimg] = useState(false);
  const [ind, setInd] = useState();
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
    setNotimg(true);
    setCursorVariant("text");
    setPlay(true);
    setVid(exe_vid);
  };
  const textLeave = () => {
    setNotimg(false);
    setCursorVariant("default");
    setPlay(false);
  };

  return (
    <div className="exer_drop">
      <div className="wrapper">
        <div className="exer_container">
          <h1
            onMouseEnter={() => {
              textEnter(SquatsVid);
              setArea(BenefitingArea[0]);
              setAboutText(infoText[0]);
              setInd(name[0]);
            }}
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
            onMouseEnter={() => {
              textEnter(Lunges);
              setArea(BenefitingArea[1]);
              setAboutText(infoText[1]);
              setInd(name[1]);
            }}
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
            onMouseEnter={() => {
              textEnter(PushUp);
              setArea(BenefitingArea[2]);
              setAboutText(infoText[2]);
              setInd(name[2]);
            }}
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
            onMouseEnter={() => {
              textEnter(LegRaise);
              setArea(BenefitingArea[3]);
              setAboutText(infoText[3]);
              setInd(name[3]);
            }}
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

        {notimg ? (
          <div className="exercise_info">
            <h1>{ind}</h1>
            <br />
            <h2>
              Benefiting area: <br />
              {area}
            </h2>

            <br />
            <h4>{aboutText}</h4>
          </div>
        ) : (
          <img src={JustDoIt} style={{ width: 350, height: 480 }} />
        )}
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
      <div
        style={{
          color: "white",
          position: "absolute",
          right: 50,
          bottom: 35,
          fontSize: 30,
        }}
        onClick={() => navigate("/report")}
      >
        End Session &#8594;
      </div>
    </div>
  );
};

export default ExerciseChoices;
