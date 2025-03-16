import React from "react";

const CancelIcon = ({ onClick }) => {
  return (
    <div className="icon" onClick={onClick}>
      <ion-icon name="close-circle" style={{ fontSize: "30px", color: "red" }} />
    </div>
  );
};

export default CancelIcon;
