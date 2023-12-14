import React, { useState } from "react";

import ReactFlagsSelect from "react-flags-select";
import "../../scss/stageOne.scss";

export default function StageOne() {
  const [formErrors, setFormErrors] = useState({
    fullName: "",
    dob: "",
    nationality: "",
    email: "",
    phone: "",
  });
  const [selected, setSelected] = useState("");
  const validateForm = () => {
    let isValid = true;
    const errors = {
      fullName: "",
      dob: "",
      nationality: "",
      email: "",
      phone: "",
    };

    const fullNameParts = formData.fullName.trim().split(" ");
    if (fullNameParts.length < 2) {
      isValid = false;
      errors.fullName = "Please enter at least first and last name";
    }

    const birthDate = new Date(formData.dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      errors.dob = "You must be at least 18 years old";
      isValid = false;
    }
    // Check if age is less than 18
    if (age < 18) {
      errors.dob = "You must be at least 18 years old";
      isValid = false;
    }

    if (!selected) {
      errors.nationality = "Please select your nationality";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      console.log("Form submitted successfully!");
    }
  };

  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    nationality: "",
    email: "",
    phone: "",
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div className="stage-one">
        <div className="bg-img"></div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h2>Personal Information</h2>
            <label htmlFor="fullName">Full Name</label>
            <input
              placeholder="Alex Hugo"
              className="form-field"
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              required
            />
            <span className="error">{formErrors.fullName}</span>

            <label className="form-field" htmlFor="dob">
              Date of Birth
            </label>
            <input
              className="form-field"
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={(e) => handleChange("dob", e.target.value)}
              required
            />
            <span className="error">{formErrors.dob}</span>

            <label htmlFor="nationality">Nationality</label>
            <ReactFlagsSelect
              selected={selected}
              id="nationality"
              name="nationality"
              onSelect={(code) => setSelected(code)}
              isSearchable={true}
              required
            />
            <span className="error">{formErrors.nationality}</span>

            <label htmlFor="email">Email</label>
            <input
              placeholder="alex@hugo.com"
              className="form-field"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
            />
            <span className="error">{formErrors.email}</span>

            <label htmlFor="phone">Phone</label>
            <input
              className="form-field"
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="+1 000-111-2222"
              required
            />
            <span className="error">{formErrors.phone}</span>

            <button type="submit">Next</button>
          </form>
        </div>
      </div>
    </>
  );
}
