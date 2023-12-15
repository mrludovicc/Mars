import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import HomePage from "./HomePage/HomePage";
import NavigationBar from "./Navigation/NavigationBar";
import "./scss/styles.scss";
import StageOne from "./Form/StageOne";
import StageTwo from "./Form/StageTwo";
import { FormProvider } from "./Form/FormContext";
import StageThree from "./Form/StageThree";
export default function Main() {
  return (
    <Router>
      <>
        <FormProvider>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stageOne" element={<StageOne />} />
            <Route path="/stageTwo" element={<StageTwo />} />
            <Route path="/stageThree" element={<StageThree />} />
          </Routes>
        </FormProvider>
      </>
    </Router>
  );
}
