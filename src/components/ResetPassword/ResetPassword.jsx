import React from "react";
import { useState } from "react";
import "../styles.css";

const ResetPassword = () => {
  const [pass, setPass] = useState({
    password: "",
    cpass: "",
  });
  const [err, setErr] = useState("");
  return (
    <div className="personal-info-container">
      <h2>Please enter your new password</h2>
      {err !== "" ? <p style={{ color: "red" }}>{err}</p> : ""}
      <input
        type="password"
        value={pass.password}
        onChange={(e) => setPass({ ...pass, password: e.target.value })}
      />
      <input
        type="password"
        value={pass.cpass}
        onChange={(e) => setPass({ ...pass, cpass: e.target.value })}
      />
      <button
        onClick={() => {
          if (pass.password === pass.cpass) {
            console.log("Okay");
          } else {
            setErr("The text in password and confirm password do not match");
          }
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default ResetPassword;
