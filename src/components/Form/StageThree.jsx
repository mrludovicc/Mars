import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "./FormContext";
import "../scss/stageThree.scss";

export default function StageThree() {
  const navigate = useNavigate();
  const { formData, updateFormData, clearFormData } = useForm();
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.clear();
    setShowPopup(true);
  };

  const handleStartOver = () => {
    clearFormData();
    setShowPopup(false);
    navigate("/");
  };

  const handleChange = (name, value) => {
    updateFormData({ ...formData, [name]: value });
  };
  return (
    <>
      <div className="stage-three">
        <div className="bg-img"></div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h2>Health and Safety</h2>
            <label htmlFor="healthDeclaration">Health Declaration</label>
            <select
              className="form-field"
              id="healthDeclaration"
              name="healthDeclaration"
              value={formData.healthDeclaration}
              onChange={(e) =>
                handleChange("healthDeclaration", e.target.value)
              }
              required
            >
              <option value="">Select...</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            <label htmlFor="emergencyContact">
              Emergency Contact Information
            </label>
            <input
              className="form-field"
              type="text"
              id="emergencyContact"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={(e) => handleChange("emergencyContact", e.target.value)}
              required
            />

            <label htmlFor="medicalConditions">
              Any Medical Conditions (if applicable)
            </label>
            <textarea
              className="form-field"
              id="medicalConditions"
              name="medicalConditions"
              value={formData.medicalConditions}
              onChange={(e) =>
                handleChange("medicalConditions", e.target.value)
              }
            ></textarea>

            <button type="submit">Submit</button>
          </form>
        </div>

        {showPopup && (
          <div className="popup">
            <p>Application submitted successfully!</p>
            <button onClick={handleStartOver}>Start Over</button>
          </div>
        )}
      </div>
    </>
  );
}
