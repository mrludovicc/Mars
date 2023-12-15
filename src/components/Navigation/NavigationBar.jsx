import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../scss/navigation.scss";

const NavigationBar = () => {
  const location = useLocation();

  // Determine whether to show "PLAN" or "Back" button based on the current location
  const showPlanOrBackButton = () => {
    if (location.pathname === "/") {
      return "PLAN";
    } else if (location.pathname === "/stageTwo") {
      return "Back";
    } else if (location.pathname === "/stageThree") {
      return "Back";
    }
    return null;
  };

  // Get the correct link for the "Back" button based on the current location
  const getButtonLink = () => {
    if (location.pathname === "/stageTwo") {
      return "/stageOne";
    } else if (location.pathname === "/stageThree") {
      return "/stageTwo";
    }
    return "/stageOne";
  };

  return (
    // Navigation bar component
    <nav className={"nav-bar"}>
      <ul>
        <li>
          {/* Home link with Mars logo */}
          <Link to="/">
            <span className={"mars-logo"}>MARS</span>
          </Link>
        </li>
        {/* Conditionally render "PLAN" or "Back" button based on the current location */}
        {showPlanOrBackButton() && (
          <li>
            {/* Link to the appropriate page */}
            <Link to={getButtonLink()}>
              {/* Display either "PLAN" or "Back" button text */}
              <div className={"plan-button"}>{showPlanOrBackButton()}</div>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavigationBar;
