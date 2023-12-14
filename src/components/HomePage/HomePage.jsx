import React from "react";
import "../scss/homePage.scss";
export default function HomePage() {
  return (
    <>
      <div className="home-page">
        <div className="bg-img"></div>
        <div className="slogan-container">
          <div className="slogan">Mars Has Never Been Closer</div>
          <button className="get-started-button">GET STARTED</button>
        </div>
      </div>
    </>
  );
}
