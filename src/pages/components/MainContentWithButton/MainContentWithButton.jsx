import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowIcon from "../ArrowIcon/ArrowIcon";
import "./MainContentWithButton.css";

const MainContentWithButton = ({ title, buttonText }) => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/cadastrar-reserva");
    };

    return (
        <main className="main-content-with-button">
            <div className="title-container">
                <ArrowIcon direction="back" className="back-icon" />
                <h2 className="title">{title}</h2>
            </div>
            <button className="main-button" onClick={handleButtonClick}>
                {buttonText}
            </button>
        </main>
    );
};

export default MainContentWithButton;