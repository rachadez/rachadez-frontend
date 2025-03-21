import React from "react";
import "./EditIcon.css"; // Crie um arquivo CSS separado para este componente, se necessário

const EditIcon = ({ onClick, className }) => {
    return (
        <ion-icon name="pencil-outline" className={`edit-icon ${className}`} onClick={onClick}></ion-icon>
    );
};

export default EditIcon;