import React from "react";
import ArrowIcon from "../ArrowIcon/ArrowIcon";
import "./MainContent.css";
import { useNavigate } from "react-router-dom";

const MainContent = ({ title, subtitle, path }) => {
   const navigate = useNavigate();

  return (
    <main className="main-content">
      <div className="title-container">
        <ArrowIcon direction="back" className="back-icon" onClick={() => navigate(path)} />
        <div className="text-container">
          <h2 className="title">{title}</h2>
          {subtitle && <p className="subtitle">{subtitle}</p>}
        </div>
      </div>
    </main>
  );
};

export default MainContent;
