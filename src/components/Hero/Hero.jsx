import React from "react";
import Squat from "../../assets/squat.jpeg";
import "./Hero.css";

const Hero = () => {
  return (
    <>
      <div className="hero-main">
        <div className="blue-ball">&nbsp;</div>
        <div className="pink-ball">&nbsp;</div>
        <div className="hero-bg">
          <div className="hero-text-1">
            <span>Workout</span>{" "}
            <span className="gradient-text">anytime, anywhere.</span>
          </div>
          <img src={Squat} className="hero-img-1" />
        </div>
        <div className="temp">&nbsp;</div>
      </div>
    </>
  );
};

export default Hero;
