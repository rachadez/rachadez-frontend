import React, { useEffect, useState } from "react";
import DeleteButton from "./components/Buttons/DeleteButton";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import TableList from "./components/TableList/TableList";
import axios from "axios";

function AdminUsuariosBanir() {
  const [usuarios, setUsuarios] = useState([]); // Estado para armazenar os usuários
  const [errorMessage, setErrorMessage] = useState(""); // Estado para mensagens de erro

  const cabecalho = ["Nome", "CPF", "Ocupação", "Telefone"];

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
        // Filtra usuários não banidos, caso o backend não faça isso automaticamente
        const usuariosNaoBanidos = response.data.filter((usuario) => usuario.is_active);
        setUsuarios(usuariosNaoBanidos); // Atualiza o estado com os dados filtrados
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        setErrorMessage("Erro ao carregar os usuários. Tente novamente mais tarde.");
      }
    };

    fetchUsuarios();
  }, []);

  // Função para banir um usuário
  const handleBanir = async (userId) => {
    try {
      const token = localStorage.getItem("access_token"); // Obtém o token do localStorage
      await axios.patch(`http://127.0.0.1:8000/v1/block/${userId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
        },
      });

      console.log(`Usuário ${userId} banido com sucesso.`);

      // Atualiza a lista de usuários após o bloqueio
      setUsuarios((prevUsuarios) => prevUsuarios.filter((usuario) => usuario.id !== userId));
    } catch (error) {
      console.error("Erro ao banir usuário:", error);

      if (error.response && error.response.status === 422) {
        setErrorMessage("Erro nos dados enviados para o servidor. Verifique a configuração da API.");
      } else {
        setErrorMessage("Erro ao banir o usuário. Tente novamente mais tarde.");
      }
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
        label="Banir"
        className="delete-button"
        onClick={() => handleBanir(usuario.id)} // Chama a função de banir
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

      {errorMessage ? (
        <p className="error-message">{errorMessage}</p> // Exibe mensagem de erro, se houver
      ) : (
        <TableList cabecalho={cabecalho} dados={dados} />
      )}
    </>
  );
}

export default AdminUsuariosBanir;

