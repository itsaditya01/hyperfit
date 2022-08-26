import React from "react";
import { useState } from "react";
import "../styles.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [mess, setMess] = useState("");
  return (
    <div>
      <h2>Forgot your password? Dont worry we got you</h2>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {mess === "" && (
        <button
          onClick={() => {
            setMess("Password reset link sent to your reset account");
          }}
        >
          Submit
        </button>
      )}
      {mess !== "" ? <p style={{ color: "green" }}>{mess}</p> : ""}
    </div>
  );
};

export default ForgotPassword;
