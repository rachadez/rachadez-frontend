import React from 'react';
import './TrashIcon.css';

const TrashIcon = ({ onClick, className = "" }) => {
  return (
    <svg
      className={`trash-icon ${className}`}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-2 14H7L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M5 6l1-3h12l1 3" />
    </svg>
  );
};

export default TrashIcon;