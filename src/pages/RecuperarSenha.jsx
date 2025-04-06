import React, { useState } from "react";
import MainContent from "./components/MainContent/MainContent";
import InputTemplate from "./components/InputTemplate/InputTemplate";
import DefaultButton from "./components/Buttons/DefaultButton";
import "./ReSenha.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ModalOneOption from './components/Modal/ModalOneOption'
import ModalLoading from "./components/Modal/ModalLoading";

const RecuperarSenha = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [modalType, setModalType] = useState(""); // ex: 'recuperar-sucesso', 'recuperar-erro'
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const abrirModal = (tipo) => {
    setModalType(tipo);
    setIsOpenModal(true);
  };

  const fecharModal = () => {
    setIsOpenModal(false);
    setModalType("");
  };

  const handleRecuperarSenha = async () => {
    abrirModal("loading");

    try {
      const encodedEmail = encodeURIComponent(email); // Codifica o email
      console.log("Email codificado:", encodedEmail); // Adiciona o log

      const response = await axios.post(
        `http://127.0.0.1:8000/v1/password-recovery/${encodedEmail}` // Usa o email codificado
      );

      if (response.status === 200) {
        fecharModal();
        abrirModal("sucesso");
      }
    } catch (error) {
      console.error("Erro ao recuperar senha:", error);
      const mensagem =
        error.response?.data?.detail || "Erro ao tentar recuperar a senha. Tente novamente.";
      setErrorMessage(mensagem);
      fecharModal();
      abrirModal("erro");
    }
  };

  return (
    <section className="senha">
      <MainContent
        title={"Problemas para entrar?"}
        subtitle={
          "Insira os dados abaixo. Um link para recuperar sua senha será enviado para seu e-mail. Lembre-se de checar o spam."
        }
        path={"/login"}
      />

      <div className="form-wrapper">
        <div className="form-container">
          <div className="form-group">
            <InputTemplate
              type="email"
              label="E-mail acadêmico"
              placeholder="email@estudante.ufcg.edu.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="button">
          <DefaultButton label={"Receber código"} onClick={handleRecuperarSenha} />
        </div>
      </div>

      {isOpenModal && modalType === "sucesso" &&(
        <ModalOneOption
        iconName="sucesso-check"
        modalText="Enviamos um link de recuperação de senha para o seu e-mail!
                  Lembre-se de checar sua caixa de spam"
        buttonText="Voltar"
        buttonPath="/login"
        />
      )}

      {isOpenModal && modalType === "erro" &&(
        <ModalOneOption
        iconName="circulo-erro"
        modalText={errorMessage}
        buttonText="Fechar"
        onClick={() => fecharModal()}
        />
      )}

      {isOpenModal && modalType === "loading" &&(
        <ModalLoading />
      )}
    </section>
  );
};
export default RecuperarSenha;