import React from "react";
import Squat from "../../assets/squat.jpeg";
import card from "../../assets/card.webp";
import meditation from "../../assets/meditation 1.png";
import "./Hero.css";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const nav = useNavigate();
  return (
    <>
      <div className="hero-main">
        <div className="hero-bg">
          <div className="blue-ball">&nbsp;</div>
          <div className="pink-ball">&nbsp;</div>
          <div className="hero-text-1">
            <span>Workout</span>{" "}
            <span className="gradient-text">anytime, anywhere.</span>
            <br />
            <button
              className="get-started-btn cp"
              onClick={() => nav("/signup")}
              style={{
                backgroundImage: "linear-gradient(to right, blue, pink)",
              }}
            >
              Get Started &#8594;
            </button>
          </div>
          <img src={Squat} className="hero-img-1" />
        </div>
        <div style={{ marginTop: 50 }}>&nbsp;</div>
        <div className="free-bg">
          <img src={card} alt="Credit-card" className="hero-img-2" />
          <div className="hero-text-1">
            <span>Get gym like experience for </span>
            <br />
            <span className="gradient-text">Free.</span>
            <br />
          </div>
        </div>
        <div style={{ marginTop: 100 }}>&nbsp;</div>
        <div className="meditation-bg">
          <div className="blue-ball-2">&nbsp;</div>
          <div className="pink-ball-2">&nbsp;</div>
          <div className="hero-text-1">
            <span>There is no therepy better than </span>
            <br />
            <span className="gradient-text">Meditation.</span>
            <br />
          </div>
          <img src={meditation} alt="meditation" className="hero-img-1" />
        </div>
        <div style={{ marginTop: 100 }}>&nbsp;</div>
      </div>
    </>
  );
};

export default Hero;
