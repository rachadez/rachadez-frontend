import React from "react";
import ArrowIcon from "../ArrowIcon/ArrowIcon";
import "./MainContent.css";

const MainContent = ({ title }) => {
    return (
        <main className="main-content">
            <div className="title-container">
                <ArrowIcon direction="back" className="back-icon" />
                <h2 className="title">{title}</h2>
            </div>
        </main>
    );
};

export default MainContent;
