import React, { useRef, useState, useEffect } from "react";
import "./ReportComponent.css";
import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import squatImg from "../../assets/squats-illustration.jpg";
import "react-circular-progressbar/dist/styles.css";
import Calendar from "../Calendar/Calendar";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserState";
import { useContext } from "react";
import squatIll from "../../assets/squat_ill.png";
import pushupIll from "../../assets/pushup_ill.png";
import legraiseIll from "../../assets/legraise_ill.png";
import lungesIll from "../../assets/lunges_ill.png";

const avgDuration = [0.26, 0.1, 0.75, 0.2];

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

const App = ({ actual, total }) => {
  const percentage = parseInt((actual / total) * 100);
  return (
    <div>
      <div
        style={{
          padding: "20px 6px 20px 50px",
          width: 160,
          height: 160,
        }}
      >
        <ProgressProvider valueStart={0} valueEnd={percentage}>
          {(value) => (
            <CircularProgressbar
              value={value}
              text={`${percentage}%`}
              styles={buildStyles({
                pathColor: "black",
                backgroundColor: "transparent",
                pathTransitionDuration: 0.8,
                textColor: "black",
                trail: { stroke: "#ffeee2 " },
              })}
            />
          )}
        </ProgressProvider>
      </div>
    </div>
  );
};

