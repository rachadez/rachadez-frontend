import React, { useState } from "react";
import "./Cadastro.css";
import DefaultButton from "./components/Buttons/DefaultButton";
import InputTemplate from "./components/InputTemplate/InputTemplate";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import SelectInput from "./components/SelectInput/SelectInput";
import axios from "axios";

function AdminCadastroUsuarioUFCG() {
  const [errorMessage, setErrorMessage] = useState(""); // Estado para mensagens de erro
  const [successMessage, setSuccessMessage] = useState(""); // Estado para mensagens de sucesso

  // Lista de opções para o campo "Ocupação"
  const ocupacoes = [
    { value: "ALUNO", label: "Aluno" },
    { value: "PROFESSOR", label: "Professor" },
    { value: "SERVIDOR", label: "Técnico Administrativo" },
  ];  

  // Estados para armazenar os dados do formulário
  const [usuario, setUsuario] = useState({
    full_name: "",
    cpf: "",
    occupation: " ",
    email: "",
    password: "",
    phone: "",
  });

  const formatCPF = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    return digits
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };
  
  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    return digits
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d{5})(\d{4})$/, "$1-$2");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
  
    if (name === "cpf") {
      formattedValue = formatCPF(value);
    }
    if (name === "phone") {
      formattedValue = formatPhone(value);
    }
  
    setUsuario({ ...usuario, [name]: formattedValue });
  };  
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const ocupacaoFinal = usuario.occupation === " " ? "" : usuario.occupation;

    try {
      const token = localStorage.getItem("access_token"); // Obtém o token do localStorage

      const dadosParaEnvio = {
        ...usuario,
        cpf: usuario.cpf.replace(/\D/g, ""),
        phone: usuario.phone.replace(/\D/g, ""),
        occupation: ocupacaoFinal,
        is_active: true, // Define o usuário como ativo
        is_admin: false, // Define que o usuário não é administrador
        is_internal: true, // Define que o usuário é interno
      };

      console.log("Dados enviados para o backend:", dadosParaEnvio);

      const response = await axios.post("http://127.0.0.1:8000/v1/users/", dadosParaEnvio, {
        headers: {
          Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
          "Content-Type": "application/json",
        },
      });

      setSuccessMessage("Usuário cadastrado com sucesso!");
      setErrorMessage(""); // Limpa mensagens de erro
      console.log("Resposta da API:", response.data);

      // Limpa o formulário após o cadastro
      setUsuario({
        full_name: "",
        cpf: "",
        occupation: " ",
        email: "",
        password: "",
        phone: "",
      });
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);

      if (error.response && error.response.status === 422) {
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
        title={"Cadastrando novo Usuário Interno"}
        subtitle={"Adicione membros da comunidade da UFCG: alunos, professores e servidores. OBS: APENAS EMAILS DO TIPO '@xx.ufcg.edu.br'"}
      />

      <div className="form-wrapper">
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-group">
            <InputTemplate
              type="text"
              label="Nome completo *"
              name="full_name"
              placeholder="Nome"
              value={usuario.full_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <InputTemplate
              type="text"
              label="CPF *"
              name="cpf"
              placeholder="123.456.789-00"
              value={usuario.cpf}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <SelectInput
              label="Ocupação *"
              name="occupation"
              options={ocupacoes}
              value={usuario.occupation}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <InputTemplate
              type="email"
              label="E-mail acadêmico *"
              name="email"
              placeholder="email@estudante.ufcg.edu.br"
              value={usuario.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <InputTemplate
              type="password"
              label="Senha *"
              name="password"
              placeholder="**********"
              value={usuario.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <InputTemplate
              type="text"
              label="Telefone *"
              name="phone"
              placeholder="(00) 91234-5678"
              value={usuario.phone}
              onChange={handleInputChange}
            />
          </div>

          <div className="button-user-interno">
            <DefaultButton label={"Cadastrar"} type="submit" />
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
        </form>
      </div>
    </div>
  );
}

export default AdminCadastroUsuarioUFCG;