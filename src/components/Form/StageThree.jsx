import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "./FormContext";
import "../scss/stageThree.scss";

// ... (import statements)

export default function StageThree() {
  const navigate = useNavigate();
  const { formData, updateFormData, clearFormData } = useForm();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Redirect to StageOne if StageOne is not valid
    const isValidStageOne = validateStageOne();
    if (!isValidStageOne) {
      navigate("/stageOne");
    }

    // Redirect to StageTwo if StageTwo is not valid
    const isValidStageTwo = validateStageTwo();
    if (!isValidStageTwo) {
      navigate("/stageTwo");
    }
  }, [navigate]);

  const validateStageOne = () => {
    const storedFormData = JSON.parse(localStorage.getItem("formData"));
    return (
      storedFormData &&
      storedFormData.fullName &&
      storedFormData.dob &&
      storedFormData.nationality &&
      storedFormData.email &&
      storedFormData.phone
    );
  };

  const validateStageTwo = () => {
    const storedFormData = JSON.parse(localStorage.getItem("formData"));
    return (
      storedFormData &&
      storedFormData.departureDate &&
      storedFormData.returnDate &&
      storedFormData.accommodationPreference
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Additional validation based on health declaration
    if (formData.healthDeclaration === "yes") {
      if (
        formData.medicalConditions === undefined ||
        formData.medicalConditions.length < 3
      ) {
        alert("Medical conditions must be at least 3 characters");
        return;
      }
    }

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
              placeholder="Name - Phone number if available"
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
              placeholder="Type here..."
              className="form-field"
              id="medicalConditions"
              name="medicalConditions"
              value={formData.medicalConditions}
              onChange={(e) =>
                handleChange("medicalConditions", e.target.value)
              }
              disabled={formData.healthDeclaration === "no"}
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
