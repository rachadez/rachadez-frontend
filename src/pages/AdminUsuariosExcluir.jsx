import React, { useEffect, useState } from "react";
import DeleteButton from "./components/Buttons/DeleteButton";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import TableList from "./components/TableList/TableList";
import axios from "axios";

function AdminUsuariosExcluir() {
  const [usuarios, setUsuarios] = useState([]); // Estado para armazenar os usuários
  const [errorMessage, setErrorMessage] = useState(""); // Estado para mensagens de erro

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
      }
    };

    fetchUsuarios();
  }, []);

  // Função para excluir um usuário
  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem("access_token"); // Obtém o token do localStorage
      await axios.delete(`http://127.0.0.1:8000/v1/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
        },
      });
      // Atualiza a lista de usuários após a exclusão
      setUsuarios((prevUsuarios) => prevUsuarios.filter((usuario) => usuario.id !== userId));
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      setErrorMessage("Erro ao excluir o usuário. Tente novamente mais tarde.");
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
        onClick={() => handleDelete(usuario.id)} // Chama a função de exclusão
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

      {errorMessage ? (
        <p className="error-message">{errorMessage}</p> // Exibe mensagem de erro, se houver
      ) : (
        <TableList cabecalho={cabecalho} dados={dados} />
      )}
    </>
  );
}

export default AdminUsuariosExcluir;