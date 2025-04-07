import React from "react";

const ConfirmIcon = ({ onClick }) => {
  return (
    <div className="icon" onClick={onClick}>
      <ion-icon name="checkmark-circle" style={{ fontSize: "30px", color: "blue" }} />
    </div>
  );
};

export default ConfirmIcon;
