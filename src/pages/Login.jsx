import './Login.css';
import DefaultButton from './components/Buttons/DefaultButton';
import PasswordInput from './components/Password/PasswordInput';
import { useNavigate } from 'react-router-dom';
import InputTemplate from './components/InputTemplate/InputTemplate';
import { useState } from "react";
import ModalOneOption from "./components/Modal/ModalOneOption";

function Login() {
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState("");

    const handleNaoSouDaUFCG = () => {
        setIsModalOpen(true);
        setModalType("usuario-externo");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui pode ir a lógica para autenticação.
        navigate('/home');
    };

    return (
        <>
            <div className="container">

                <div className="left-section">
                    <div className="left-section-elements">
                        <img src="src/assets/Logo_3.png"></img>
                        <p>O Racha10 é uma plataforma desenvolvida por estudantes de Computação com o objetivo de facilitar a organização de eventos e partidas no complexo desportivo da UFCG, proporcionando uma experiência mais prática e dinâmica para todos os participantes.</p>
                        <img className="team-image" src="src/assets/imagem_equipe_tela_login.png" ></img>
                    </div>
                </div>

                <div className="login">
                    <div className="right-section-elements">
                        <h1>Faça login no sistema</h1>
                        <form onSubmit={handleSubmit}>
                            <InputTemplate type="email" placeholder="email@ufcg.edu.br" />
                            <PasswordInput></PasswordInput>
                            <DefaultButton label={"Entrar"}></DefaultButton>
                        </form>
                        <p onClick={handleNaoSouDaUFCG} style={{ cursor: "pointer" }}>Não sou da UFCG</p>   
                        <p style={{ cursor: "pointer" }}>Esqueci minha senha </p>
                        <p onClick={() => navigate("/cadastro")} style={{ cursor: "pointer" }}>
                            Ainda não tenho cadastro
                        </p>
                    </div>
                </div>
            </div>

            {/* Modal exibido se o usuário clicar em "Não sou da UFCG" */}
            {isModalOpen && modalType === "usuario-externo" && (
                <ModalOneOption
                    iconName="sucesso-check"
                    modalText="Usuários Externos precisam ir presencialmente ao Complexo Esportivo da UFCG para criarem uma conta. Leve um documento de identificação válido!"
                    buttonText="Entendido!"
                    onClick={() => setIsModalOpen(false)}
                />
            )}
        </>

    );
}

export default Login;
