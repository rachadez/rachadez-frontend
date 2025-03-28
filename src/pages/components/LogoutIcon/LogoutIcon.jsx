import React from 'react';
import './LogoutIcon.css';
import { useNavigate } from 'react-router-dom';

const LogoutIcon = () => {

  const navigate = useNavigate();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className="logout-icon"
      onClick={() => navigate("/")}
    >
      <path 
        d="M272 112V48A16 16 0 00256 32H80A48 48 0 0032 80V432a48 48 0 0048 48H256a16 16 0 0016-16V400a16 16 0 00-16-16H96V128H256a16 16 0 0016-16zm128 144H206a10 10 0 00-10 10v16a10 10 0 0010 10h194l-49 49a10 10 0 000 14l11 11a10 10 0 0014 0l74-74a10 10 0 000-14l-74-74a10 10 0 00-14 0l-11 11a10 10 0 000 14z"
      />
    </svg>
  );
};


export default LogoutIcon;
