import React from "react";
import { useNavigate } from "react-router-dom";
import "./MainContentWithoutArrow.css";
import { Plus } from "lucide-react";

const MainContentWithoutArrow = ({ title, buttonText, path }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <>
      {buttonText && path ? (
        <main className="main-content-without-arrow">
          <div className="title-container">
            <h2 className="title">{title}</h2>
          </div>
          <button className="main-button" onClick={handleButtonClick}>
            <Plus color="#0B53B8" size={22} />
            {buttonText}
          </button>
        </main>
      ) : (
        <main className="main-content-without-arrow-title">
          <div className="title-container">
            <h2 className="title">{title}</h2>
          </div>
        </main>
      )}
    </>
  );
};

export default MainContentWithoutArrow;
