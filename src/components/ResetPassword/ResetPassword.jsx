import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const ResetPassword = () => {
  const host = "http://localhost:5000";

  const search = useLocation().search;
  const token = new URLSearchParams(search).get("token");
  const [success, setSuccess] = useState(false);
  const [mess, setMess] = useState("");
  const [pass, setPass] = useState({
    password: "",
    cpass: "",
  });
  const [err, setErr] = useState(false);

  const resetPassword = async () => {
    const response = await fetch(`${host}/api/auth/resetpassword/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newpassword: pass,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
      setSuccess(true);
      setMess(data.message);
    } else {
      setErr(true);
      if (mess == "") {
        setMess(data.message);
      }
    }
  };

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
            setMess("The text in password and confirm password do not match");
          }
          resetPassword();
        }}
      >
        Submit
      </button>
      {success && <div>{mess}</div>}
      {err && <div>{mess}</div>}
    </div>
  );
};

export default ResetPassword;
