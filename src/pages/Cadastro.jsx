import React, { useState } from "react";
import "./Cadastro.css";
import DefaultButton from "./components/Buttons/DefaultButton";
import InputTemplate from "./components/InputTemplate/InputTemplate";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import ModalOneOption from "./components/Modal/ModalOneOption";
import SelectInput from "./components/SelectInput/SelectInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cadastro() {
  const navigate = useNavigate(); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [formData, setFormData] = useState({
    full_name: "",
    cpf: "",
    phone: "",
    occupation: " ",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cpf") {
      formattedValue = formatCPF(value);
    }
    if (name === "phone") {
      formattedValue = formatPhone(value);
    }
    
    setFormData({ ...formData, [name]: formattedValue });
  };

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

  const handleCadastroClick = async () => {
    if (formData.occupation === " ") {
      setFormData((prevData) => ({
        ...prevData,
        occupation: "",
      }));
    }
    
    const cleanedFormData = {
      ...formData,
      cpf: formData.cpf.replace(/\D/g, ""),
      phone: formData.phone.replace(/\D/g, ""),
    };

    // Validação dos campos obrigatórios
    if (
      !cleanedFormData.full_name ||
      !cleanedFormData.cpf ||
      !cleanedFormData.phone ||
      !cleanedFormData.occupation ||
      !cleanedFormData.email ||
      !cleanedFormData.password
    ) {
      setErrorMessage("Por favor, preencha todos os campos obrigatórios.");
      setModalType("erro");
      setIsModalOpen(true);
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/v1/users/signup", cleanedFormData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        // Cadastro bem-sucedido
        navigate("/login");
      }
    } catch (error) {
      // Verifica se a resposta contém detalhes de erro
      const apiErrorMessage = error.response?.data?.detail;

      // Trata o caso em que o erro é um array ou objeto
      const formattedErrorMessage = Array.isArray(apiErrorMessage)
        ? apiErrorMessage.map((err) => err.msg).join(", ")
        : apiErrorMessage || "Erro ao realizar cadastro. Verifique os dados e tente novamente.";

      setErrorMessage(formattedErrorMessage);
      setModalType("erro");
      console.error(error);
    }

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="cadastro-page">
      <Header />
      <MainContent
        title={"Faça seu cadastro!"}
        subtitle={
          "Certifique-se de informar seus dados corretamente. Somente membros da comunidade da UFCG (alunos, professores e servidores) podem se cadastrar."
        }
        path={"/login"}
      />

      <div className="form-wrapper">
        <div className="form-container">
          <div className="form-group">
            <InputTemplate
              type="text"
              label="Nome completo *"
              placeholder="Nome"
              name="full_name"
              value={formData.full_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <InputTemplate
              type="text"
              label="CPF *"
              placeholder="123.456.789-00"
              name="cpf"
              value={formData.cpf}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <SelectInput
              label="Ocupação *"
              name="occupation"
              value={formData.occupation}
              onChange={handleInputChange}
              options={[
                { value: "ALUNO", label: "Aluno" },
                { value: "PROFESSOR", label: "Professor" },
                { value: "SERVIDOR", label: "Servidor" },
              ]}
            />
          </div>
          <div className="form-group">
            <InputTemplate
              type="email"
              label="E-mail acadêmico *"
              placeholder="email@estudante.ufcg.edu.br"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <InputTemplate
              type="password"
              label="Senha *"
              placeholder="**********"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <InputTemplate
              type="text"
              label="Telefone *"
              placeholder="(00) 91234-5678"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="button">
          <DefaultButton label={"Realizar cadastro"} onClick={handleCadastroClick} />
        </div>
      </div>

      {/* Exibe o Modal dependendo do tipo de sucesso ou erro */}
      {isModalOpen && (
        modalType === "sucesso" ? (
          <ModalOneOption
            iconName="triangulo-amarelo"
            modalText="Enviamos um e-mail para você! Para concluir
                      o seu cadastro, clique no link de confirmação
                      que está em seu e-mail. Lembre-se de checar
                      sua pasta de spam."
            buttonText="Entendido!"
            buttonPath="/login"
          />
        ) : (
          <ModalOneOption
            iconName="X"
            modalText={errorMessage || "Ocorreu um erro inesperado. Por favor, tente novamente!"}
            buttonText="Tentar novamente"
            onClick={closeModal}
          />
        )
      )}
    </div>
  );
}

export default Cadastro;