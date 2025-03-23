import React from "react";
import ArrowIcon from "../ArrowIcon/ArrowIcon";
import "./MainContent.css";

const MainContent = ({ title, onArrowClick }) => {
    return (
        <main className="main-content">
            <div className="title-container">
                <ArrowIcon 
                    direction="back" 
                    className="back-icon" 
                    onClick={onArrowClick} 
                />
                <h2 className="title">{title}</h2>
            </div>
        </main>
    );
};

export default MainContent;