let exercise1 = [
  {
    exerciseDuration: 0,
    exerciseId: 0,
    exerciseName: "squats",
    repsPerformed: 5,
    partialReps: 1,
    caloriesBurned: 1,
  },
  {
    exerciseDuration: 0,
    exerciseId: 1,
    exerciseName: "lunges",
    repsPerformed: 5,
    partialReps: 0,
    caloriesBurned: 3,
  },
  {
    exerciseDuration: 0,
    exerciseId: 2,
    exerciseName: "pushUps",
    repsPerformed: 5,
    partialReps: 0,
    caloriesBurned: 1,
  },

  {
    exerciseDuration: 0,
    exerciseId: 3,
    exerciseName: "legRaise",
    repsPerformed: 5,
    partialReps: 1,
    caloriesBurned: 1,
  },
];
const ReportComponent = () => {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const context = useContext(UserContext);
  const { exercise, meditation, fetchExercise, fetchMeditation } = context;
  console.log(exercise);
  const nav = useNavigate();
  const carousel = useRef();
  const [width, setWidth] = useState(0);
  const [total, setTotal] = useState({
    totalDuration: 0,
    totalRepsPerformed: 0,
    totalPartialReps: 0,
    totalCaloriesBurned: 0,
    cnt: 0,
    avgExerciseDuration: 0,
  });

  let first = () => {
    let totalDuration = 0,
      totalRepsPerformed = 0,
      totalPartialReps = 0,
      totalCaloriesBurned = 0,
      cnt = 0,
      avgExerciseDuration = 0;
    let exerciseDone = [0, 0, 0, 0];
    for (let i = 0; i < exercise.length; i++) {
      totalDuration += exercise[i].exerciseDuration;
      totalRepsPerformed += exercise[i].repsPerformed;
      totalPartialReps += exercise[i].partialReps;
      totalCaloriesBurned += exercise[i].caloriesBurned;
      exerciseDone[exercise[i].exerciseId]++;
    }
    for (let i = 0; i < 4; i++) {
      if (exerciseDone[i] > 0) {
        cnt++;
      }
    }
    console.log(cnt);
    avgExerciseDuration = totalDuration / cnt;
    setTotal({
      totalDuration,
      totalRepsPerformed,
      totalPartialReps,
      totalCaloriesBurned,
      cnt,
      avgExerciseDuration,
    });
    forceUpdate();
  };

  useEffect(() => {
    const temp = async () => {
      fetchExercise().then((data) => {
        first();
      });
      await fetchMeditation();
      setWidth(width + 1);
      // first();
    };
    temp();
  }, []);
  const percentage = 54;
  return (
    <div className="dash-main-report jcsa">
      <div className="dash-info-report df fc">
        <div style={{ fontSize: 30, margin: "0px 0px 10px 10px" }}>
          Workout Summary
        </div>
        <div className="dash-grid-report df jcsb fr">
          <div className="comp-exercise-info-all df fc">
            <div style={{ fontSize: 12 }}>Total duration of exercise</div>
            <div style={{ fontSize: 50 }}>{total.totalDuration}</div>
            <div style={{ fontSize: 16 }}>min/day</div>
          </div>
          <div className="comp-exercise-info-all df fc">
            <div style={{ fontSize: 12 }}>Total duration of meditation</div>
            <div style={{ fontSize: 50 }}>{meditation.meditationDuration}</div>
            <div style={{ fontSize: 16 }}>min/day</div>
          </div>
          <div className="comp-exercise-info-all df fc">
            <div style={{ fontSize: 12 }}>Average duration of exercise</div>
            <div style={{ fontSize: 50 }}>{total.avgExerciseDuration}</div>
            <div style={{ fontSize: 16 }}>min/exercise</div>
          </div>
        </div>
        <div className="info-progressbars df fr jcsb">
          <div className="info-progressbar df fr ">
            <div className="text-info-report df fc jcc">
              <div style={{ fontSize: 28 }}>Exercise</div>
              <div style={{ fontSize: 11, marginBottom: 5, width: 176 }}>
                Total exercise performed today
              </div>
              <div style={{ fontSize: 38 }}>{total.cnt}/4</div>
            </div>
            <div>
              <App total={4} actual={total.cnt} />
            </div>
          </div>
          <div className="info-progressbar first-bar df fr">
            <div className="text-info-report df fc jcc">
              <div style={{ fontSize: 28 }}>Calory</div>
              <div style={{ fontSize: 11, marginBottom: 5, width: 176 }}>
                Total calories burned today
              </div>
              <div style={{ fontSize: 38 }}>
                {parseFloat(total.totalCaloriesBurned).toFixed(1)}
              </div>
            </div>
            <div>
              <App total={500} actual={300} />
            </div>
          </div>
        </div>
        <div className="info-progressbars df fr jcsb">
          <div className="info-progressbar second-bar df fr ">
            <div className="text-info-report df fc jcc">
              <div style={{ fontSize: 28 }}>Accuracy</div>
              <div style={{ fontSize: 11, marginBottom: 5, width: 176 }}>
                Accuracy of exercise performed today
              </div>
              <div style={{ fontSize: 38 }}>
                {parseInt(
                  (total.totalPartialReps / total.totalRepsPerformed) * 100
                )}
                %
              </div>
            </div>
            <div>
              <App
                total={total.totalRepsPerformed}
                actual={total.totalPartialReps}
              />
            </div>
          </div>
          <div className="info-progressbar third-bar df fr">
            <div className="text-info-report df fc jcc">
              <div style={{ fontSize: 28 }}>Efficiency</div>
              <div style={{ fontSize: 11, marginBottom: 5, width: 176 }}>
                Efficiency of exercise performed today
              </div>
              <div style={{ fontSize: 38 }}>80%</div>
            </div>
            <div>
              <App total={10} actual={8} />
            </div>
          </div>
        </div>
        {exercise.map((ex) => {
          return (
            <div
              className="dash-grid-report df jcsb fr"
              style={{ marginTop: 20 }}
            >
              <div style={{ position: "relative" }}>
                <img
                  src={squatIll}
                  alt=""
                  style={{ width: 150, overflow: "visible" }}
                />
                <div
                  style={{
                    fontSize: 20,
                    position: "absolute",
                    bottom: "5%",
                    color: "black",
                    zIndex: 99,
                    left: "25%",
                  }}
                >
                  {ex.exerciseName}
                </div>
              </div>
              <div className="comp-exercise-info-all df fc">
                <div style={{ fontSize: 12 }}>Duration of exercise</div>
                <div style={{ fontSize: 50 }}>{ex.exerciseDuration}</div>
                <div style={{ fontSize: 16 }}>min/day</div>
              </div>
              <div className="comp-exercise-info-all df fc">
                <div style={{ fontSize: 12 }}>Reps performed</div>
                <div style={{ fontSize: 50 }}>{ex.repsPerformed}</div>
                <div style={{ fontSize: 16 }}>reps</div>
              </div>
              <div className="comp-exercise-info-all df fc">
                <div style={{ fontSize: 12 }}>Partial reps performed</div>
                <div style={{ fontSize: 50 }}>{ex.partialReps}</div>
                <div style={{ fontSize: 16 }}>reps</div>
              </div>
              <div className="comp-exercise-info-all df fc">
                <div style={{ fontSize: 12 }}>calories burned</div>
                <div style={{ fontSize: 50 }}>
                  {parseFloat(ex.caloriesBurned).toFixed(1)}
                </div>
                <div style={{ fontSize: 16 }}>cal/day</div>
              </div>
              <div className="comp-exercise-info-all df fc">
                <div style={{ fontSize: 12 }}>Accuracy achieved</div>
                <div style={{ fontSize: 50 }}>
                  {parseInt((ex.partialReps / ex.repsPerformed) * 100)}%
                </div>
                <div style={{ fontSize: 16 }}>percentage</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="RightBar-report">
        <Calendar />
      </div>
    </div>
  );
};

export default ReportComponent;
// <div className="report-outer df aic jcc">
//   <div className="report-inner df fc">
//     <div className="report-all df">
//       <App text="Exercises performed" total={4} actual={3} />
//       <App text="Accuracy" total={4} actual={3} />
//       <App text="Efficiency" total={4} actual={3} />
//       <App text="Total calories burned" total={4} actual={3} />
//     </div>
//     <div className="report-individual">
//       <div className="exercise-report-outer">
//         <div className="exercise-report-inner">
//           <motion.div className="outer-carousel" ref={carousel}>
//             <motion.div
//               drag="x"
//               dragConstraints={{ right: 0, left: -(width + 15) }}
//               className="row-3 df"
//             >
//               {completed.map((val, key) => (
//                 <ExerciseInfo
//                   name={val.name}
//                   // key={key}
//                   idealTime={val.idealTime}
//                   time={val.time}
//                   exe_img={val.exe_img}
//                   sets={val.sets}
//                   reps={val.reps}
//                 />
//               ))}
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
