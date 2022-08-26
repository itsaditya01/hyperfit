import React from "react";

function SignUpInfo({ formData, setFormData }) {
  return (
    <div className="sign-up-container">
      <div className="input-container">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(event) =>
            setFormData({ ...formData, name: event.target.value })
          }
        />
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Email..."
          value={formData.email}
          onChange={(event) =>
            setFormData({ ...formData, email: event.target.value })
          }
        />
      </div>
      <div className="input-container">
        <input
          type="password"
          placeholder="Password..."
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
