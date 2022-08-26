import React from "react";
import { useState } from "react";

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
    <div>
      <h2>Forgot your password? Dont worry we got you</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {mess === "" && (
        <button
          onClick={() => {
            forgetPassword();
          }}
        >
          Submit
        </button>
      )}
      {success ? <p style={{ color: "green" }}>{mess}</p> : ""}
      {err ? <p style={{ color: "green" }}>{mess}</p> : ""}
    </div>
  );
};

export default ForgotPassword;
