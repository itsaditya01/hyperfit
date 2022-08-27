import React from "react";
import home from "../../assets/home.svg";
import meditation from "../../assets/meditation.svg";
import report from "../../assets/report.svg";
import "./SideBar.css";

const SideBar = () => {
  return (
    <div>
      <div className="icon-col">
        <div className="home-icon-div">
          &nbsp;
          <img src={home} className="home-icon cp" />
        </div>
        <div className="meditation-icon-div">
          &nbsp;
          <img src={meditation} className="meditation-icon cp" />
        </div>
        <div className="report-icon-div">
          &nbsp;
          <img src={report} className="report-icon cp" />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
