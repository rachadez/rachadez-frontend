import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultButton from "./components/Buttons/DefaultButton";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import TableList from "./components/TableList/TableList";
import axios from "axios";

function AdminUsuariosVisualizar() {
  const navigate = useNavigate(); // Hook para redirecionamento
  const [usuarios, setUsuarios] = useState([]); // Estado para armazenar os usuários
  const [errorMessage, setErrorMessage] = useState(""); // Estado para mensagens de erro

  const cabecalho = ["Nome", "CPF", "Ocupação", "Telefone"];

  // Função para buscar os usuários da API
  useEffect(() => {
    const fetchUsuarios = async () => {
      const token = localStorage.getItem("access_token"); // Obtém o token do localStorage
      console.log("Token atual:", token); // Log para verificar o token

      if (!token) {
        setErrorMessage("Você não está autenticado. Faça login para acessar os usuários.");
        navigate("/login"); // Redireciona para a página de login
        return;
      }

      try {
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
        if (error.response) {
          console.error("Erro na resposta da API:", error.response);
          if (error.response.status === 403) {
            const detail = error.response.data.detail || "Acesso negado.";
            setErrorMessage(`Erro: ${detail}`);
            console.log("Detalhes do erro:", detail); // Log para depuração
            localStorage.removeItem("access_token"); // Remove o token inválido
            navigate("/login"); // Redireciona para a página de login
          } else {
            setErrorMessage(`Erro ao carregar os usuários: ${error.response.data.detail || "Tente novamente mais tarde."}`);
          }
        } else {
          console.error("Erro ao fazer a requisição:", error);
          setErrorMessage("Erro ao carregar os usuários. Tente novamente mais tarde.");
        }
      }
    };

    fetchUsuarios();
  }, [navigate]); // Adiciona navigate como dependência

  // Mapeia os dados da API para o formato esperado pela tabela
  const dados = usuarios.map((usuario) => ({
    nome: usuario.full_name,
    cpf: usuario.cpf,
    ocupacao: usuario.occupation,
    telefone: usuario.phone,
  }));

  return (
    <>
      <Header />
      <MainContent
        title="Visualizar usuários"
        subtitle="Aqui, encontram-se todos os usuários do sistema, desde membros da UFCG a Usuários Externos."
        path={"/usuarios-menu"}
      />

      {errorMessage ? (
        <p className="error-message">{errorMessage}</p> // Exibe mensagem de erro, se houver
      ) : (
        <TableList
          cabecalho={cabecalho}
          dados={dados}
          botao={<DefaultButton label="Ver" />}
        />
      )}
    </>
  );
}

export default AdminUsuariosVisualizar;