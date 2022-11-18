import React, { useRef, useState, useEffect } from "react";
import "./ReportComponent.css";
import { motion } from "framer-motion";
import { CircularProgressbar } from "react-circular-progressbar";
import squatImg from "../../assets/squats-illustration.jpg";
import "react-circular-progressbar/dist/styles.css";

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

const ProgressProvider = ({ valueStart, valueEnd, children }) => {
  const [value, setValue] = React.useState(valueStart);
  React.useEffect(() => {
    setValue(valueEnd);
  }, [valueEnd]);

  return children(value);
};

const ExerciseInfo = ({ name, time, idealTime, exe_img, sets, reps }) => {
  return (
    <div className="info-main df aic jcsb">
      <div className="exe-img">
        <img src={exe_img} />
      </div>
      <div className="exerciseInfo df fc" style={{ textSize: 12 }}>
        <div className="exe-name">{name}</div>
        <div className="info-row-1" style={{ marginBottom: 5 }}>
          <div className="sets tc"> Sets: {sets}</div>
          <br />
          <div className="reps tc">Reps: {reps}</div>
          <br />
        </div>
        <div className="info-row-2">
          <div className="time tc">
            Time taken: <br /> {time}
          </div>
          <br />
          <div className="idealTime tc">
            IDeal time: <br />
            {idealTime}
          </div>
        </div>
      </div>
    </div>
  );
};

const App = ({ text, actual, total }) => {
  const percentage = (actual / total) * 100;
  const [valueEnd, setValueEnd] = React.useState(percentage);
  return (
    <div>
      <div
        style={{
          padding: "40px 20px 0px",
          width: 200,
          height: 200,
        }}
      >
        <ProgressProvider valueStart={0} valueEnd={valueEnd}>
          {(value) => (
            <CircularProgressbar value={value} text={`${actual}/${total}`} />
          )}
        </ProgressProvider>
      </div>
      <div style={{ fontSize: 14, textAlign: "center" }}>{text}</div>
    </div>
  );
};

const ReportComponent = () => {
  const carousel = useRef();
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);
  const percentage = 54;
  return (
    <div className="report-outer df aic jcc">
      <div className="report-inner df fc">
        <div className="report-all df">
          <App text="Exercises performed" total={4} actual={3} />
          <App text="Accuracy" total={4} actual={3} />
          <App text="Efficiency" total={4} actual={3} />
          <App text="Total calories burned" total={4} actual={3} />
        </div>
        <div className="report-individual">
          <div className="exercise-report-outer">
            <div className="exercise-report-inner">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportComponent;
