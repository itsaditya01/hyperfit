import React, { useState, useEffect } from "react";
import SignUpInfo from "./SignUpInfo";
import PersonalInfo from "./PersonalInfo";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import "./Signup.css";

function Signup() {
  const [loader, setLoader] = useState(false);
  const [text, setText] = useState("");
  const [page, setPage] = useState(0);
  const [err, setErr] = useState({ isError: false, ErrMessage: "" });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    console.log(formData);
  }, []);

  useEffect(() => {
    console.log(loader);
    return () => {};
  }, [loader]);

  const host = "http://localhost:5000";
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    weight: "",
    height: "",
    age: "",
    goalWeight: "",
  });

  const createUser = async (e) => {
    e.preventDefault();
    setLoader(true);
    const { name, email, password, weight, height, age, goalWeight } = formData;
    const response = await fetch(`${host}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        weight: parseInt(weight),
        height: parseInt(height),
        age: parseInt(age),
        goalWeight: parseInt(goalWeight),
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("name", data.user.name);
      setLoader(false);
      setSuccess(true);
    } else {
      setLoader(false);
      setErr({ isError: true, ErrMessage: data.message });
    }
    console.log(loader);
  };

  const FormTitles = ["Sign Up", "Sign Up"];

  const PageDisplay = () => {
    if (page === 0) {
      return <SignUpInfo formData={formData} setFormData={setFormData} />;
    } else {
      return <PersonalInfo formData={formData} setFormData={setFormData} />;
    }
  };

  return (
    <div className="form">
      <div className="form-container">
        {loader ? (
          <div style={{ height: 497 }} className="df aic jcc">
            <div className="spinner df"></div>
          </div>
        ) : success ? (
          <div style={{ height: 497 }} className="df aic jcc fc">
            <div className="df jcc ">
              <h2 style={{ textAlign: "center" }}>
                Registration is completed successfully
              </h2>
            </div>
            <div className="df jcc aic">
              <p
                onClick={() => navigate("/dashboard")}
                style={{ color: "green", cursor: "pointer" }}
              >
                Click here
              </p>
              <p style={{ marginLeft: 4 }}>to go to dashboard.</p>
            </div>
          </div>
        ) : err.isError ? (
          <div style={{ height: 497 }} className="df aic jcc fc">
            <div className="df jcc ">
              <h2 style={{ textAlign: "center" }}>{err.ErrMessage}</h2>
            </div>
            <div className="df jcc aic">
              <p
                onClick={() => window.location.reload()}
                style={{ color: "red", cursor: "pointer" }}
              >
                Click here
              </p>
              <p style={{ marginLeft: 4 }}> to try again.</p>
            </div>
          </div>
        ) : (
          <form method="POST" className="" onSubmit={createUser}>
            <div className="header">
              <h1 style={{ textAlign: "center" }}>{FormTitles[page]}</h1>
            </div>
            <div
              style={{
                height: "15px",
                marginTop: "5px",
                textAlign: "center",
              }}
            ></div>
            <div className="body">{PageDisplay()}</div>
            <div className="footer">
              <button
                disabled={page === 0}
                onClick={() => {
                  setPage((currPage) => currPage - 1);
                }}
                className="prev-btn cp"
              >
                Previous
              </button>
              {page === FormTitles.length - 1 ? (
                <input
                  type="submit"
                  className="next-btn cp"
                  value="Submit"
                ></input>
              ) : (
                <button
                  className="next-btn cp"
                  onClick={() => {
                    setPage((currPage) => currPage + 1);
                  }}
                >
                  Next
                </button>
              )}
            </div>

            <p style={{ marginTop: "10px", textAlign: "center", fontSize: 18 }}>
              Already have an account ?{" "}
              <span
                className="cp gradient-text"
                style={{ fontWeight: 600 }}
                onClick={() => navigate("/login")}
              >
                Log In
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default Signup;
