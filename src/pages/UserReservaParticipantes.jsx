import { useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import TrashIcon from "./components/TrashIcon/TrashIcon";
import ConfirmIcon from "./components/ConfirmIcon/ConfirmIcon";
import CancelIcon from "./components/CancelIcon/CancelIcon";
import ModalTwoOptions from "./components/Modal/ModalTwoOptions";
import ModalOneOption from "./components/Modal/ModalOneOption";
import { useState } from "react";
import axios from "axios";
import "./CadastrarReserva.css";

const UserReservaParticipantes = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Dados recebidos via state do navigate
  const { arenaId, startDate, endDate } = location.state || {};

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [ufcgParticipantInputs, setUfcgParticipantInputs] = useState([]);
  const [externalParticipantInputs, setExternalParticipantInputs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const abrirModal = (tipo) => {
    setModalType(tipo);
    setIsModalOpen(true);
  };
  
  const fecharModal = () => {
    setModalType("");
    setIsModalOpen(false);
  };

  const [reservaData, setReservaData] = useState({
    participantesUFCG: [],
    participantesExternos: [],
  });

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

  const handleCreateReservation = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const userResponse = await axios.get("http://127.0.0.1:8000/v1/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responsibleUserId = userResponse.data.id;

      if (!arenaId || isNaN(Number(arenaId))) {
        throw new Error("O ID da arena é inválido.");
      }

      if (!startDate || !endDate) {
        throw new Error("As datas de início e término são obrigatórias.");
      }

      const emails = [
        ...reservaData.participantesUFCG.map((p) => p.email),
        ...reservaData.participantesExternos.map((p) => p.email),
      ];

      const participants = await Promise.all(
        emails.map(async (email) => {
          try {
            const response = await axios.get(`http://127.0.0.1:8000/v1/users/user-id/${email}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (!response.data || !response.data.user_id || typeof response.data.user_id !== "string") {
              setErrorMessage(response.data.details)
              abrirModal("erro");
              throw new Error(`UUID inválido para o email: ${email}`);
            }

            return response.data.user_id;
          } catch (error) {
            setErrorMessage(error.response.data.details);
            abrirModal("erro");
            console.error(`Erro ao buscar UUID para o email ${email}:`, error);
            throw new Error(`Não foi possível encontrar o usuário com o email: ${email}`);
          }
        })
      );

      // Adiciona o ID do responsável à lista de participantes
      participants.unshift(responsibleUserId);

      const reservationData = {
        responsible_user_id: responsibleUserId,
        arena_id: Number(arenaId),
        start_date: startDate,
        end_date: endDate,
        participants,
      };

      console.log("Dados enviados:", reservationData);

      await axios.post("http://127.0.0.1:8000/v1/reservations/", reservationData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      abrirModal("sucesso")
    } catch (error) {
      console.error("Erro ao cadastrar reserva:", error);
      const detail = error?.response?.data?.detail;
      let message = "Erro ao cadastrar reserva";

      if (error.response && error.response.data) {
       if (typeof detail === "string") {
          message = detail;
        } else if (Array.isArray(detail)) {
          // Se for uma lista de erros, pega a primeira mensagem
          message = detail[0]?.msg || message;
        } else if (typeof detail === "object" && detail?.msg) {
          // objeto com msg
          message = detail.msg;
        } 

        setErrorMessage(message);
      } else {
        setErrorMessage("Erro ao cadastrar reserva. Tente novamente mais tarde.");
      }

      abrirModal("erro");
    }
  };

  return (
    <div>
      <Header />
      <MainContent
        title="Adicionar Participantes"
        subtitle="Preencha a lista de participantes"
        path="/user-reserva-horario"
      />

      <div className="container-cadastrar-reserva">
        <section className="form-section">
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
                    <ConfirmIcon
                      onClick={() =>
                        confirmParticipant(index, "participantesUFCG", ufcgParticipantInputs, setUfcgParticipantInputs)
                      }
                    />
                    <CancelIcon
                      onClick={() =>
                        setUfcgParticipantInputs(ufcgParticipantInputs.filter((_, i) => i !== index))
                      }
                    />
                  </div>
                </div>
              ))}
              <div className="participant-list">
                {reservaData.participantesUFCG.map((participant, index) => (
                  <div key={index} className="participant-item">
                    <span>{participant.name || "Novo Participante"}</span>
                    <span className="participant-email">{participant.email}</span>
                    <TrashIcon
                      onClick={() => removeParticipant(index, "participantesUFCG")}
                      className="trash-icon"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* External Participants */}
            <div className="participant-group">
              <div className="title-and-button">
                <h4 className="sub-title">USUÁRIOS EXTERNOS</h4>
                <div className="add-button" onClick={() => addParticipantInput("participantesExternos")}>
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
                    <ConfirmIcon
                      onClick={() =>
                        confirmParticipant(index, "participantesExternos", externalParticipantInputs, setExternalParticipantInputs)
                      }
                    />
                    <CancelIcon
                      onClick={() =>
                        setExternalParticipantInputs(externalParticipantInputs.filter((_, i) => i !== index))
                      }
                    />
                  </div>
                </div>
              ))}
              <div className="participant-list">
                {reservaData.participantesExternos.map((participant, index) => (
                  <div key={index} className="participant-item">
                    <span>{participant.name || "Novo Participante"}</span>
                    <span className="participant-email">{participant.email}</span>
                    <TrashIcon
                      onClick={() => removeParticipant(index, "participantesExternos")}
                      className="trash-icon"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="submit-button-container">
            <button className="submit-button" onClick={() => abrirModal("confirmacao")}>
              Confirmar Reserva
            </button>
          </div>
          {/* Modal de reserva realizada */}
          {isModalOpen && modalType === "sucesso" && (
            <ModalOneOption
              iconName="calendario-check"
              modalText="Reserva realizada com sucesso"
              buttonText="Voltar"
              buttonPath="/user-home"
            />
          )}

          {/* Modal de erro */}
          {isModalOpen && modalType === "erro" && (
            <ModalOneOption
              iconName="calendario-erro"
              modalText={errorMessage}
              buttonText="Tentar novamente"
              onClick={() => setIsModalOpen(false)}
            />
          )}


          {isModalOpen && modalType === "confirmacao" && (
            <ModalTwoOptions
              iconName="calendario-relogio"
              modalText="Deseja confirmar a reserva?"
              buttonTextOne="Confirmar"
              onClickButtonOne={() => {
                fecharModal(); 
                handleCreateReservation();
              }}
              buttonTextTwo="Cancelar"
              onClickButtonTwo={fecharModal}
            />
          )}
        </section>
      </div>
    </div>
  );
};

export default UserReservaParticipantes;