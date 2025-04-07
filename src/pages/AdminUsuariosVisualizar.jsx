import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultButton from "./components/Buttons/DefaultButton";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import TableList from "./components/TableList/TableList";
import axios from "axios";

function AdminUsuariosVisualizar() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const cabecalho = ["Nome", "CPF", "Ocupação", "Telefone"];

  useEffect(() => {
    const fetchUsuarios = async () => {
      const token = localStorage.getItem("access_token");
      console.log("Token atual:", token);

      if (!token) {
        setErrorMessage("Você não está autenticado. Faça login para acessar os usuários.");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("http://127.0.0.1:8000/v1/users/", {
          params: {
            offset: 0,
            limit: 100,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Filtra os usuários para excluir os administradores
        const usuariosFiltrados = response.data.filter((usuario) => !usuario.is_admin);
        setUsuarios(usuariosFiltrados);
      } catch (error) {
        if (error.response) {
          console.error("Erro na resposta da API:", error.response);
          if (error.response.status === 403) {
            const detail = error.response.data.detail || "Acesso negado.";
            setErrorMessage(`Erro: ${detail}`);
            console.log("Detalhes do erro:", detail);
            localStorage.removeItem("access_token");
            navigate("/login");
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
  }, [navigate]);

  const dados = usuarios.map((usuario) => ({
    nome: usuario.full_name,
    cpf: usuario.cpf,
    ocupacao: usuario.occupation,
    telefone: usuario.phone,
    acoes: (
      <DefaultButton
        label="Visualizar"
        onClick={() => navigate(`/admin-visualizar-usuario/${usuario.id}`)}
      />
    ),
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
        <p className="error-message">{errorMessage}</p>
      ) : (
        <TableList cabecalho={cabecalho} dados={dados} />
      )}
    </>
  );
}

export default AdminUsuariosVisualizar;