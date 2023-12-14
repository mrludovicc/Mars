import React from "react";
import { Link } from "react-router-dom";
import "../scss/navigation.scss";

const NavigationBar = () => {
  return (
    <nav className={"nav-bar"}>
      <ul>
        <li>
          <span className={"mars-logo"}>MARS</span>
        </li>
        <Link to="/">
          <div className={"plan-button"}>PLAN</div>
        </Link>
      </ul>
    </nav>
  );
};

export default NavigationBar;
