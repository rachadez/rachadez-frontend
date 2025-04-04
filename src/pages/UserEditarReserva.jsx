import React, { useState, useEffect } from "react";
import "./CadastrarReserva.css";
import TrashIcon from "./components/TrashIcon/TrashIcon";
import DateTimePicker from "./components/DateTimePicker/DateTimePicker";
import ConfirmIcon from "./components/ConfirmIcon/ConfirmIcon";
import CancelIcon from "./components/CancelIcon/CancelIcon";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import ModalTwoOptions from "./components/Modal/ModalTwoOptions";
import ModalOneOption from "./components/Modal/ModalOneOption";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UserEditarReserva = () => {
  const { id: reservation_id } = useParams(); // Captura o reservation_id da URL
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(""); // Estado para mensagens de erro
  const [isSaving, setIsSaving] = useState(false); // Estado para indicar se está salvando

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

      console.log("Resposta da API:", response.data); // Log da resposta completa da API

      if (!response.data.participants || response.data.participants.length === 0) {
        console.warn("Nenhum participante encontrado na reserva.");
      }

      // Atualiza os dados da reserva com os participantes corretamente
      setReservaData({
        esporte: response.data.sport || `Quadra ${response.data.arena_id}`,
        dataHora: new Date(response.data.start_date),
        participantesUFCG: response.data.participants
          .filter((p) => p.occupation === "ALUNO") // Ajuste para occupation
          .map((p) => ({ name: p.full_name, email: p.email })), // Use full_name e email
        participantesExternos: response.data.participants
          .filter((p) => p.occupation === "EXTERNO") // Ajuste para occupation
          .map((p) => ({ name: p.full_name, email: p.email })), // Use full_name e email
      });

      console.log("Dados processados da reserva:", {
        esporte: response.data.sport || `Quadra ${response.data.arena_id}`,
        dataHora: new Date(response.data.start_date),
        participantesUFCG: response.data.participants.filter((p) => p.occupation === "ALUNO"),
        participantesExternos: response.data.participants.filter((p) => p.occupation === "EXTERNO"),
      });
    } catch (error) {
      console.error("Erro ao buscar os dados da reserva:", error);
      if (error.response) {
        console.error("Detalhes do erro:", error.response.data);
      }
      if (error.response && error.response.status === 404) {
        setErrorMessage("Reserva não encontrada.");
      } else if (error.response && error.response.status === 405) {
        setErrorMessage("Método não permitido. Verifique a configuração do backend.");
      } else {
        setErrorMessage("Erro ao carregar os dados da reserva. Tente novamente mais tarde.");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const user_id = await fetchUserId(); // Busca o user_id do usuário logado
      console.log("User ID retornado:", user_id); // Log do user_id
      if (user_id) {
        await fetchReserva(user_id); // Busca os dados da reserva
      }
    };

    fetchData();
  }, [reservation_id]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [ufcgParticipantInputs, setUfcgParticipantInputs] = useState([]);
  const [externalParticipantInputs, setExternalParticipantInputs] = useState([]);

  const handleEditarClick = () => {
    const horarioAgendado = false;
    const horarioIndisponivel = false;
    const credenciaisInvalidas = false;

    if (horarioAgendado) {
      setModalType("sobrescrever-horario");
    } else if (horarioIndisponivel) {
      setModalType("horario-indisponivel");
    } else if (credenciaisInvalidas) {
      setModalType("credenciais-invalidas");
    } else {
      setModalType("confirmar-cadastro");
    }

    setIsModalOpen(true);
  };

  const handleEditarReserva = () => {
    setModalType("reserva-realizada");
  };

  const [reservaData, setReservaData] = useState({
    esporte: "Esporte X",
    dataHora: new Date("2025-01-01T18:30:00"),
    participantesUFCG: [
      { name: "Fulano de Tal", email: "fulano.tal@curso.ufcg.edu.br" },
      { name: "Ciclano Bla Bla Bla da Silva", email: "ciclano.silva@curso.ufcg.edu.br" },
    ],
    participantesExternos: [
      { name: "Fulano de Tal", email: "fulano.tal@example.com" },
      { name: "Ciclano Bla Bla Bla da Silva", email: "ciclano.silva@example.com" },
    ],
  });

  const handleDateChange = (date) => {
    setReservaData((prev) => ({ ...prev, dataHora: date }));
  };

  const removeParticipant = (index, type) => {
    setReservaData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const addParticipantInput = (type) => {
    if (type === "participantesUFCG") {
      setUfcgParticipantInputs([...ufcgParticipantInputs, { email: "" }]);
    } else {
      setExternalParticipantInputs([...externalParticipantInputs, { email: "" }]);
    }
  };

  const confirmParticipant = (index, type, list, setList) => {
    setReservaData((prev) => ({
      ...prev,
      [type]: [...prev[type], list[index]],
    }));
    setList(list.filter((_, i) => i !== index));
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem("access_token");

      // Função para buscar ID de usuário pelo e-mail
      const fetchUserIdByEmail = async (email) => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/v1/users/user-id/${email}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          return response.data; // Retorna o UUID do usuário
        } catch (error) {
          console.error(`Erro ao buscar ID do usuário com e-mail ${email}:`, error);
          return null; // Retorna null se não conseguir buscar o ID
        }
      };

      // Buscar IDs para os participantes UFCG
      const ufcgParticipants = await Promise.all(
        reservaData.participantesUFCG.map(async (p) => {
          const userId = await fetchUserIdByEmail(p.email);
          return userId ? { id: userId, type: "UFCG" } : null;
        })
      );

      // Buscar IDs para os participantes externos (se necessário)
      const externalParticipants = await Promise.all(
        reservaData.participantesExternos.map(async (p) => {
          const userId = await fetchUserIdByEmail(p.email);
          return userId ? { id: userId, type: "EXTERNAL" } : null;
        })
      );

      // Filtrar participantes válidos
      const validParticipants = [...ufcgParticipants, ...externalParticipants].filter(Boolean);

      // Criar payload para requisição de atualização
      const payload = {
        start_date: reservaData.dataHora.toISOString(),
        end_date: new Date(reservaData.dataHora.getTime() + 3600000).toISOString(),
        participants: validParticipants,
      };

      // Fazer requisição PUT para atualizar a reserva
      await axios.put(`http://127.0.0.1:8000/v1/reservations/${reservation_id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setModalType("reserva-realizada");
      setIsModalOpen(true);
    } catch (error) {
      console.error("Erro ao salvar as alterações:", error);
      setErrorMessage("Erro ao salvar as alterações. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };


  const handleParticipantChange = (index, type, field, value) => {
    setReservaData((prev) => ({
      ...prev,
      [type]: prev[type].map((participant, i) =>
        i === index ? { ...participant, [field]: value } : participant
      ),
    }));
  };

  if (errorMessage) {
    return <p className="error-message">{errorMessage}</p>;
  }

  if (!reservaData) {
    return <p>Carregando dados da reserva...</p>;
  }

  return (
    <div className="container-cadastrar-reserva">
      <Header />
      <MainContent title={reservaData.esporte} subtitle={"Edite as informações desejadas"} path={"/user-home"} />
      <section className="form-section">
        <div className="date-time-section">
          <div className="input-date-time">
            <h3 className="section-title" htmlFor="data-hora">DATA E HORA</h3>
            <DateTimePicker selectedDate={reservaData.dataHora} onChange={handleDateChange} />
          </div>
        </div>
        <div className="participants-section">
          <h3 className="section-title">PARTICIPANTES</h3>

          {/* UFCG Participants */}
          <div className="participant-group">
            <div className="title-and-button">
              <h4 className="sub-title">UFCG</h4>
              <div className="add-button" onClick={() => addParticipantInput("participantesUFCG")}>
                <ion-icon name="add-circle-outline" className="add-button"></ion-icon>
              </div>
            </div>
            {reservaData.participantesUFCG.map((participant, index) => (
              <div key={index} className="participant-item">
                <input
                  type="text"
                  placeholder="Nome"
                  value={participant.name || ""}
                  onChange={(e) => handleParticipantChange(index, "participantesUFCG", "name", e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={participant.email || ""}
                  onChange={(e) => handleParticipantChange(index, "participantesUFCG", "email", e.target.value)}
                />
                <TrashIcon onClick={() => removeParticipant(index, "participantesUFCG")} className="trash-icon" />
              </div>
            ))}
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
                  <ConfirmIcon onClick={() => confirmParticipant(index, "participantesUFCG", ufcgParticipantInputs, setUfcgParticipantInputs)} />
                  <CancelIcon onClick={() => setUfcgParticipantInputs(ufcgParticipantInputs.filter((_, i) => i !== index))} />
                </div>
              </div>
            ))}
          </div>

          {/* External Participants */}
          <div className="participant-group">
            <div className="title-and-button">
              <h4 className="sub-title">USUÁRIOS EXTERNOS</h4>
              <div className="add-button" onClick={() => addParticipantInput("participantesExternos")}>
                <ion-icon name="add-circle-outline" className="add-button"></ion-icon>
              </div>
            </div>
            {reservaData.participantesExternos.map((participant, index) => (
              <div key={index} className="participant-item">
                <input
                  type="text"
                  placeholder="Nome"
                  value={participant.name || ""}
                  onChange={(e) => handleParticipantChange(index, "participantesExternos", "name", e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={participant.email || ""}
                  onChange={(e) => handleParticipantChange(index, "participantesExternos", "email", e.target.value)}
                />
                <TrashIcon onClick={() => removeParticipant(index, "participantesExternos")} className="trash-icon" />
              </div>
            ))}
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
                  <ConfirmIcon onClick={() => confirmParticipant(index, "participantesExternos", externalParticipantInputs, setExternalParticipantInputs)} />
                  <CancelIcon onClick={() => setExternalParticipantInputs(externalParticipantInputs.filter((_, i) => i !== index))} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="submit-button-container">
          <button className="submit-button" onClick={handleSaveChanges} disabled={isSaving}>
            {isSaving ? "Salvando..." : "Salvar Alterações"}
          </button>
        </div>

        {/* Modal de sobrescrever Horário */}
        {isModalOpen && modalType === "sobrescrever-horario" && (
          <ModalTwoOptions
            iconName="triangulo-amarelo"
            modalText="Já existe uma reserva agendada para este horário. Deseja sobrescrever?"
            buttonTextOne="Sim"
            buttonColorOne="red"
            onClickButtonOne={handleEditarReserva}

            buttonTextTwo="Não"
            onClickButtonTwo={() => setIsModalOpen(false)}
          />
        )}

        {/* Modal de reserva realizada */}
        {isModalOpen && modalType === "reserva-realizada" && (
          <ModalOneOption
            iconName="calendario-check"
            modalText="Reserva realizada com sucesso"
            buttonText="Voltar"
            buttonPath={"/user-home"}
          />
        )}

        {/* Modal de Confirmação do cadastro */}
        {isModalOpen && modalType === "confirmar-cadastro" && (
          <ModalTwoOptions
            iconName="calendario-relogio"
            modalText="Deseja confirmar sua reserva?"
            buttonTextOne="Continuar editando"
            onClickButtonOne={() => setIsModalOpen(false)}
            buttonTextTwo="Confirmar"
            onClickButtonTwo={handleEditarReserva}
          />
        )}

        {/* Modal de horário indisponivel */}
        {isModalOpen && modalType === "horario-indisponivel" && (
          <ModalOneOption
            iconName="calendario-erro"
            modalText="Data/horário escolhido indisponível. Tente novamente"
            buttonText="Tentar novamente"
            onClick={() => setIsModalOpen(false)}
          />
        )}

        {/* Modal pra caso o local esteja indisponivel ou o usuario responsavel nao seja permitido 
             ou haja qualquer outro problema com os dados inseridos*/}
        {isModalOpen && modalType === "credenciais-invalidas" && (
          <ModalOneOption
            iconName="circulo-erro"
            modalText="Credenciais inválidas!
                              Cheque os dados inseridos e
                              tente novamente"
            buttonText="Tentar novamente"
            onClick={() => setIsModalOpen(false)}
          />
        )}
      </section>
    </div>
  );
};

export default UserEditarReserva;
