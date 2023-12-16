import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "./FormContext";
import "../scss/stageTwo.scss";

export default function StageTwo() {
  const navigate = useNavigate();
  const { formData, updateFormData } = useForm();
  const [formErrors, setFormErrors] = useState({
    departureDate: "",
    returnDate: "",
    accommodationPreference: "",
    specialRequests: "",
  });

  useEffect(() => {
    // Redirect to StageOne if StageOne is not valid
    const isValidStageOne = validateStageOne();
    if (!isValidStageOne) {
      navigate("/stageOne");
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

  const validateForm = () => {
    let isValid = true;
    const errors = {
      departureDate: "",
      returnDate: "",
      accommodationPreference: "",
      specialRequests: "",
    };

    // Check if departureDate is empty
    if (!formData.departureDate) {
      errors.departureDate = "Please enter the departure date";
      isValid = false;
    } else if (new Date(formData.departureDate) <= new Date()) {
      errors.departureDate = "Departure date must be in the future";
      isValid = false;
    }

    // Check if returnDate is empty
    if (!formData.returnDate) {
      errors.returnDate = "Please enter the return date";
      isValid = false;
    } else if (
      new Date(formData.returnDate) <= new Date(formData.departureDate)
    ) {
      errors.returnDate =
        "Return date must be after 3 days of the departure date";
      isValid = false;
    } else if (
      new Date(formData.returnDate) <
      new Date(formData.departureDate).setDate(
        new Date(formData.departureDate).getDate() + 3
      )
    ) {
      errors.returnDate = "Return date must be at least 3 days after departure";
      isValid = false;
    }

    if (!formData.accommodationPreference) {
      errors.accommodationPreference =
        "Please select your accommodation preference";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      // Update the form data
      updateFormData(formData);
      // Redirect to StageThree
      navigate("/stageThree");
    }
  };

  const handleChange = (name, value) => {
    updateFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div className="stage-two">
        <div className="bg-img"></div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h2>Travel Preferences</h2>
            <label htmlFor="departureDate">Departure Date</label>
            <input
              placeholder="Select date"
              className="form-field"
              type="date"
              id="departureDate"
              name="departureDate"
              value={formData.departureDate}
              onChange={(e) => handleChange("departureDate", e.target.value)}
              required
            />
            <span className="error">{formErrors.departureDate}</span>

            <label className="form-field" htmlFor="returnDate">
              Return Date
            </label>
            <input
              placeholder="Select date"
              className="form-field"
              type="date"
              id="returnDate"
              name="returnDate"
              value={formData.returnDate}
              onChange={(e) => handleChange("returnDate", e.target.value)}
              required
            />
            <span className="error">{formErrors.returnDate}</span>

            <label htmlFor="accommodationPreference">
              Accommodation Preference
            </label>
            <select
              className="form-field"
              id="accommodationPreference"
              name="accommodationPreference"
              value={formData.accommodationPreference}
              onChange={(e) =>
                handleChange("accommodationPreference", e.target.value)
              }
              required
            >
              <option value="">Select...</option>
              <option value="spaceHotel">Space Hotel</option>
              <option value="martianBase">Martian Base</option>
              <option value="martianBubbles">Martian Bubbles</option>
            </select>
            <span className="error">{formErrors.accommodationPreference}</span>

            <label htmlFor="specialRequests">
              Special Requests or Preferences
            </label>
            <textarea
              placeholder="Let us know your requests or preferences..."
              className="form-field"
              id="specialRequests"
              name="specialRequests"
              value={formData.specialRequests}
              onChange={(e) => handleChange("specialRequests", e.target.value)}
            ></textarea>
            <span className="error">{formErrors.specialRequests}</span>

            <button type="submit">Next</button>
          </form>
        </div>
      </div>
    </>
  );
}
