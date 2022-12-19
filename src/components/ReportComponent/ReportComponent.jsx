import React, { useState, useEffect } from "react";
import "./ReportComponent.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Calendar from "../Calendar/Calendar";
import { UserContext } from "../Context/UserState";
import { useContext } from "react";
import squatIll from "../../assets/squat_ill.png";
import { useNavigate } from "react-router-dom";

const ProgressProvider = ({ valueStart, valueEnd, children }) => {
  const [value, setValue] = React.useState(valueStart);
  React.useEffect(() => {
    setValue(valueEnd);
  }, [valueEnd]);

  return children(value);
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

const ReportComponent = () => {
  const context = useContext(UserContext);
  const { exercise, meditation, fetchExercise, fetchMeditation, total } =
    context;
  console.log(exercise);
  const navigate = useNavigate(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    let objectDate = new Date();

    let day = objectDate.getDate();
    console.log(day); // 23

    let month = objectDate.getMonth() + 1;
    console.log(month + 1); // 8

    let year = objectDate.getFullYear();
    console.log(year); // 2022

    let datestr = year + "-" + month + "-" + day;

    console.log(datestr);
    fetchExercise(datestr);
    fetchMeditation(datestr);
    setWidth(width + 1);
  }, []);
  return (
    <div className="dash-main-report jcsa">
      <div className="dash-info-report df fc">
        <div style={{ fontSize: 30, margin: "0px 0px 10px 10px" }}>
          Workout Summary
        </div>
        <div className="dash-grid-report df jcsb fr">
          <div className="comp-exercise-info-all df fc">
            <div style={{ fontSize: 12 }}>Total duration of exercise</div>
            <div style={{ fontSize: 50 }}>
              {parseFloat(total.totalDuration).toFixed(2)}
            </div>
            <div style={{ fontSize: 16 }}>min/day</div>
          </div>
          <div className="comp-exercise-info-all df fc">
            <div style={{ fontSize: 12 }}>Total duration of meditation</div>
            <div style={{ fontSize: 50 }}>{meditation}</div>
            <div style={{ fontSize: 16 }}>min/day</div>
          </div>
          <div className="comp-exercise-info-all df fc">
            <div style={{ fontSize: 12 }}>Average duration of exercise</div>
            <div style={{ fontSize: 50 }}>
              {parseFloat(total.avgExerciseDuration).toFixed(2)}
            </div>
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
                  (total.totalRepsPerformed /
                    (total.totalRepsPerformed + total.totalPartialReps)) *
                    100
                )}
                %
              </div>
            </div>
            <div>
              <App
                total={total.totalRepsPerformed + total.totalPartialReps}
                actual={total.totalRepsPerformed}
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
              key={ex.date}
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
                  {parseInt(
                    (ex.repsPerformed / (ex.repsPerformed + ex.partialReps)) *
                      100
                  )}
                  %
                </div>
                <div style={{ fontSize: 16 }}>percentage</div>
              </div>
            </div>
          );
        })}
        <button className="return-btn" onClick={() => navigate("/dashboard")}>
          Return to Dashboard
        </button>
      </div>
      <div className="RightBar-report">
        <Calendar />
      </div>
    </div>
  );
};

export default ReportComponent;
