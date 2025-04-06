import React, { useEffect, useState } from "react";
import DeleteButton from "./components/Buttons/DeleteButton";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import TableList from "./components/TableList/TableList";
import axios from "axios";
import ModalTwoOptions from "./components/Modal/ModalTwoOptions";
import ModalOneOption from "./components/Modal/ModalOneOption";

function AdminUsuariosBanir() {
  const [usuarios, setUsuarios] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [modalType, setModalType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const cabecalho = ["Nome", "CPF", "Ocupação", "Telefone"];

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get("http://127.0.0.1:8000/v1/users/", {
          params: { offset: 0, limit: 100 },
          headers: { Authorization: `Bearer ${token}` },
        });

        // Filtra os usuários para excluir os administradores e incluir apenas usuários ativos
        const usuariosFiltrados = response.data.filter((usuario) => !usuario.is_admin && usuario.is_active);
        setUsuarios(usuariosFiltrados);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        setErrorMessage("Erro ao carregar os usuários. Tente novamente mais tarde.");
        setModalType("error");
        setIsModalOpen(true);
      }
    };

    fetchUsuarios();
  }, []);

  const abrirModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const fecharModal = () => {
    setIsModalOpen(false);
    setModalType("");
    setSelectedUserId(null);
  };

  const handleBanir = async () => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.patch(`http://127.0.0.1:8000/v1/block/${selectedUserId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsuarios((prevUsuarios) =>
        prevUsuarios.filter((usuario) => usuario.id !== selectedUserId)
      );
      abrirModal("success");
    } catch (error) {
      console.error("Erro ao banir usuário:", error);
      const detail = error.response?.data?.detail;
      setErrorMessage(detail || "Erro ao banir o usuário. Tente novamente mais tarde.");
      abrirModal("error");
    }
  };

  const dados = usuarios.map((usuario) => ({
    nome: usuario.full_name,
    cpf: usuario.cpf,
    ocupacao: usuario.occupation,
    telefone: usuario.phone,
    acoes: (
      <DeleteButton
        label="Banir"
        className="delete-button"
        onClick={() => {
          setSelectedUserId(usuario.id);
          abrirModal("confirm");
        }}
      />
    ),
  }));

  return (
    <>
      <Header />
      <MainContent
        title="Bloquear usuários"
        subtitle="Clique no usuário que deseja bloquear. Usuários são bloqueados por infringirem regras do Complexo Esportivo."
        path={"/admin-usuarios-menu-banimento"}
      />

      <TableList cabecalho={cabecalho} dados={dados} />

      {isModalOpen && modalType === "confirm" && (
        <ModalTwoOptions
          iconName="triangulo-amarelo"
          modalText="Tem certeza que deseja banir este usuário?"
          buttonTextOne="Banir"
          buttonColorOne="red"
          buttonTextTwo="Cancelar"
          onClickButtonOne={handleBanir}
          onClickButtonTwo={fecharModal}
        />
      )}

      {isModalOpen && modalType === "success" && (
        <ModalOneOption
          iconName="sucesso-check"
          modalText="Usuário banido com sucesso!"
          buttonText="Fechar"
          onClick={fecharModal}
        />
      )}

      {isModalOpen && modalType === "error" && (
        <ModalOneOption
          iconName="X"
          modalText={errorMessage}
          buttonText="Fechar"
          onClick={fecharModal}
        />
      )}
    </>
  );
}

export default AdminUsuariosBanir;