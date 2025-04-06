import React, { useState } from "react";
import "./Cadastro.css";
import DefaultButton from "./components/Buttons/DefaultButton";
import InputTemplate from "./components/InputTemplate/InputTemplate";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import SelectInput from "./components/SelectInput/SelectInput";
import axios from "axios";
import ModalOneOption from "./components/Modal/ModalOneOption";
import ModalLoading from "./components/Modal/ModalLoading";

function AdminCadastroUsuarioUFCG() {
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
    occupation: "",
    email: "",
    password: "",
    phone: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [errorMessage, setErrorMessage] = useState([]); // Estado para mensagens de erro

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
      "Invalid email: must have a domain of ufcg.edu.br.": "E-mail inválido: o domínio deve ser '*.ufcg.edu.br'.",
      "Input should be 'ALUNO', 'SERVIDOR', 'PROFESSOR' or 'EXTERNO'": "Selecione uma ocupação válida: Aluno, Servidor, Professor ou Externo.",
      "value is not a valid email address: The part after the @-sign is not valid. It should have a period.": "E-mail inválido: o domínio do e-mail deve conter um ponto, como '.com'",
      "value is not a valid email address: An email address cannot end with a period.": "E-mail inválido: um endereço de e-mail não pode terminar com um ponto ('.')",
      "value is not a valid email address: An email address must have an @-sign.": "E-mail inválido: o endereço de e-mail deve conter o símbolo @",
      "value is not a valid email address: There must be something after the @-sign.": "E-mail inválido: falta o domínio após o símbolo @",
    };
  
    return traducoes[mensagem] || mensagem; // retorna a tradução, ou a original se não tiver
  };

  const handleSubmit = async (e) => {
    abrirModal("carregando");
    e.preventDefault();

    try {
      const token = localStorage.getItem("access_token"); // Obtém o token do localStorage

      const dadosParaEnvio = {
        ...usuario,
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

      fecharModal(); // fecha o loading
      abrirModal("sucesso");
      console.log("Resposta da API:", response.data);

      // Limpa o formulário após o cadastro
      setUsuario({
        full_name: "",
        cpf: "",
        occupation: "",
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
        title={"Cadastrando novo Usuário Interno"}
        subtitle={"Adicione membros da comunidade da UFCG: alunos, professores e servidores. OBS: APENAS EMAILS DO TIPO '@xx.ufcg.edu.br'"}
      />

      <div className="form-wrapper">
        <form className="form-container" onSubmit={handleSubmit}>
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
            <SelectInput
              label="Ocupação"
              options={ocupacoes}
              value={usuario.occupation}
              onChange={(e) => setUsuario({ ...usuario, occupation: e.target.value })}
            />
          </div>
          <div className="form-group">
            <InputTemplate
              type="email"
              label="E-mail acadêmico"
              placeholder="email@estudante.ufcg.edu.br"
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
          <div className="button">
            <DefaultButton label={"Cadastrar"} type="submit" />
          </div>
        </form>
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

export default AdminCadastroUsuarioUFCG;