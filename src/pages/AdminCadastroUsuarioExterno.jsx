import React, { useState } from "react";
import "./Cadastro.css";
import DefaultButton from "./components/Buttons/DefaultButton";
import InputTemplate from "./components/InputTemplate/InputTemplate";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import InputReadOnly from "./components/InputReadOnly/InputReadOnly";
import axios from "axios";

function AdminCadastroUsuarioExterno() {
  const [usuario, setUsuario] = useState({
    full_name: "",
    cpf: "",
    occupation: "EXTERNO", // Campo fixo
    email: "",
    password: "",
    phone: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // Estado para mensagens de erro
  const [successMessage, setSuccessMessage] = useState(""); // Estado para mensagens de sucesso

  const handleSubmit = async () => {
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

      setSuccessMessage("Usuário cadastrado com sucesso!");
      setErrorMessage(""); // Limpa mensagens de erro
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

      if (error.response) {
        console.error("Resposta do backend:", error.response.data); // Loga a resposta do backend
      }

      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.detail || "Erro nos dados enviados. Verifique os campos e tente novamente.");
      } else {
        setErrorMessage("Erro ao cadastrar o usuário. Tente novamente mais tarde.");
      }

      setSuccessMessage(""); // Limpa mensagens de sucesso
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

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <div className="button">
          <DefaultButton label={"Cadastrar"} onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default AdminCadastroUsuarioExterno;

