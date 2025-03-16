import React from "react";

const ArrowIcon = ({ direction = "back", className = "", onClick }) => {
  const iconName = direction === "back" ? "arrow-back-outline" : "arrow-forward-outline";

  return (
    <ion-icon
      name={iconName}
      className={`arrow-icon ${className}`}
      onClick={onClick}
      style={{ fontSize: "2.5rem", cursor: "pointer" }}
    ></ion-icon>
  );
};

export default ArrowIcon;
