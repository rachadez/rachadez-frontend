import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowIcon from "../ArrowIcon/ArrowIcon";
import "./MainContentWithButton.css";
import { Plus } from "lucide-react";

const MainContentWithButton = ({ title, buttonText, path }) => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/cadastrar-reserva");
    };

    return (
        <main className="main-content-with-button">
            <div className="title-container">
                <ArrowIcon 
                    direction="back" 
                    className="back-icon" 
                    onClick={() => navigate(path)} 
                />
                <h2 className="title">{title}</h2>
            </div>
            <button className="main-button" onClick={handleButtonClick}>
                <Plus color="#0B53B8" size={22} />
                {buttonText}
            </button>
        </main>
    );
};

export default MainContentWithButton;