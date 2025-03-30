import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DeleteButton from "./components/Buttons/DeleteButton";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import TableList from "./components/TableList/TableList";
import ModalTwoOptions from "./components/Modal/ModalTwoOptions";
import ModalOneOption from "./components/Modal/ModalOneOption";
import axios from "axios";

function AdminUsuariosVisualizarBanidos() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]); // Estado para armazenar os usuários banidos
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null); // Armazena o ID do usuário selecionado
  const [errorMessage, setErrorMessage] = useState(""); // Estado para mensagens de erro

  const cabecalho = ["Nome", "CPF", "Ocupação", "Telefone", "Ações"];

  // Função para buscar os usuários banidos da API
  useEffect(() => {
    const fetchUsuariosBanidos = async () => {
      try {
        const token = localStorage.getItem("access_token"); // Obtém o token do localStorage

        if (!token) {
          throw new Error("Token não encontrado. Faça login novamente.");
        }

        const response = await axios.get("http://127.0.0.1:8000/v1/users/block", {
          headers: {
            Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
          },
        });

        setUsuarios(response.data); // Atualiza o estado com os dados retornados
      } catch (error) {
        console.error("Erro ao buscar usuários banidos:", error);

        if (error.response && error.response.status === 422) {
          setErrorMessage("Erro nos dados enviados para o servidor. Verifique a configuração da API.");
        } else if (error.response && error.response.status === 401) {
          setErrorMessage("Token inválido ou expirado. Faça login novamente.");
        } else {
          setErrorMessage("Erro ao carregar os usuários banidos. Tente novamente mais tarde.");
        }
      }
    };

    fetchUsuariosBanidos();
  }, []);

  // Função para desbanir um usuário
  const handleDesbanirUsuario = async () => {
    try {
      const token = localStorage.getItem("access_token"); // Obtém o token do localStorage
      await axios.patch(`http://127.0.0.1:8000/v1/users/unblock/${selectedUserId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
        },
      });
      // Atualiza a lista de usuários após o desbloqueio
      setUsuarios((prevUsuarios) => prevUsuarios.filter((usuario) => usuario.id !== selectedUserId));
      setModalType("usuario-restaurado"); // Exibe o modal de sucesso
    } catch (error) {
      console.error("Erro ao desbanir usuário:", error);
      setErrorMessage("Erro ao desbanir o usuário. Tente novamente mais tarde.");
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
        label="Desbanir"
        className="delete-button"
        onClick={() => {
          setSelectedUserId(usuario.id); // Define o ID do usuário selecionado
          setIsModalOpen(true);
          setModalType("desbanir-usuario");
        }}
      />
    ),
  }));

  return (
    <>
      <Header />
      <MainContent
        title="Usuários Bloqueados"
        subtitle="Você pode desbanir usuários nesta lista. Usuários são bloqueados por infringirem regras do Complexo Esportivo."
        path={"/admin-usuarios-menu-banimento"}
      />

      {errorMessage ? (
        <p className="error-message">{errorMessage}</p> // Exibe mensagem de erro, se houver
      ) : (
        <TableList cabecalho={cabecalho} dados={dados} />
      )}

      {/* Modal exibido ao clicar para restaurar/desbanir usuário */}
      {isModalOpen && modalType === "desbanir-usuario" && (
        <ModalTwoOptions
          iconName="triangulo-amarelo"
          modalText="Tem certeza que deseja restaurar este usuário ao sistema?"
          buttonTextOne="Desbanir"
          buttonColorOne="red"
          onClickButtonOne={handleDesbanirUsuario}
          buttonTextTwo="Cancelar"
          onClickButtonTwo={() => setIsModalOpen(false)}
        />
      )}

      {/* Modal exibido após desbanir o usuário com sucesso */}
      {isModalOpen && modalType === "usuario-restaurado" && (
        <ModalOneOption
          iconName="sucesso-check"
          modalText="Usuário desbloqueado com sucesso!"
          buttonText="Voltar"
          onClick={() => {
            setIsModalOpen(false);
            navigate("/admin-visualizar-usuarios-banidos"); // Adiciona navegação manualmente
          }}
        />
      )}
    </>
  );
}

export default AdminUsuariosVisualizarBanidos;