import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DefaultButton from "./components/Buttons/DefaultButton";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import TableList from "./components/TableList/TableList";
import axios from "axios";

function AdminUsuariosEditar() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const cabecalho = ["Nome", "CPF", "Ocupação", "Telefone"];

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
      }
    };

    fetchUsuarios();
  }, []);

  const dados = usuarios.map((usuario) => ({
    nome: usuario.full_name,
    cpf: usuario.cpf,
    ocupacao: usuario.occupation,
    telefone: usuario.phone,
    acoes: (
      <DefaultButton
        label="Editar"
        onClick={() => navigate(`/admin-editar-usuario/${usuario.id}`)}
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
        <p className="error-message">{errorMessage}</p>
      ) : (
        <TableList cabecalho={cabecalho} dados={dados} />
      )}
    </>
  );
}

export default AdminUsuariosEditar;