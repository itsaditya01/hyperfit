import React from "react";
import SideBar from "../SideBar/SideBar";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserState";
import { useContext } from "react";

const Dashboard = () => {
  const context = useContext(UserContext);
  const { user } = context;
  console.log(user);
  const nav = useNavigate();
  return (
    <div className="dash-main">
      <h5 className="greet-user">Hello {user.name},</h5>
      <div className="dash-grid-contain">
        <div className="sidebar">
          <SideBar />
        </div>
        <div className="dash-grid">
          <div className="row-1">
            {/* <div className="total-calories"></div> */}
            {/* <div className="exercise">123</div> */}
            {/* <div className="meditation">123</div> */}
            <div className="Exercise">
              <h1>Exercise</h1>
              <div onClick={() => nav("/exercises")} className="cp startg">
                Start Grinding &#8594;
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
