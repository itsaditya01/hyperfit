import React from "react";
import "./styles.css";

function SignUpInfo({ formData, setFormData }) {
  return (
    <div className="sign-up-container">
      <div>Name</div>
      <div className="input-container">
        <input
          type="text"
          value={formData.name}
          onChange={(event) =>
            setFormData({ ...formData, name: event.target.value })
          }
        />
      </div>
      <div>Email</div>
      <div className="input-container">
        <input
          type="email"
          value={formData.email}
          onChange={(event) =>
            setFormData({ ...formData, email: event.target.value })
          }
        />
      </div>
      <div>Password</div>
      <div className="input-container">
        <input
          type="password"
          value={formData.password}
          onChange={(event) =>
            setFormData({ ...formData, password: event.target.value })
          }
        />
      </div>
    </div>
  );
}

export default SignUpInfo;
