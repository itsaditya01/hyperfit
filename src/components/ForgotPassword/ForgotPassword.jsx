import React from "react";
import { useState } from "react";
import "../styles.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [mess, setMess] = useState("");
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);
  const host = "http://localhost:5000";

  const forgetPassword = async () => {
    const response = await fetch(`${host}/api/auth/forgetpassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    const data = await response.json();

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
        <div className="header" style={{ textAlign: "center" }}>
          <h3>Forgot your password?</h3> <h4>Don't worry we got you</h4>
        </div>
        <div className="sign-up-container" style={{ marginTop: "20px" }}>
          <div style={{ textAlign: "center" }}>
            Drop an email to get reset passwrd link
          </div>
          <div className="input-container">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        {success ? (
          <p style={{ color: "green", textAlign: "center" }}>{mess}</p>
        ) : (
          ""
        )}
        {err ? <p style={{ color: "red", textAlign: "center" }}>{mess}</p> : ""}
        <div style={{ textAlign: "center" }}>
          {mess === "" && (
            <button
              className="login-btn cp"
              onClick={() => {
                forgetPassword();
              }}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
