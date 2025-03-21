import React from "react";
import "./ConfirmIcon.css";

const ConfirmIcon = ({ onClick }) => {
  return (
    <div className="icon" onClick={onClick}>
      <ion-icon name="checkmark-circle"></ion-icon>
    </div>
  );
};

export default ConfirmIcon;
