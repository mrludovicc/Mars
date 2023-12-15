import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../scss/navigation.scss";

const NavigationBar = () => {
  const location = useLocation();

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

  const getButtonLink = () => {
    if (location.pathname === "/stageTwo") {
      return "/stageOne";
    } else if (location.pathname === "/stageThree") {
      return "/stageTwo";
    }
    return "/stageOne";
  };

  return (
    <nav className={"nav-bar"}>
      <ul>
        <li>
          <Link to="/">
            <span className={"mars-logo"}>MARS</span>
          </Link>
        </li>
        {showPlanOrBackButton() && (
          <li>
            <Link to={getButtonLink()}>
              <div className={"plan-button"}>{showPlanOrBackButton()}</div>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavigationBar;
