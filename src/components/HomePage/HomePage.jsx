import React from "react";
import { Link } from "react-router-dom";
import "../scss/homePage.scss";

export default function HomePage() {
  return (
    <>
      <div className="home-page">
        <div className="bg-img"></div>
        <div className="slogan-container">
          <div className="slogan">Mars Has Never Been Closer</div>
          <Link to={"/stageOne"}>
            <button className="get-started-button">GET STARTED</button>
          </Link>
        </div>
      </div>
    </>
  );
}
