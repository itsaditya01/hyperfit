import React from "react";

function PersonalInfo({ formData, setFormData }) {
  return (
    <div className="personal-info-container">
      <div>Height</div>
      <input
        type="text"
        placeholder="Height"
        value={formData.height}
        onChange={(e) => {
          setFormData({ ...formData, height: e.target.value });
        }}
      />
      <div>Weight</div>
      <input
        type="text"
        placeholder="Weight"
        value={formData.weight}
        onChange={(e) => {
          setFormData({ ...formData, weight: e.target.value });
        }}
      />
      <div>Age</div>
      <input
        type="text"
        placeholder="Age"
        value={formData.age}
        onChange={(e) => {
          setFormData({ ...formData, age: e.target.value });
        }}
      />
      <div>Goal weight</div>
      <input
        type="text"
        placeholder="Goal weight"
        value={formData.goalWeight}
        onChange={(e) => {
          setFormData({ ...formData, goalWeight: e.target.value });
        }}
      />
    </div>
  );
}

export default PersonalInfo;
