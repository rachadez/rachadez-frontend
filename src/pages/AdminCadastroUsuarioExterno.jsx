import React, { useState } from "react";
import "./Cadastro.css";
import DefaultButton from "./components/Buttons/DefaultButton";
import InputTemplate from "./components/InputTemplate/InputTemplate";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import InputReadOnly from "./components/InputReadOnly/InputReadOnly";
import axios from "axios";
import ModalOneOption from "./components/Modal/ModalOneOption";
import ModalLoading from "./components/Modal/ModalLoading";

function AdminCadastroUsuarioExterno() {
  const [usuario, setUsuario] = useState({
    full_name: "",
    cpf: "",
    occupation: "EXTERNO", // Campo fixo
    email: "",
    password: "",
    phone: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Estado para mensagens de erro

  const abrirModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const fecharModal = () => {
    setModalType("");
    setIsModalOpen(false);
  };

  const traduzirMensagem = (mensagem) => {
    const traducoes = {
      "String should have at least 8 characters": "A senha deve ter pelo menos 8 caracteres",
      "String should have at most 11 characters": "O telefone/cpf deve ter no máximo 11 dígitos",
      "value is not a valid email address: There must be something after the @-sign.": "E-mail inválido: falta o domínio após o símbolo @",
      "value is not a valid email address: An email address must have an @-sign.": "E-mail inválido: o endereço de e-mail deve conter o símbolo @",
      "value is not a valid email address: The part after the @-sign is not valid. It should have a period.": "E-mail inválido: o domínio do e-mail deve conter um ponto, como '.com'",
      "value is not a valid email address: An email address cannot end with a period.": "E-mail inválido: um endereço de e-mail não pode terminar com um ponto ('.')",
    };
  
    return traducoes[mensagem] || mensagem; // retorna a tradução, ou a original se não tiver
  };

  const handleSubmit = async () => {
    abrirModal("carregando");

    try {
      console.log("Tentando cadastrar com os dados:", usuario); // Loga os dados enviados no console
      const token = localStorage.getItem("access_token"); // Obtém o token do localStorage

      const dadosParaEnvio = {
        full_name: usuario.full_name,
        cpf: usuario.cpf,
        occupation: usuario.occupation,
        email: usuario.email,
        password: usuario.password,
        phone: usuario.phone,
        is_internal: false, // Define explicitamente que o usuário não é interno
      };

      console.log("Dados enviados para o backend:", dadosParaEnvio);

      const response = await axios.post("http://127.0.0.1:8000/v1/users/", dadosParaEnvio, {
        headers: {
          Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
        },
      });

      fecharModal(); // fecha o loading
      abrirModal("sucesso");
      console.log("Resposta da API:", response.data);

      // Limpa o formulário após o cadastro
      setUsuario({
        full_name: "",
        cpf: "",
        occupation: "EXTERNO",
        email: "",
        password: "",
        phone: "",
      });
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
   
      let mensagemBackend = "Erro ao cadastrar o usuário. Tente novamente mais tarde.";
  
      const detalhe = error.response?.data?.detail;
  
      if (detalhe) {
        const mensagens = Array.isArray(detalhe)
          ? detalhe.map((err) => traduzirMensagem(err.msg))
          : [typeof detalhe === "string" ? traduzirMensagem(detalhe) : traduzirMensagem(detalhe?.msg)];
  
        mensagemBackend = mensagens[0];
      }

      fecharModal(); // fecha o de loading
      setErrorMessage(mensagemBackend);
      abrirModal("erro"); 
      }
  };

  return (
    <div className="cadastro-page">
      <Header />
      <MainContent
        path={"/usuarios-menu"}
        title={"Cadastrando novo Usuário Externo"}
        subtitle={"Adicione usuários externos ao sistema. Membros externos são todos aqueles que não pertencem à UFCG."}
      />

      <div className="form-wrapper">
        <div className="form-container">
          <div className="form-group">
            <InputTemplate
              type="text"
              label="Nome completo"
              placeholder="Nome"
              value={usuario.full_name}
              onChange={(e) => setUsuario({ ...usuario, full_name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <InputTemplate
              type="text"
              label="CPF"
              placeholder="123.456.789-00"
              value={usuario.cpf}
              onChange={(e) => setUsuario({ ...usuario, cpf: e.target.value })}
            />
          </div>
          <div className="form-group">
            <InputReadOnly label="Tipo de Usuário" value={usuario.occupation} />
          </div>
          <div className="form-group">
            <InputTemplate
              type="email"
              label="E-mail"
              placeholder="email@gmail.com"
              value={usuario.email}
              onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <InputTemplate
              type="password"
              label="Senha"
              placeholder="**********"
              value={usuario.password}
              onChange={(e) => setUsuario({ ...usuario, password: e.target.value })}
            />
          </div>
          <div className="form-group">
            <InputTemplate
              type="text"
              label="Telefone"
              placeholder="(00) 91234-5678"
              value={usuario.phone}
              onChange={(e) => setUsuario({ ...usuario, phone: e.target.value })}
            />
          </div>
        </div>
        <div className="button">
          <DefaultButton label={"Cadastrar"} onClick={handleSubmit} />
        </div>
      </div>

      {isModalOpen && modalType === "erro" && (
        <ModalOneOption
          iconName="X"
          modalText={errorMessage}
          buttonText="Fechar"
          onClick={fecharModal}
        />
      )}

      {isModalOpen && modalType === "sucesso" && (
        <ModalOneOption
          iconName="sucesso-check"
          modalText="Usuário cadastrado com sucesso!"
          buttonText="Fechar"
          onClick={fecharModal}
        />
      )}

      {isModalOpen && modalType === "carregando" && (
        <ModalLoading texto="Cadastrando usuário..." />
      )}
    </div>
  );
}

export default AdminCadastroUsuarioExterno;

