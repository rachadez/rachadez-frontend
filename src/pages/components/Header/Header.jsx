import React from "react";
import ConfigIcon from "../ConfigIcon/ConfigIcon";
import "./Header.css"; 

const Header = () => {
    return (
        <header className="header-cadastrar-reserva">
            <h2 className="logo">Racha10 UFCG</h2>
            <ConfigIcon className="config-icon" />
        </header>
    );
};

export default Header;