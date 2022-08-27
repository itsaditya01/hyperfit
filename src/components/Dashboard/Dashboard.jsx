import React from "react";
import SideBar from "../SideBar/SideBar";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dash-main">
      <h5 className="greet-user">Hello Pratham,</h5>
      <div className="dash-grid-contain">
        <div className="sidebar">
          <SideBar />
        </div>
        <div className="dash-grid">
          <div className="row-1">
            <div className="total-calories"></div>
            <div className="exercise">123</div>
            <div className="meditation">123</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
