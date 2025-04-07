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
  const [reservaData, setReservaData] = useState(null);

  const fetchUserId = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        navigate("/login");
        return null;
      }
      const response = await axios.get("http://127.0.0.1:8000/v1/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.id;
    } catch (error) {
      console.error("Erro ao buscar o ID do usuário:", error);
      setErrorMessage("Erro ao carregar os dados do usuário.");
      return null;
    }
  };

  const fetchReserva = async (user_id) => {
    try {
      const token = localStorage.getItem("access_token");
      const url = `http://127.0.0.1:8000/v1/reservations/${user_id}/${reservation_id}`;
      const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });

      setReservaData({
        esporte: response.data.sport || `Quadra ${response.data.arena_id}`,
        dataHora: new Date(response.data.start_date),
        participantesUFCG: response.data.participants
          .filter((p) => p.occupation === "ALUNO")
          .map((p) => ({ name: p.full_name, email: p.email })),
        participantesExternos: response.data.participants
          .filter((p) => p.occupation === "EXTERNO")
          .map((p) => ({ name: p.full_name, email: p.email })),
      });
    } catch (error) {
      console.error("Erro ao buscar os dados da reserva:", error);
      setErrorMessage("Erro ao carregar os dados da reserva.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const user_id = await fetchUserId();
      if (user_id) {
        await fetchReserva(user_id);
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

  const handleDateChange = (date) => {
    setReservaData((prev) => ({ ...prev, dataHora: date }));
  };

  const removeParticipant = (index, type) => {
    try {
      const updatedParticipants = reservaData[type].filter((_, i) => i !== index);

      setReservaData((prev) => ({
        ...prev,
        [type]: updatedParticipants,
      }));
    } catch (error) {
      console.error("Erro ao remover participante:", error);
    }
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

  const subtractHours = (date, hours) => {
    return new Date(date.getTime() - hours * 60 * 60 * 1000);
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem("access_token");
      const emails = [
        ...reservaData.participantesUFCG.map((p) => p.email),
        ...reservaData.participantesExternos.map((p) => p.email),
      ];

      console.log("Emails dos participantes:", emails); // Log dos emails

      const participants = await Promise.all(
        emails.map(async (email) => {
          try {
            const response = await axios.get(`http://127.0.0.1:8000/v1/users/user-id/${email}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.data || !response.data.user_id || typeof response.data.user_id !== "string") {
              throw new Error(`UUID inválido para o email: ${email}`);
            }
            return response.data.user_id;
          } catch (error) {
            console.error(`Erro ao buscar UUID para o email ${email}:`, error);
            throw new Error(`Não foi possível encontrar o usuário com o email: ${email}`);
          }
        })
      );

      console.log("UUIDs dos participantes:", participants); // Log dos UUIDs

      const startDate = reservaData.dataHora;
      const endDate = new Date(startDate.getTime() + 5400000);
      const adjustedStartDate = subtractHours(new Date(startDate), 3).toISOString();
      const adjustedEndDate = subtractHours(new Date(endDate), 3).toISOString();

      const payload = {
        start_date: adjustedStartDate,
        end_date: adjustedEndDate,
        participants: participants,
      };

      console.log("Payload enviado para a API:", payload); // Log do payload completo

      await axios.put(`http://127.0.0.1:8000/v1/reservations/${reservation_id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate(`/reserva/${reservation_id}`);
    } catch (error) {
      console.error("Erro ao salvar as alterações:", error);
      setErrorMessage("Erro ao salvar as alterações.");
    } finally {
      setIsSaving(false);
    }
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
