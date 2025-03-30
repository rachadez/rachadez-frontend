import React, { useState } from "react";
import "./CadastrarReserva.css";
import TrashIcon from "./components/TrashIcon/TrashIcon";
import DateTimePicker from "./components/DateTimePicker/DateTimePicker";
import ConfirmIcon from "./components/ConfirmIcon/ConfirmIcon";
import CancelIcon from "./components/CancelIcon/CancelIcon";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import ModalTwoOptions from "./components/Modal/ModalTwoOptions";
import ModalOneOption from "./components/Modal/ModalOneOption";

const UserEditarReserva = () => {
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
            <div className="participant-list">
              {reservaData.participantesUFCG.map((participant, index) => (
                <div key={index} className="participant-item">
                  <span>{participant.name || "Novo Participante"}</span>
                  <span className="participant-email">{participant.email}</span>
                  <TrashIcon onClick={() => removeParticipant(index, "participantesUFCG")} className="trash-icon" />
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
                  <ConfirmIcon onClick={() => confirmParticipant(index, "participantesExternos", externalParticipantInputs, setExternalParticipantInputs)} />
                  <CancelIcon onClick={() => setExternalParticipantInputs(externalParticipantInputs.filter((_, i) => i !== index))} />
                </div>
              </div>
            ))}
            <div className="participant-list">
              {reservaData.participantesExternos.map((participant, index) => (
                <div key={index} className="participant-item">
                  <span>{participant.name || "Novo Participante"}</span>
                  <span className="participant-email">{participant.email}</span>
                  <TrashIcon onClick={() => removeParticipant(index, "participantesExternos")} className="trash-icon" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="submit-button-container">
          <button className="submit-button" onClick={handleEditarClick}>Atualizar reserva</button>
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
