import React, { useState } from "react";
import MainContent from "./components/MainContent/MainContent";
import DefaultButton from "./components/Buttons/DefaultButton";
import PasswordInput from "./components/Password/PasswordInput";
import { useNavigate, useParams } from "react-router-dom";
import ModalOneOption from "./components/Modal/ModalOneOption";
import axios from "axios";

const RedefinirSenha = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [modalType, setModalType] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/v1/reset-password/",
        {
          token: token,
          new_password: senha,
        }
      );

      if (response.status === 200) {
        setModalType("senha-redefinida");
        setIsModalOpen(true);
      } else {
        setModalType("credenciais-invalidas");
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Erro ao redefinir senha:", error);
      setModalType("credenciais-invalidas");
      setIsModalOpen(true);
    }
  };

  const validarSenhas = () => {
    if (senha !== confirmSenha) {
      setModalType("credenciais-invalidas");
      setIsModalOpen(true);
    } else {
      handleResetPassword();
    }
  };

  const handleFinalizar = () => {
    validarSenhas();
  };

  return (
    <section className="senha">
      <MainContent
        title={"Problemas para entrar?"}
        subtitle={"Por favor, insira sua nova senha e confirme-a nos campos abaixo."}
        path={"/recuperar-senha"}
      />

      <div className="form-wrapper">
        <div className="password-group">
          <div className="form-group">
            <label>Digite sua nova senha</label>
            <PasswordInput
              placeholder="Nova senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Confirme sua nova senha</label>
            <PasswordInput
              placeholder="Confirme nova senha"
              value={confirmSenha}
              onChange={(e) => setConfirmSenha(e.target.value)}
            />
          </div>
        </div>

        <div className="button">
          <DefaultButton label={"Finalizar"} onClick={handleFinalizar} />
        </div>
      </div>

      {isModalOpen && modalType === "senha-redefinida" && (
        <ModalOneOption
          iconName="sucesso-check"
          modalText="Operação realizada com sucesso!"
          buttonText="Ir para página inicial"
          onClick={() => {
            setIsModalOpen(false);
            navigate("/");
          }}
        />
      )}

      {isModalOpen && modalType === "credenciais-invalidas" && (
        <ModalOneOption
          iconName="circulo-erro"
          modalText="Senha diferentes! Cheque os dados inseridos e tente novamente"
          buttonText="Tentar novamente"
          onClick={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
};

export default RedefinirSenha;