import React from "react";
import LogoutIcon from "../LogoutIcon/LogoutIcon";
import "./Header.css"; 

const Header = () => {
    return (
        <header className="header-cadastrar-reserva">
            <h2 className="logo">Racha10 UFCG</h2>
            <LogoutIcon className="logout-icon" />
        </header>
    );
};

export default Header;