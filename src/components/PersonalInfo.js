import React from "react";
import "./styles.css";

function PersonalInfo({ formData, setFormData }) {
  return (
    <div className="personal-info-container">
      <input
        type="text"
        placeholder="Height"
        value={formData.height}
        onChange={(e) => {
          setFormData({ ...formData, height: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="Weight"
        value={formData.weight}
        onChange={(e) => {
          setFormData({ ...formData, weight: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="Age"
        value={formData.age}
        onChange={(e) => {
          setFormData({ ...formData, age: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="Enter your Goal weight?"
        value={formData.goalWeight}
        onChange={(e) => {
          setFormData({ ...formData, goalweight: e.target.value });
        }}
      />
    </div>
  );
}

export default PersonalInfo;
