import React from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";

const Card = ({ icon: Icon, title, path, disabled }) => {
  const navigate = useNavigate();

  return (
    <div className={`card ${disabled ? 'disabled' : ''}`} onClick={() => navigate(path)}>
      <Icon className="card-icon" size={85} strokeWidth={1}/>
      <p>{title}</p>
    </div>
  );
};

export default Card;