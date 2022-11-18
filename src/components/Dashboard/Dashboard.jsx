import React from "react";
import SideBar from "../SideBar/SideBar";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserState";
import { useContext } from "react";
import Calendar from "../Calendar/Calendar";
import ChartComponent from "../ChartComponent/ChartComponent";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useState, useEffect } from "react";
import glass from "../../assets/glass.svg";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const ProgressProvider = ({ valueStart, valueEnd, children }) => {
  const [value, setValue] = React.useState(valueStart);
  React.useEffect(() => {
    setValue(valueEnd);
  }, [valueEnd]);

  return children(value);
};

const App = ({ text, actual, total }) => {
  const percentage = (actual / total) * 100;
  const [valueEnd, setValueEnd] = React.useState(percentage);
  return (
    <div>
      <div
        style={{
          width: 130,
          height: 130,
          position: "relative",
          background: "white",
          borderRadius: 30,
          padding: 20,
        }}
      >
        <img
          src={glass}
          style={{ position: "absolute", top: 40, left: 50, width: 32 }}
        />
        <ProgressProvider valueStart={0} valueEnd={valueEnd}>
          {(value) => (
            <CircularProgressbar
              value={value}
              styles={buildStyles({
                pathTransitionDuration: 0.8,
                pathColor: `#1aa7ec`,
                textColor: "#f88",
                trailColor: "#d6d6d6",
              })}
            />
          )}
        </ProgressProvider>
      </div>
      <div style={{ fontSize: 14, textAlign: "center" }}>{text}</div>
    </div>
  );
};

const Dashboard = () => {
  const context = useContext(UserContext);
  const { user } = context;
  const [water, setWater] = useState(0);
  const nav = useNavigate();
  useEffect(() => {
    console.log(water);
  }, [water]);

  return (
    <div className="dash-main jcsa">
      <div className="dash-grid df jcsb">
        <div className="row-1 df jcsa fdc">
          <div className="exercise-container">
            <div className="Exercise">
              <h1>Exercise</h1>
              <div onClick={() => nav("/exercises")} className="cp startg">
                Start Grinding &#8594;
              </div>
            </div>
            <div className="meditation">
              <h1>Meditate</h1>
              <div onClick={() => nav("/exercises")} className="cp startg">
                Start Meditation &#8594;
              </div>
            </div>
          </div>
          <div className="chart">
            <div className="month">
              <h1 style={{ textAlign: "left", marginBottom: 20 }}>
                {monthNames[new Date().getMonth()]}
              </h1>
            </div>
            <ChartComponent />
          </div>
        </div>
        <div className="row-2 df jcc">
          <div className="water-con df fc jcc aic">
            <App actual={water} total={8} />
            <button
              className="glass-btn"
              onClick={() => setWater((water) => water + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="RightBar">
        <Calendar />
      </div>
    </div>
  );
};

export default Dashboard;
