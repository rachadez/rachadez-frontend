import React, { useEffect, useState } from "react";
import DeleteButton from "./components/Buttons/DeleteButton";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import TableList from "./components/TableList/TableList";
import axios from "axios";
import ModalOneOption from "./components/Modal/ModalOneOption";
import ModalTwoOptions from "./components/Modal/ModalTwoOptions";

function AdminUsuariosExcluir() {
  const [usuarios, setUsuarios] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);

  const cabecalho = ["Nome", "CPF", "Ocupação", "Telefone"];

  const abrirModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const fecharModal = () => {
    setModalType("");
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get("http://127.0.0.1:8000/v1/users/", {
          params: { offset: 0, limit: 100 },
          headers: { Authorization: `Bearer ${token}` },
        });

        // Filtra os usuários para excluir os administradores
        const usuariosFiltrados = response.data.filter((usuario) => !usuario.is_admin);
        setUsuarios(usuariosFiltrados);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        setErrorMessage("Erro ao carregar os usuários. Tente novamente mais tarde.");
        abrirModal("erro");
      }
    };

    fetchUsuarios();
  }, []);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.delete(`http://127.0.0.1:8000/v1/users/${selectedUserId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsuarios((prev) => prev.filter((u) => u.id !== selectedUserId));
      abrirModal("sucesso");
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);

      if (error.response && error.response.data && error.response.data.detail) {
        setErrorMessage(error.response.data.detail);
      } else {
        setErrorMessage("Erro ao excluir o usuário. Tente novamente mais tarde.");
      }

      abrirModal("erro");
    } finally {
      setSelectedUserId(null);
    }
  };

  const dados = usuarios.map((usuario) => ({
    nome: usuario.full_name,
    cpf: usuario.cpf,
    ocupacao: usuario.occupation,
    telefone: usuario.phone,
    acoes: (
      <DeleteButton
        label="Excluir"
        className="delete-button"
        onClick={() => {
          setSelectedUserId(usuario.id);
          abrirModal("confirmacao");
        }}
      />
    ),
  }));

  return (
    <>
      <Header />
      <MainContent
        title="Excluir usuários"
        subtitle="Clique no usuário que deseja excluir. Tome as devidas precauções ao efetuar esta operação."
        path={"/usuarios-menu"}
      />

      <TableList cabecalho={cabecalho} dados={dados} />

      {isModalOpen && modalType === "erro" && (
        <ModalOneOption
          iconName="X"
          modalText={errorMessage}
          buttonText="Tentar novamente"
          onClick={fecharModal}
        />
      )}

      {isModalOpen && modalType === "confirmacao" && (
        <ModalTwoOptions
          iconName="triangulo-amarelo"
          modalText="Tem certeza que deseja excluir este usuário?"
          buttonTextOne="Excluir"
          buttonColorOne="red"
          buttonTextTwo="Cancelar"
          onClickButtonOne={handleDelete}
          onClickButtonTwo={fecharModal}
        />
      )}

      {isModalOpen && modalType === "sucesso" && (
        <ModalOneOption
          iconName="sucesso-check"
          modalText="Usuário deletado com sucesso!"
          buttonText="Fechar"
          onClick={fecharModal}
        />
      )}
    </>
  );
}

export default AdminUsuariosExcluir;