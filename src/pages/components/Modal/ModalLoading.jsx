import React from "react";
import "./ModalLoading.css"; 

export default function ModalLoading({ texto = "Carregando..." }) {
    return (
      <div className="modal-loading-overlay">
        <div className="modal-loading-box">
          <div className="spinner" />
          <p className="loading-text">{texto}</p>
        </div>
      </div>
    );
  }