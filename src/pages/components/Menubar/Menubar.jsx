import React from 'react'; 
import { Menubar } from 'primereact/menubar';
import './Menubar.css';
import { useNavigate } from "react-router-dom";
import LogoRacha10 from '../../../assets/Logo_3_vazada.png';

export default function MenuBar() {

    const navigate = useNavigate();

    const items = [
        {
            label: 'FAZER LOGIN',
            icon: 'pi pi-sign-in',
            command: () => {
                navigate('/login-aluno')
            }
        }
    ];

    return (
        <nav className="navbar">
            <div className="nav-container">
                <img src={LogoRacha10}></img>
                <Menubar model={items} className="custom-menubar" />
            </div>
        </nav>
    );
}
         