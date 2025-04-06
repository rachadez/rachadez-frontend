import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import TableList from "./components/TableList/TableList";
import { useNavigate } from "react-router-dom";
import MainContentWithoutArrow from "./components/MainContentWithoutArrow/MainContentWithoutArrow";
import { CalendarSearch } from "lucide-react";
import axios from "axios";
import "./UserHome.css";

const UserHome = () => {
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]); // Estado para armazenar as reservas
  const [errorMessage, setErrorMessage] = useState(""); // Estado para mensagens de erro

  const cabecalho = ["Reserva", "Data", "Hora", "Participantes"];

  // Função para buscar o usuário logado e suas reservas
  const fetchUserAndReservas = async () => {
    try {
      const token = localStorage.getItem("access_token"); // Obtém o token do localStorage
      if (!token) {
        setErrorMessage("Usuário não autenticado.");
        return;
      }

      // Faz a requisição ao endpoint para obter os dados do usuário logado
      const userResponse = await axios.get("http://127.0.0.1:8000/v1/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user_id = userResponse.data.id; // Obtém o user_id do usuário logado
      console.log("Dados do usuário logado:", userResponse.data);

      // Faz a requisição ao endpoint para buscar as reservas do usuário
      const reservasResponse = await axios.get(`http://127.0.0.1:8000/v1/reservations/${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Reservas do usuário:", reservasResponse.data);
      setReservas(reservasResponse.data); // Atualiza o estado com as reservas
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      if (error.response) {
        if (error.response.status === 403) {
          setErrorMessage("Acesso negado. Você não tem permissão para acessar estas informações.");
        } else if (error.response.status === 404) {
          setErrorMessage("Nenhuma reserva encontrada.");
        } else {
          setErrorMessage("Erro ao carregar os dados. Tente novamente mais tarde.");
        }
      } else {
        setErrorMessage("Erro de conexão. Verifique sua internet e tente novamente.");
      }
    }
  };

  // useEffect para buscar os dados do usuário e as reservas ao carregar a página
  useEffect(() => {
    fetchUserAndReservas();
  }, []);

  const handleView = (id) => {
    navigate(`/user-visualizar-reserva/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/user-editar-reserva/${id}`);
  };

  const handleDelete = async (reservationId) => {
    try {
      const token = localStorage.getItem("access_token");

      // Obter o ID do usuário logado
      const userResponse = await axios.get("http://127.0.0.1:8000/v1/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userId = userResponse.data.id; // Obtém o user_id do usuário logado

      // Faz a requisição DELETE para cancelar a reserva
      await axios.delete(`http://127.0.0.1:8000/v1/reservations/${userId}/${reservationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove a reserva do estado local
      setReservas((prevReservas) => prevReservas.filter((reserva) => reserva.id !== reservationId));
      console.log(`Reserva ${reservationId} deletada com sucesso.`);
    } catch (error) {
      console.error("Erro ao deletar reserva:", error);
      setErrorMessage("Erro ao deletar a reserva. Tente novamente mais tarde.");
    }
  };

  return (
    <>
      <Header />
      <MainContentWithoutArrow title={"Minhas reservas"} buttonText={"Cadastrar reserva"} path={"/user-reserva-modalidade"} />

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {reservas.length > 0 ? (
        <TableList
          cabecalho={cabecalho}
          dados={reservas.map((reserva) => ({
            id: reserva.id, // Certifique-se de que o ID está sendo passado
            data: new Date(reserva.start_date).toLocaleDateString(),
            hora: new Date(reserva.start_date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            participantes: reserva.participants.length,
          }))}
          hideAcoes={true} // Garante que os botões de ação sejam exibidos
          handleView={handleView}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ) : (
        <div className="reservation-not-found">
          <CalendarSearch color="#717171" size={350} strokeWidth={0.1} />
          <p>Nenhuma reserva encontrada :(</p>
        </div>
      )}
    </>
  );
};

export default UserHome;