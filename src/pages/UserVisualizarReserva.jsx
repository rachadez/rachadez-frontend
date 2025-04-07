import React, { useEffect, useState } from "react";
import "./CadastrarReserva.css";
import { Calendar, Clock4 } from "lucide-react";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UserVisualizarReserva = () => {
  const { id: reservation_id } = useParams(); // Captura o reservation_id da URL
  const navigate = useNavigate();
  const [reservaData, setReservaData] = useState(null); // Estado para armazenar os dados da reserva
  const [errorMessage, setErrorMessage] = useState(""); // Estado para mensagens de erro

  // Função para buscar o user_id do usuário logado
  const fetchUserId = async () => {
    try {
      const token = localStorage.getItem("access_token"); // Obtém o token do localStorage
      if (!token) {
        setErrorMessage("Usuário não autenticado. Faça login novamente.");
        navigate("/login"); // Redireciona para a página de login
        return null;
      }

      const response = await axios.get("http://127.0.0.1:8000/v1/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.id; // Retorna o user_id
    } catch (error) {
      console.error("Erro ao buscar o ID do usuário:", error);
      setErrorMessage("Erro ao carregar os dados do usuário. Tente novamente mais tarde.");
      return null;
    }
  };

  // Função para buscar os dados da reserva
  const fetchReserva = async (user_id) => {
    try {
      const token = localStorage.getItem("access_token"); // Obtém o token do localStorage
      const url = `http://127.0.0.1:8000/v1/reservations/${user_id}/${reservation_id}`;
      console.log("URL da requisição:", url);

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReservaData(response.data); // Atualiza o estado com os dados da reserva
    } catch (error) {
      console.error("Erro ao buscar os dados da reserva:", error);
      if (error.response && error.response.status === 404) {
        setErrorMessage("Reserva não encontrada.");
      } else if (error.response && error.response.status === 405) {
        setErrorMessage("Método não permitido. Verifique a configuração do backend.");
      } else {
        setErrorMessage("Erro ao carregar os dados da reserva. Tente novamente mais tarde.");
      }
    }
  };

  // useEffect para buscar os dados da reserva ao carregar o componente
  useEffect(() => {
    const fetchData = async () => {
      const user_id = await fetchUserId(); // Busca o user_id do usuário logado
      if (user_id) {
        await fetchReserva(user_id); // Busca os dados da reserva
      }
    };

    fetchData();
  }, [reservation_id]);

  if (errorMessage) {
    return <p className="error-message">{errorMessage}</p>;
  }

  if (!reservaData) {
    return <p>Carregando dados da reserva...</p>;
  }

  const dataFormatada = new Date(reservaData.start_date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const horaFormatada = new Date(reservaData.start_date).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="container-cadastrar-reserva">
      <Header />
      <MainContent title={`Reserva - Quadra ${reservaData.arena_id}`} path={"/user-home"} />
      <section className="form-section">
        <div className="date-time-section">
          <div className="input-date-time">
            <h3 className="section-title">DATA E HORA</h3>
            <div className="view-date-time">
              <Calendar color="#0B53B8" />
              <p>{dataFormatada}</p>
            </div>
            <div className="view-date-time">
              <Clock4 color="#0B53BB" />
              <p>{horaFormatada}</p>
            </div>
          </div>
        </div>

        <div className="participants-section">
          <h3 className="section-title">PARTICIPANTES</h3>

          {/* Participantes */}
          <div className="participant-group">
            <div className="title-and-button">
              <h4 className="sub-title">PARTICIPANTES</h4>
            </div>
            <div className="participant-list">
              {reservaData.participants.map((participant, index) => (
                <div key={index} className="participant-item">
                  <span>{participant.name}</span>
                  <span className="participant-email">{participant.email}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserVisualizarReserva;