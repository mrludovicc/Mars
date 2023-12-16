import React, { createContext, useContext, useState, useEffect } from "react";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormDataState] = useState({});
  const [nationality, setNationalityState] = useState("");

  useEffect(() => {
    const storedFormData = JSON.parse(localStorage.getItem("formData")) || {};
    const storedNationality = localStorage.getItem("nationality") || "";

    setFormDataState(storedFormData);
    setNationalityState(storedNationality);
  }, []);

  const updateFormData = (newData) => {
    const updatedFormData = { ...formData, ...newData };
    setFormDataState(updatedFormData);
    localStorage.setItem("formData", JSON.stringify(updatedFormData));
  };

  const updateNationality = (code) => {
    setNationalityState(code);
    localStorage.setItem("nationality", code);
  };

  const clearFormData = () => {
    setFormDataState({});
    setNationalityState("");
    localStorage.removeItem("formData");
    localStorage.removeItem("nationality");
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        updateFormData,
        nationality,
        updateNationality,
        clearFormData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => {
  return useContext(FormContext);
};
