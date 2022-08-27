import React, { useState, useEffect } from "react";
import SignUpInfo from "./SignUpInfo";
import PersonalInfo from "./PersonalInfo";
import OtherInfo from "./OtherInfo";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import { useNavigate } from "react-router-dom";
import "./styles.css";

function Form() {
  const [page, setPage] = useState(0);
  const [err, setErr] = useState({ isError: false, ErrMessage: "" });
  const [success, setSuccess] = useState({
    isSucsess: false,
    SuccessMessage: "",
  });

  useEffect(() => {
    console.log(formData);
  }, []);

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

  const createUser = async () => {
    // e.preventDefault();
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
      localStorage.setItem("token", data.authtoken);
      setSuccess({
        isSuccess: true,
        SuccessMessage: "Verification link has been sent to your email account",
      });
    } else {
      setErr({ isError: true, ErrMessage: data.error });
    }
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
        <div className="header">
          <h1>{FormTitles[page]}</h1>
        </div>
        <div style={{ height: "15px", marginTop: "5px", textAlign: "center" }}>
          {success.isSuccess ? (
            <div style={{ color: "green", fontSize: "10px" }}>
              {success.SuccessMessage}
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
          <button
            className="next-btn cp"
            onClick={() => {
              if (page === FormTitles.length - 1) {
                createUser();
                console.log(formData);
              } else {
                setPage((currPage) => currPage + 1);
              }
            }}
          >
            {page === FormTitles.length - 1 ? "Submit" : "Next"}
          </button>
        </div>

        <p style={{ marginTop: "5px", textAlign: "center", fontSize: 18 }}>
          Already have an account ?{" "}
          <span
            className="cp gradient-text"
            style={{ fontWeight: 600 }}
            onClick={() => navigate("/login")}
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
}

export default Form;
