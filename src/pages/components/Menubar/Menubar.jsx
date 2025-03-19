import React from 'react'; 
import { Menubar } from 'primereact/menubar';
import './Menubar.css';
import { useNavigate } from "react-router-dom";

export default function MenuBar() {

    const navigate = useNavigate();

    const items = [
        {
            label: 'SOU DA UFCG',
            icon: 'pi pi-graduation-cap',
            command: () => {
                navigate('/login-aluno')
            }
        },
        {
            label: 'SOU USUÁRIO EXTERNO',
            icon: 'pi pi-users',
            command: () => {
                navigate('/login-professor')
            }
        }
    ];

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Menubar model={items} className="custom-menubar" />
            </div>
        </nav>
    );
}
         