import React, { useState, useEffect } from "react";
import "./CadastrarReserva.css";
import ConfigIcon from "./components/LogoutIcon/LogoutIcon";
import TrashIcon from "./components/TrashIcon/TrashIcon";
import ArrowIcon from "./components/ArrowIcon/ArrowIcon";
import DateTimePicker from "./components/DateTimePicker/DateTimePicker";
import ConfirmIcon from "./components/ConfirmIcon/ConfirmIcon";
import CancelIcon from "./components/CancelIcon/CancelIcon";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import ModalTwoOptions from "./components/Modal/ModalTwoOptions";
import ModalOneOption from "./components/Modal/ModalOneOption";
import axios from "axios";

const CadastrarReserva = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [ufcgParticipantInputs, setUfcgParticipantInputs] = useState([]);
  const [externalParticipantInputs, setExternalParticipantInputs] = useState([]);
  const [ufcgParticipants, setUfcgParticipants] = useState([]);
  const [externalParticipants, setExternalParticipants] = useState([]);
  const [users, setUsers] = useState([]); // Lista de usuários cadastrados
  const [responsavel, setResponsavel] = useState(null); // Participante responsável
  const [selectedDate, setSelectedDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [arenas, setArenas] = useState([]);
  const [arenaId, setArenaId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Função para buscar arenas disponíveis
  const fetchArenas = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get("http://127.0.0.1:8000/v1/arenas/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (Array.isArray(response.data.data)) {
        setArenas(response.data.data);
      } else {
        console.error("Resposta inesperada da API:", response.data);
        setErrorMessage("Erro ao carregar arenas. Resposta inesperada do servidor.");
      }
    } catch (error) {
      console.error("Erro ao buscar arenas:", error);
      setErrorMessage("Erro ao carregar arenas. Tente novamente mais tarde.");
    }
  };

  // Função para buscar usuários cadastrados
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get("http://127.0.0.1:8000/v1/users/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (Array.isArray(response.data)) {
        setUsers(response.data); // Atualiza a lista de usuários cadastrados
      } else {
        console.error("Resposta inesperada da API:", response.data);
        setErrorMessage("Erro ao carregar usuários. Resposta inesperada do servidor.");
      }
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      setErrorMessage("Erro ao carregar usuários. Tente novamente mais tarde.");
    }
  };

  // Função para adicionar participante da UFCG
  const addUfcgParticipant = (index) => {
    const email = ufcgParticipantInputs[index].email;
    const user = users.find((u) => u.email === email && u.is_internal); // Verifica se o usuário é da UFCG
    if (user) {
      setUfcgParticipants([...ufcgParticipants, { name: user.full_name, email: user.email, id: user.id }]);
      setUfcgParticipantInputs(ufcgParticipantInputs.filter((_, i) => i !== index));
    } else {
      setErrorMessage("Usuário não encontrado ou não é da UFCG.");
    }
  };

  // Função para adicionar participante externo
  const addExternalParticipant = (index) => {
    const email = externalParticipantInputs[index].email;
    const user = users.find((u) => u.email === email && !u.is_internal); // Verifica se o usuário é externo
    if (user) {
      setExternalParticipants([...externalParticipants, { name: user.full_name, email: user.email, id: user.id }]);
      setExternalParticipantInputs(externalParticipantInputs.filter((_, i) => i !== index));
    } else {
      setErrorMessage("Usuário não encontrado ou não é externo.");
    }
  };

  const subtractHours = (date, hours) => {
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() - hours);
    return newDate;
  };

  // Função para cadastrar reserva
  const handleCadastrarReserva = async () => {
    try {
      const token = localStorage.getItem("access_token");

      // Remove duplicados dos participantes
      const uniqueParticipants = [...new Set([
        ...(responsavel?.id ? [responsavel.id] : []), // Inclui o responsável se existir
        ...ufcgParticipants.map((p) => p.id), // IDs dos participantes da UFCG
        ...externalParticipants.map((p) => p.id), // IDs dos participantes externos
      ])];

      // Ajusta os horários subtraindo 3 horas
      const adjustedStartDate = subtractHours(new Date(selectedDate), 3).toISOString();
      const adjustedEndDate = subtractHours(new Date(endDate), 3).toISOString();

      // Dados dinâmicos para envio
      const dadosParaEnvio = {
        responsible_user_id: responsavel?.id || "", // Garante que seja uma string válida
        arena_id: String(arenaId), // Converte para string
        start_date: adjustedStartDate, // Data e hora de início ajustada
        end_date: adjustedEndDate, // Data e hora de término ajustada
        participants: uniqueParticipants, // Lista de participantes únicos
      };

      console.log("Dados enviados para o backend:", dadosParaEnvio);

      // Envia a requisição para o backend
      const response = await axios.post("http://127.0.0.1:8000/v1/reservations/", dadosParaEnvio, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Reserva realizada com sucesso:", response.data);
      setModalType("reserva-realizada");
      setIsModalOpen(true);
    } catch (error) {
      console.error("Erro ao cadastrar reserva:", error);

      // Exibe o motivo do erro no console para depuração
      if (error.response && error.response.data) {
        console.error("Detalhes do erro:", error.response.data);
        setErrorMessage(error.response.data.detail || "Erro ao cadastrar reserva. Verifique os dados e tente novamente.");
      } else {
        setErrorMessage("Erro ao cadastrar reserva. Tente novamente mais tarde.");
      }
    }
  };

  useEffect(() => {
    fetchArenas();
    fetchUsers(); // Busca os usuários cadastrados ao montar o componente
  }, []);

  return (
    <div className="container-cadastrar-reserva">
      <Header />
      <MainContent title="Cadastrar Reserva" path={"/visualizar-reservas"} />
      <section className="form-section">
        <div className="form-grid">
          <div className="input-group">
            <label htmlFor="esporte">Esporte</label>
            <select
              id="esporte"
              className="select-input"
              value={arenaId || ""}
              onChange={(e) => setArenaId(e.target.value)}
            >
              <option value="">Selecione uma arena</option>
              {arenas.map((arena) => (
                <option key={arena.id} value={arena.id}>
                  {arena.name}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="data-hora">DATA E HORA INÍCIO</label>
            <DateTimePicker selectedDate={selectedDate} onChange={setSelectedDate} />
          </div>
          <div className="input-group">
            <label htmlFor="data-hora-fim">DATA E HORA FIM</label>
            <DateTimePicker selectedDate={endDate} onChange={setEndDate} />
          </div>
        </div>
        <div className="participants-section">
          <h3 className="section-title">PARTICIPANTES</h3>
          <div className="participant-group">
            <div className="title-and-button">
              <h4 className="sub-title">UFCG</h4>
              <div className="add-button" onClick={() => setUfcgParticipantInputs([...ufcgParticipantInputs, { email: "" }])}>
                <ion-icon name="add-circle-outline" className="add-button"></ion-icon>
              </div>
            </div>
            {ufcgParticipantInputs.map((participant, index) => (
              <div key={index} className="participant-item">
                <input
                  type="email"
                  placeholder="Email"
                  value={participant.email}
                  onChange={(e) => {
                    const updatedInputs = [...ufcgParticipantInputs];
                    updatedInputs[index].email = e.target.value;
                    setUfcgParticipantInputs(updatedInputs);
                  }}
                />
                <div className="action-buttons">
                  <ConfirmIcon onClick={() => addUfcgParticipant(index)} />
                  <CancelIcon
                    onClick={() => setUfcgParticipantInputs(ufcgParticipantInputs.filter((_, i) => i !== index))}
                  />
                </div>
              </div>
            ))}
            <div className="participant-list">
              {ufcgParticipants.map((participant, index) => (
                <div key={index} className="participant-item">
                  <span>{participant.name}</span>
                  <span className="participant-email">{participant.email}</span>
                  <div className="action-icons">
                    <input
                      type="radio"
                      name="responsavel"
                      checked={responsavel?.id === participant.id}
                      onChange={() => setResponsavel(participant)}
                    />
                    <label className="responsavel-label">Responsável</label>
                    <TrashIcon onClick={() => setUfcgParticipants(ufcgParticipants.filter((_, i) => i !== index))} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="participant-group">
            <div className="title-and-button">
              <h4 className="sub-title">USUÁRIOS EXTERNOS</h4>
              <div className="add-button" onClick={() => setExternalParticipantInputs([...externalParticipantInputs, { email: "" }])}>
                <ion-icon name="add-circle-outline" className="add-button"></ion-icon>
              </div>
            </div>
            {externalParticipantInputs.map((participant, index) => (
              <div key={index} className="participant-item">
                <input
                  type="email"
                  placeholder="Email"
                  value={participant.email}
                  onChange={(e) => {
                    const updatedInputs = [...externalParticipantInputs];
                    updatedInputs[index].email = e.target.value;
                    setExternalParticipantInputs(updatedInputs);
                  }}
                />
                <div className="action-buttons">
                  <ConfirmIcon onClick={() => addExternalParticipant(index)} />
                  <CancelIcon
                    onClick={() => setExternalParticipantInputs(externalParticipantInputs.filter((_, i) => i !== index))}
                  />
                </div>
              </div>
            ))}
            <div className="participant-list">
              {externalParticipants.map((participant, index) => (
                <div key={index} className="participant-item">
                  <span>{participant.name}</span>
                  <span className="participant-email">{participant.email}</span>
                  <div className="action-icons">
                    <input
                      type="radio"
                      name="responsavel"
                      checked={responsavel?.id === participant.id}
                      onChange={() => setResponsavel(participant)}
                    />
                    <label className="responsavel-label">Responsável</label>
                    <TrashIcon onClick={() => setExternalParticipants(externalParticipants.filter((_, i) => i !== index))} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="submit-button-container">
          <button className="submit-button" onClick={handleCadastrarReserva}>
            Cadastrar Reserva
          </button>
        </div>
      </section>
    </div>
  );
};

export default CadastrarReserva;