import React from "react";
import SideBar from "../SideBar/SideBar";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserState";
import { useContext } from "react";
import Calendar from "../Calendar/Calendar";

const Dashboard = () => {
  const context = useContext(UserContext);
  const { user } = context;
  console.log(user);
  const nav = useNavigate();
  return (
    <div className="dash-main jcsa">
      <div className="dash-grid df jcsb">
        <div className="row-1">
          <div className="exercise-container">
            <div className="Exercise">
              <h1>Exercise</h1>
              <div onClick={() => nav("/exercises")} className="cp startg">
                Start Grinding &#8594;
              </div>
            </div>
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
