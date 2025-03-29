import './Login.css';
import DefaultButton from './components/Buttons/DefaultButton';
import PasswordInput from './components/Password/PasswordInput';
import { useNavigate } from 'react-router-dom';
import InputTemplate from './components/InputTemplate/InputTemplate';
import { useState } from "react";
import ModalOneOption from "./components/Modal/ModalOneOption";
import axios from "axios";

function Login() {
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState("");
    const [email, setEmail] = useState(""); // Inicializa como vazio
    const [password, setPassword] = useState(""); // Inicializa como vazio
    const [errorMessage, setErrorMessage] = useState("");

    const handleNaoSouDaUFCG = () => {
        setIsModalOpen(true);
        setModalType("usuario-externo");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Depuração: Verifique os valores de email e password
        console.log("Email:", email);
        console.log("Password:", password);

        // Validação básica no frontend
        if (!email || !password) {
            setErrorMessage("Por favor, preencha todos os campos.");
            return;
        }

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/v1/login/access-token",
                new URLSearchParams({
                    username: email,
                    password: password,
                    grant_type: "password",
                }),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            if (response.status === 200) {
                // Login bem-sucedido
                const { access_token } = response.data;
                localStorage.setItem("access_token", access_token); // Armazena o token no localStorage
                navigate("/admin-menu"); // Redireciona para a página inicial
            }
        } catch (error) {
            // Exibe mensagem de erro detalhada, se disponível
            if (error.response && error.response.status === 401) {
                setErrorMessage("Credenciais inválidas. Verifique seu e-mail e senha.");
            } else {
                setErrorMessage("Erro ao fazer login. Tente novamente mais tarde.");
            }
            console.error(error);
        }
    };

    return (
        <>
            <div className="container">
                <div className="left-section">
                    <div className="left-section-elements">
                        <img src="src/assets/Logo_3.png" alt="Logo"></img>
                        <p>O Racha10 é uma plataforma desenvolvida por estudantes de Computação com o objetivo de facilitar a organização de eventos e partidas no complexo desportivo da UFCG, proporcionando uma experiência mais prática e dinâmica para todos os participantes.</p>
                        <img className="team-image" src="src/assets/imagem_equipe_tela_login.png" alt="Equipe"></img>
                    </div>
                </div>

                <div className="login">
                    <div className="right-section-elements">
                        <h1>Faça login no sistema</h1>
                        <form onSubmit={handleSubmit}>
                            <InputTemplate
                                type="email"
                                placeholder="email@ufcg.edu.br"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <PasswordInput
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <DefaultButton label={"Entrar"} />
                        </form>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <p onClick={handleNaoSouDaUFCG} style={{ cursor: "pointer" }}>Não sou da UFCG</p>
                        <p style={{ cursor: "pointer" }}>Esqueci minha senha</p>
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