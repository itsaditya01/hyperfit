import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const host = "http://localhost:5000";
  const [mess, setMess] = useState("");
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState(false);

  const login = async (e) => {
    e.preventDefault();
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
    if (data.success) {
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("name", data.user.name);
      console.log(localStorage.getItem("email"));
      navigate("/dashboard");
    } else {
      setErr(true);
      setMess(data.message);
    }
  };

  return (
    <div className="form">
      <div className="form-container">
        <form method="POST" className="" onSubmit={login}>
          <div className="header">
            <h1 style={{ textAlign: "center" }}>Login</h1>
          </div>

          {err !== "" ? (
            <p style={{ color: "red", textAlign: "center" }}>{err}</p>
          ) : (
            ""
          )}
          <div className="sign-up-container">
            <div>Email</div>
            <div className="input-container">
              <input
                type="email"
                value={credentials.email}
                onChange={(e) => {
                  setCredentials({ ...credentials, email: e.target.value });
                }}
              />
            </div>
            <div>Password</div>
            <div className="input-container">
              <input
                type="password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
            </div>
          </div>
          {err && <div>{mess}</div>}
          <div style={{ textAlign: "center" }}>
            <input
              type="submit"
              className="login-btn cp"
              onClick={() => {
                login();
              }}
              value="Login"
            ></input>
          </div>
        </form>
        <p style={{ marginTop: "10px", textAlign: "center", fontSize: 18 }}>
          Forgot password ?{" "}
          <span
            className="cp gradient-text"
            style={{ fontWeight: 600 }}
            onClick={() => navigate("/forgotpass")}
          >
            click here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
