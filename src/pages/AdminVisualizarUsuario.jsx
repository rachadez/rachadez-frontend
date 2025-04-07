import React, { useState, useEffect } from "react";
import "./Cadastro.css";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import { UserRoundSearch } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import InputTemplateDisabled from "./components/InputTemplate/InputTemplateDisabled";
import axios from "axios";
import ModalOneOption from "./components/Modal/ModalOneOption";
import ModalLoading from "./components/Modal/ModalLoading";

function AdminVisualizarUsuario() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const abrirModal = (tipo) => {
    setModalType(tipo);
    setIsModalOpen(true);
  };

  const fecharModal = () => {
    setModalType("");
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get(`http://127.0.0.1:8000/v1/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsuario(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        setErrorMessage("Erro ao carregar dados do usuário. Tente novamente mais tarde.");
        abrirModal("erro-loading");
      }
    };

    fetchUsuario();
  }, [id]);

  if (errorMessage && isModalOpen && modalType === "erro-loading") {
    return (
      <ModalOneOption
        iconName="circulo-erro"
        modalText={errorMessage || "Erro ao carregar dados."}
        buttonText="Voltar"
        buttonPath="/admin-visualizar-usuarios"
      />
    );
  }

  if (!usuario) {
    return <ModalLoading texto="Carregando dados do usuário" />;
  }

  return (
    <div className="cadastro-page">
      <Header />
      <MainContent
        path={"/admin-visualizar-usuarios"}
        title={"Visualizando usuário"}
        subtitle={"Nesta seção, você pode apenas verificar os dados de um membro do sistema."}
      />

      <div className="form-wrapper">
        <div className="form-container">
          <div className="form-group">
            <InputTemplateDisabled label="Nome completo" value={usuario.full_name} />
          </div>
          <div className="form-group">
            <InputTemplateDisabled label="CPF" value={usuario.cpf} />
          </div>
          <div className="form-group">
            <InputTemplateDisabled label="Ocupação" value={usuario.occupation} />
          </div>
          <div className="form-group">
            <InputTemplateDisabled label="E-mail" value={usuario.email} />
          </div>
          <div className="form-group">
            <InputTemplateDisabled label="Telefone" value={usuario.phone} />
          </div>
          <div className="form-group">
            <InputTemplateDisabled label="ID" value={usuario.id} />
          </div>
          <div className="form-group">
            <InputTemplateDisabled label="Administrador" value={usuario.is_admin ? "Sim" : "Não"} />
          </div>
          <div className="form-group">
            <InputTemplateDisabled label="Interno" value={usuario.is_internal ? "Sim" : "Não"} />
          </div>
          <div className="form-group">
            <InputTemplateDisabled label="Ativo" value={usuario.is_active ? "Sim" : "Não"} />
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminVisualizarUsuario;