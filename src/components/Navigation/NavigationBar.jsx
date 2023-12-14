import React from "react";
import { Link } from "react-router-dom";
import "../scss/navigation.scss";

const NavigationBar = () => {
  return (
    <nav className={"nav-bar"}>
      <ul>
        <li>
          <Link to="/">
            <span className={"mars-logo"}>MARS</span>
          </Link>
        </li>
        <Link to="/StageOne">
          <div className={"plan-button"}>PLAN</div>
        </Link>
      </ul>
    </nav>
  );
};

export default NavigationBar;
