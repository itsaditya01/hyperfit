import React, { useState } from "react";
import SignUpInfo from "./SignUpInfo";
import PersonalInfo from "./PersonalInfo";
import OtherInfo from "./OtherInfo";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import { useNavigate } from "react-router-dom";
import "./styles.css";

function Form() {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    weight: "",
    height: "",
    age: "",
    goalWeight: "",
  });

  const FormTitles = ["Sign Up", "Personal Info"];

  const PageDisplay = () => {
    if (page === 0) {
      return <SignUpInfo formData={formData} setFormData={setFormData} />;
    } else {
      return <PersonalInfo formData={formData} setFormData={setFormData} />;
    }
  };
  const navigate = useNavigate();
  return (
    <div className="form">
      <div className="form-container">
        <div className="header">
          <h1>{FormTitles[page]}</h1>
        </div>
        <div className="body">{PageDisplay()}</div>
        <div className="footer">
          <button
            disabled={page === 0}
            onClick={() => {
              setPage((currPage) => currPage - 1);
            }}
          >
            Prev
          </button>
          <button
            onClick={() => {
              if (page === FormTitles.length - 1) {
                alert("FORM SUBMITTED");
                console.log(formData);
              } else {
                setPage((currPage) => currPage + 1);
              }
            }}
          >
            {page === FormTitles.length - 1 ? "Submit" : "Next"}
          </button>
        </div>

        <button
          className="forgot-pass cp"
          style={{
            background: "pink",
            width: "50%",
            margin: "auto",
            border: "none",
          }}
          onClick={() => navigate("/forgotpass")}
        >
          Forgot Password
        </button>
      </div>
    </div>
  );
}

export default Form;
