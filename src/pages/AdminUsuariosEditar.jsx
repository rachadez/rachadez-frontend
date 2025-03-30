import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DefaultButton from "./components/Buttons/DefaultButton";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import TableList from "./components/TableList/TableList";
import axios from "axios";

function AdminUsuariosEditar() {
  const navigate = useNavigate();
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
        setUsuarios(response.data); // Atualiza o estado com os dados retornados
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        setErrorMessage("Erro ao carregar os usuários. Tente novamente mais tarde.");
      }
    };

    fetchUsuarios();
  }, []);

  // Mapeia os dados da API para o formato esperado pela tabela
  const dados = usuarios.map((usuario) => ({
    nome: usuario.full_name,
    cpf: usuario.cpf,
    ocupacao: usuario.occupation,
    telefone: usuario.phone,
    acoes: (
      <DefaultButton
        label="Editar"
        onClick={() => navigate(`/admin-editar-usuario/${usuario.id}`)} // Redireciona para a página de edição
      />
    ),
  }));

  return (
    <>
      <Header />
      <MainContent
        title="Edite um usuário"
        subtitle="Clique no usuário que deseja editar informações. Você pode alterar quaisquer campos que desejar."
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

export default AdminUsuariosEditar;