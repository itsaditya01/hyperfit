import React from "react";
import "../styles.css";

function PersonalInfo({ formData, setFormData }) {
  return (
    <div className="personal-info-container">
      <div>Height</div>
      <div className="input-container">
        <input
          type="text"
          value={formData.height}
          onChange={(e) => {
            setFormData({ ...formData, height: e.target.value });
          }}
        />
      </div>
      <div>Weight</div>
      <div className="input-container">
        <input
          type="text"
          value={formData.weight}
          onChange={(e) => {
            setFormData({ ...formData, weight: e.target.value });
          }}
        />
      </div>
      <div>Age</div>
      <div className="input-container">
        <input
          type="text"
          value={formData.age}
          onChange={(e) => {
            setFormData({ ...formData, age: e.target.value });
          }}
        />
      </div>
      <div>Goal weight</div>
      <div className="input-container">
        <input
          type="text"
          value={formData.goalWeight}
          onChange={(e) => {
            setFormData({ ...formData, goalWeight: e.target.value });
          }}
        />
      </div>
    </div>
  );
}

export default PersonalInfo;
