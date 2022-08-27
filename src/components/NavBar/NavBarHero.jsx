import React from "react";
import { useNavigate } from "react-router-dom";
import "./NavHero.css";

const NavBarHero = () => {
  const navigate = useNavigate();
  return (
    <div className="nav-main">
      <div className="nav-sec-main">
        <div className="title">HyperFit</div>
        <div className="components">
          <button className="login-nav-btn cp">
            <span onClick={() => navigate("/login")}>Login</span>
          </button>
          <button className="signup-nav-btn cp">
            <span onClick={() => navigate("/signup")}>SignUp</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBarHero;
