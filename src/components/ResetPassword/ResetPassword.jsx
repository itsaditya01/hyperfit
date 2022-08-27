import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const ResetPassword = () => {
  const host = "http://localhost:5000";

  const search = useLocation().search;
  const token = new URLSearchParams(search).get("token");
  const [success, setSuccess] = useState(false);
  const [mess, setMess] = useState("");
  const [newPass, setNewPass] = useState("");
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
        newpassword: newPass,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
      setSuccess(true);
      setMess(data.message);
    } else {
      setErr(true);

      setMess(data.message);
    }
  };

  return (
    <div className="form">
      <div className="form-container">
        <div className="header">
          <h1>Reset Password</h1>
        </div>
        <div style={{ marginTop: "5px", textAlign: "center" }}>
          {success ? <div style={{ color: "green" }}>{mess}</div> : ""}
          {err ? <div style={{ color: "red" }}>{mess}</div> : ""}
        </div>
        <div className="sign-up-container">
          <div>New assword</div>
          <div className="input-container">
            <input
              type="password"
              value={pass.password}
              onChange={(e) => {
                setPass({ ...pass, password: e.target.value });
                setNewPass(e.target.value);
              }}
            />
          </div>
          <div>Confirm new password</div>
          <div className="input-container">
            <input
              type="password"
              value={pass.cpass}
              onChange={(e) => setPass({ ...pass, cpass: e.target.value })}
            />
          </div>
        </div>
        <div style={{ height: "15px", marginTop: "5px", textAlign: "center" }}>
          {success.isSuccess ? (
            <div style={{ color: "green" }}>
              {success.SuccessMessage} + <a>Click here</a> to login with new
              password
            </div>
          ) : (
            ""
          )}
          {err.isError ? (
            <div style={{ color: "red" }}>{err.ErrMessage}</div>
          ) : (
            ""
          )}
        </div>
        <div style={{ textAlign: "center" }}>
          <button
            className="login-btn cp"
            onClick={() => {
              if (pass.password === pass.cpass) {
                resetPassword();
              } else {
                setErr(true);
                setMess(
                  "The text in password and confirm password do not match"
                );
              }
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
