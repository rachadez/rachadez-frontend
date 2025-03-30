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
    full_name: "Nicolas Kevin",
    cpf: "64245678978",
    occupation: "EXTERNO", // Campo fixo
    email: "nicolaskevin2511@gmail.com",
    password: "senha123",
    phone: "11912345678",
  });
  const [errorMessage, setErrorMessage] = useState(""); // Estado para mensagens de erro
  const [successMessage, setSuccessMessage] = useState(""); // Estado para mensagens de sucesso

  // Função para lidar com o envio do formulário
  const verificarDuplicidade = async () => {
    try {
      const token = localStorage.getItem("access_token");

      // Verifica se o CPF já existe
      const responseCPF = await axios.get(`http://127.0.0.1:8000/v1/users/`, {
        params: { cpf: usuario.cpf },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (responseCPF.data.length > 0) {
        setErrorMessage("CPF já cadastrado. Use outro CPF.");
        return false;
      }

      // Verifica se o e-mail já existe
      const responseEmail = await axios.get(`http://127.0.0.1:8000/v1/users/`, {
        params: { email: usuario.email },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (responseEmail.data.length > 0) {
        setErrorMessage("E-mail já cadastrado. Use outro e-mail.");
        return false;
      }

      return true;
    } catch (error) {
      console.error("Erro ao verificar duplicidade:", error);
      setErrorMessage("Erro ao verificar CPF ou e-mail. Tente novamente.");
      return false;
    }
  };

  const handleSubmit = async () => {
    try {
      // Validação de CPF
      const validarCPF = (cpf) => {
        const regex = /^\d{11}$/; // Verifica se o CPF tem 11 dígitos
        return regex.test(cpf);
      };

      if (!validarCPF(usuario.cpf)) {
        setErrorMessage("CPF inválido. Verifique o formato.");
        return;
      }

      // Validação de e-mail
      const validarEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Verifica o formato do e-mail
        return regex.test(email);
      };

      if (!validarEmail(usuario.email)) {
        setErrorMessage("E-mail inválido. Verifique o formato.");
        return;
      }

      // Verifica duplicidade de CPF e e-mail
      const duplicidadeValida = await verificarDuplicidade();
      if (!duplicidadeValida) return;

      console.log("Dados enviados:", usuario); // Verifica os dados enviados
      const token = localStorage.getItem("access_token"); // Obtém o token do localStorage

      const dadosParaEnvio = {
        full_name: usuario.full_name,
        cpf: usuario.cpf,
        occupation: usuario.occupation,
        email: usuario.email,
        password: usuario.password,
        phone: usuario.phone,
      };

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

      if (error.response && error.response.status === 400) {
        setErrorMessage("Erro nos dados enviados. Verifique os campos e tente novamente.");
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
            <InputReadOnly label="Tipo de Usuário" value="UsuarioExterno" />
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