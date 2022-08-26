import React from "react";
import "./NavHero.css";

const NavBarHero = () => {
  return (
    <div className="nav-main">
      <div className="nav-sec-main">
        <div className="title">HyperFit</div>
        <div className="components">
          <button className="login-btn cp">
            <span>Login</span>
          </button>
          <button className="signup-btn cp">
            <span>SignUp</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBarHero;
