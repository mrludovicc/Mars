import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import HomePage from "./HomePage/HomePage";
import NavigationBar from "./Navigation/NavigationBar";
import "./scss/styles.scss";
import StageOne from "./Form/Stage1/StageOne";
import StageTwo from "./Form/Stage2/StageTwo";
export default function Main() {
  return (
    <Router>
      <>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stageOne" element={<StageOne />} />
          <Route path="/stageTwo" element={<StageTwo />} />
        </Routes>
      </>
    </Router>
  );
}
