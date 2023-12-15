import React, { useState } from "react";
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

  const validateForm = () => {
    let isValid = true;
    const errors = {
      departureDate: "",
      returnDate: "",
      accommodationPreference: "",
      specialRequests: "",
    };

    const today = new Date();
    const departureDate = new Date(formData.departureDate);
    const returnDate = new Date(formData.returnDate);

    if (departureDate <= today) {
      errors.departureDate = "Departure date must be in the future";
      isValid = false;
    }

    if (
      returnDate <= departureDate ||
      returnDate - departureDate < 3 * 24 * 60 * 60 * 1000
    ) {
      errors.returnDate =
        "Return date must be at least 3 days after departure date";
      isValid = false;
    }

    // Placeholder validation logic for accommodationPreference
    if (!formData.accommodationPreference) {
      errors.accommodationPreference =
        "Please select your accommodation preference";
      isValid = false;
    }

    // Placeholder validation logic for specialRequests
    // You can customize the validation based on your requirements

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
            {/* Placeholder for accommodationPreference */}
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
            {/* Placeholder for specialRequests */}
            <textarea
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
