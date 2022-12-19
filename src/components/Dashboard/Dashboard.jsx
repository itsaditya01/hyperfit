import React from "react";
import SideBar from "../SideBar/SideBar";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import Calendar from "../Calendar/Calendar";
import ChartComponent from "../ChartComponent/ChartComponent";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useState, useEffect } from "react";
import glass from "../../assets/glass.svg";
import ExerciseVid from "../../assets/mountain_climber.mp4";
import MeditationVid from "../../assets/meditation.mp4";
import squatsIll from "../../assets/squats-illustration.jpg";
import diet from "../../assets/diet.jpg";
import { UserContext } from "../Context/UserState";
import { useContext } from "react";

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

const App = ({ text, actual, total, water }) => {
  // useEffect(() => {
  //   const percentage = (actual / total) * 100;
  // }, [water]);

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
        {/* <ProgressProvider valueStart={0} valueEnd={valueEnd}>
          {(value) => ( */}
        <CircularProgressbar
          value={percentage}
          styles={buildStyles({
            pathTransitionDuration: 0.8,
            pathColor: `#1aa7ec`,
            textColor: "#f88",
            trailColor: "#d6d6d6",
          })}
        />
        {/* )} */}
        {/* </ProgressProvider> */}
      </div>
      <div style={{ fontSize: 14, textAlign: "center" }}>{text}</div>
    </div>
  );
};

const Dashboard = () => {
  const [water, setWater] = useState(0);
  const nav = useNavigate();
  const context = useContext(UserContext);
  const { getUser, user, weight, currentWeight } = context;
  const host = "http://localhost:5000";
  const [weightValue, setWeightValue] = useState("");

  const addWeight = async () => {
    //API call
    const response = await fetch(`${host}/api/storeweight`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("email"),
        weight: parseInt(weightValue),
      }),
    });
    const data = await response.json();
    console.log(data);
    setWeightValue("");
  };
  // const addHydration = async () => {
  //   //API call
  //   const response = await fetch(`${host}/api/storehydration`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email: localStorage.getItem("email"),
  //       weight: parseInt(water),
  //     }),
  //   });
  //   const data = await response.json();
  //   console.log(data);
  //   setWeightValue("");
  // };
  useEffect(() => {
    if (water === 0) {
      setWater(parseInt(localStorage.getItem("water")));
    } else {
      localStorage.setItem("water", water);
    }
  }, [water]);

  useEffect(() => {
    getUser();
    // console.log(weight);
  }, [currentWeight, weight]);

  const logout = async () => {
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("water");
    nav("/");
  };
  return (
    <div className="dash-main df fc">
      <div className="df jcsb aic">
        <h1 style={{ color: "white", textAlign: "left", fontSize: 42 }}>
          Hello, {localStorage.getItem("name")}
        </h1>
        <button
          className="cp"
          style={{
            background: "#3352e7",
            padding: "10px 20px",
            color: "white",
            fontSize: 18,
            borderRadius: 20,
          }}
          onClick={() => logout()}
        >
          Logout
        </button>
      </div>
      <div className="dash-grid df jcsa">
        <div className="row-1-dash df jcsa">
          <div className="Exercise">
            <div className="info-con">
              <h1 style={{ textAlign: "left" }}>Exercise</h1>
              <div onClick={() => nav("/temp")} className="cp startg">
                Start Grinding &#8594;
              </div>
            </div>
            <video src={ExerciseVid} className="bg-vid" />
          </div>
          <div className="meditation">
            <div className="info-con">
              <h1 style={{ textAlign: "left" }}>Meditate</h1>
              <div onClick={() => nav("/meditation")} className="cp startg">
                Start Meditation &#8594;
              </div>
            </div>
            <video
              src={MeditationVid}
              className="bg-vid"
              // defultmuted="true"
              // muted="true"
              // autoPlay
              // loop
            />
          </div>
          <div className="chart df">
            <div>
              <div className="month" style={{ width: "max-content" }}>
                <h1 style={{ textAlign: "left", marginBottom: 20 }}>
                  {monthNames[new Date().getMonth()]}
                </h1>
              </div>
              <ChartComponent />
            </div>
            <div className="add-weight df fc aic">
              <p>Update Weight</p>
              <input
                type="text"
                placeholder="Weight"
                style={{ color: "white" }}
                value={weightValue}
                onChange={(e) => setWeightValue(e.target.value)}
              />
              <button onClick={() => addWeight()}>Add</button>
            </div>
          </div>
        </div>
        <div className="row-2-dash df jcsa aic">
          <div className="water-con df jcc aic" style={{ marginLeft: 25 }}>
            <div className="df fc jcc aic">
              <App actual={water} total={8} water={water} />
              <button
                className="glass-btn"
                onClick={() => {
                  if (water <= 7) {
                    setWater(water + 1);
                  }
                }}
              >
                +
              </button>
            </div>
            <div style={{ color: "black", marginRight: 10 }}>
              <h1 style={{ textAlign: "center", fontSize: 22 }}>You've had</h1>
              <h1 style={{ textAlign: "center", fontSize: 52 }}>{water} / 8</h1>
              <p style={{ textAlign: "center" }}>Glasses of water today</p>
            </div>
          </div>
          <div className="report-con">
            <div className="report">
              <div className="info-con">
                <h1 style={{ textAlign: "left" }}>Summary</h1>
                <div onClick={() => nav("/report")} className="cp startg">
                  View Summary &#8594;
                </div>
              </div>
              <img src={squatsIll} className="bg-vid" />
            </div>
          </div>
          <div className="cur-weight df aic jcc fc">
            <h1 style={{ fontSize: 52 }}>{currentWeight}</h1>
            <br />
            <p>Current Weight</p>
          </div>
          <div className="goal-weight df aic jcc fc">
            <h1 style={{ fontSize: 52 }}> {user.goalWeight}</h1>
            <br />
            <p>Target Weight</p>
          </div>
          <div className="articles-dash">
            <div className="info-con">
              <h1 style={{ textAlign: "left" }}>Diet tips</h1>
              <a
                href="https://www.nhs.uk/live-well/eat-well/how-to-eat-a-balanced-diet/eight-tips-for-healthy-eating/"
                className="cp startg"
                target="_blank"
              >
                Articles on Healthy diet &#8594;
              </a>
            </div>
            <img src={diet} className="bg-vid" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
