import React, { useEffect, useState } from "react";
import DeleteButton from "./components/Buttons/DeleteButton";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import TableList from "./components/TableList/TableList";
import axios from "axios";
import ModalOneOption from "./components/Modal/ModalOneOption"
import ModalTwoOptions from "./components/Modal/ModalTwoOptions";

function AdminUsuariosExcluir() {
  const [usuarios, setUsuarios] = useState([]); // Estado para armazenar os usuários
  const [errorMessage, setErrorMessage] = useState(""); // Estado para mensagens de erro
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const cabecalho = ["Nome", "CPF", "Ocupação", "Telefone"]; // Removida a coluna "Ações"

  // Função para buscar os usuários da API
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem("access_token"); // Obtém o token do localStorage
        const response = await axios.get("http://127.0.0.1:8000/v1/users/", {
          params: {
            offset: 0,
            limit: 100, // Limite de usuários a serem buscados
          },
          headers: {
            Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
          },
        });
        setUsuarios(response.data); // Atualiza o estado com os dados retornados
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        setErrorMessage("Erro ao carregar os usuários. Tente novamente mais tarde.");
        setIsModalOpen(true);
      }
    };

    fetchUsuarios();
  }, []);

  // Função para excluir um usuário
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("access_token"); // Obtém o token do localStorage
      await axios.delete(`http://127.0.0.1:8000/v1/users/${selectedUserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Atualiza a lista de usuários após a exclusão
      setUsuarios((prev) => prev.filter((u) => u.id !== selectedUserId));
      setSuccessModalOpen(true);
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);

      if (error.response && error.response.data && error.response.data.detail) {
        setErrorMessage(error.response.data.detail);
      } else {
        setErrorMessage("Erro ao excluir o usuário. Tente novamente mais tarde.");
      }
      
      setIsModalOpen(true);
    } finally {
      setShowConfirmModal(false);
      setSelectedUserId(null); 
    }
  };

  // Mapeia os dados da API para o formato esperado pela tabela
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
          setSelectedUserId(usuario.id); //  guarda o ID
          setShowConfirmModal(true);     //  mostra o modal
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

      {isModalOpen && (
        <ModalOneOption
          iconName="X"
          modalText={errorMessage}
          buttonText="Tentar novamente"
          onClick={() => setIsModalOpen(false)}
        />
      )}

    {showConfirmModal && (
      <ModalTwoOptions
        iconName="triangulo-amarelo"
        modalText="Tem certeza que deseja excluir este usuário?"
        buttonTextOne="Excluir"
        buttonColorOne="red"
        buttonTextTwo="Cancelar"
        onClickButtonOne={handleDelete}
        onClickButtonTwo={() => setShowConfirmModal(false)}
        />
      )}

    {successModalOpen && (
      <ModalOneOption
        iconName="sucesso-check"
        modalText={"Usuário deletado com sucesso!"}
        buttonText="Fechar"
        onClick={() => setSuccessModalOpen(false)}
      />
    )}
    </>
  );
}

export default AdminUsuariosExcluir;