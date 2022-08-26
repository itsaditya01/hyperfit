import React from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const Login = () => {
  const host = "http://localhost:5000";
  const [mess, setMess] = useState("");

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState(false);

  const login = async () => {
    const { email, password } = credentials;
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
      Navigate("/hero");
    } else {
      setErr(true);
      setMess(data.message);
    }
  };

  return (
    <div className="personal-info-container">
      <h2>Please enter your new password</h2>
      {err !== "" ? <p style={{ color: "red" }}>{err}</p> : ""}
      <input
        type="email"
        value={credentials.email}
        onChange={(e) => {
          setCredentials({ ...credentials, email: e.target.value });
        }}
      />
      <input
        type="password"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <button
        onClick={() => {
          login();
        }}
      >
        login
      </button>
      {err && <div>{mess}</div>}
    </div>
  );
};

export default Login;
