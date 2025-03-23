import React, { useState } from "react";
import "./CadastrarReserva.css";
import ConfigIcon from "./components/ConfigIcon/ConfigIcon";
import TrashIcon from "./components/TrashIcon/TrashIcon";
import ArrowIcon from "./components/ArrowIcon/ArrowIcon";
import DateTimePicker from "./components/DateTimePicker/DateTimePicker";
import ConfirmIcon from "./components/ConfirmIcon/ConfirmIcon";
import CancelIcon from "./components/CancelIcon/CancelIcon";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";

const CadastrarReserva = () => {

  const [selectedDate, setSelectedDate] = useState(null);

  const [newUfcgParticipant, setNewUfcgParticipant] = useState({ name: "", email: "" });
  const [newExternalParticipant, setNewExternalParticipant] = useState({ name: "", cpf: "" });

  const [showUfcgInput, setShowUfcgInput] = useState(false);
  const [showExternalInput, setShowExternalInput] = useState(false);

  const [ufcgParticipants, setUfcgParticipants] = useState([
    { name: "Fulano de Tal", email: "fulano.tal@curso.ufcg.edu.br" },
    { name: "Ciclano Bla Bla Bla da Silva", email: "ciclano.silva@curso.ufcg.edu.br" },
  ]);

  const [externalParticipants, setExternalParticipants] = useState([
    { name: "Fulano de Tal", cpf: "111.111.111-11" },
    { name: "Ciclano Bla Bla Bla da Silva", cpf: "222.222.222-22" },
  ]);

  const removeUfcgParticipant = (index) => {
    setUfcgParticipants(ufcgParticipants.filter((_, i) => i !== index));
  };

  const removeExternalParticipant = (index) => {
    setExternalParticipants(externalParticipants.filter((_, i) => i !== index));
  };

  const addUfcgParticipant = () => {
    setShowUfcgInput(true);
  };

  const addExternalParticipant = () => {
    setShowExternalInput(true);
  };

  return (
    <div className="container-cadastrar-reserva">
      <Header />

      <MainContent title="Cadastrar Reserva" path={"/visualizar-reservas"}/>

      <section className="form-section">
        <div className="form-grid">
          <div className="input-group">
            <label htmlFor="esporte">Esporte</label>
            <select id="esporte" className="select-input">
              <option>Esporte</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="data-hora">DATA E HORA</label>
            <DateTimePicker selectedDate={selectedDate} onChange={setSelectedDate} />
          </div>
        </div>

        <div className="participants-section">
          <h3 className="section-title">PARTICIPANTES</h3>

          <div className="participant-group">
            <div className="title-and-button">
              <h4 className="sub-title">UFCG</h4>
              <div className="add-button" onClick={addUfcgParticipant}>
                <ion-icon name="add-circle-outline" className="add-button"></ion-icon>
              </div>
            </div>

            {/* Formulário de entrada para UFCG */}
            {showUfcgInput && (
              <div className="participant-item">
                <input
                  type="text"
                  placeholder="Nome"
                  value={newUfcgParticipant.name}
                  onChange={(e) => setNewUfcgParticipant({ ...newUfcgParticipant, name: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newUfcgParticipant.email}
                  onChange={(e) => setNewUfcgParticipant({ ...newUfcgParticipant, email: e.target.value })}
                />
                <div className="action-buttons">
                  <ConfirmIcon
                    onClick={() => {
                      setUfcgParticipants([...ufcgParticipants, newUfcgParticipant]);
                      setShowUfcgInput(false);  // Esconde os campos após confirmar
                      setNewUfcgParticipant({ name: "", email: "" });
                    }}
                  />
                  <CancelIcon
                    onClick={() => {
                      setShowUfcgInput(false);  // Esconde os campos após negar
                      setNewUfcgParticipant({ name: "", email: "" });
                    }}
                  />
                </div>
              </div>
            )}

            <div className="participant-list">
              {ufcgParticipants.map((participant, index) => (
                <div key={index} className="participant-item">
                  <span>{participant.name || "Novo Participante"}</span>
                  <span className="participant-email">{participant.email}</span>
                  <TrashIcon onClick={() => removeUfcgParticipant(index)} className="trash-icon" />
                </div>
              ))}
            </div>

            <div className="separator-line"></div>
          </div>

          {/* Seção de participantes externos */}
          <div className="participant-group">
            <div className="title-and-button">
              <h4 className="sub-title">USUÁRIOS EXTERNOS</h4>
              <div className="add-button" onClick={addExternalParticipant}>
                <ion-icon name="add-circle-outline" className="add-button"></ion-icon>
              </div>
            </div>

            {/* Formulário de entrada para participantes externos */}
            {showExternalInput && (
              <div className="participant-item">
                <input
                  type="text"
                  placeholder="Nome"
                  value={newExternalParticipant.name}
                  onChange={(e) => setNewExternalParticipant({ ...newExternalParticipant, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="CPF"
                  value={newExternalParticipant.cpf}
                  onChange={(e) => setNewExternalParticipant({ ...newExternalParticipant, cpf: e.target.value })}
                />
                <div className="action-buttons">
                  <ConfirmIcon
                    onClick={() => {
                      setExternalParticipants([...externalParticipants, newExternalParticipant]);
                      setShowExternalInput(false);  // Esconde os campos após confirmar
                      setNewExternalParticipant({ name: "", cpf: "" });
                    }}
                  />
                  <CancelIcon
                    onClick={() => {
                      setShowExternalInput(false);  // Esconde os campos após negar
                      setNewExternalParticipant({ name: "", cpf: "" });
                    }}
                  />
                </div>
              </div>
            )}

            <div className="participant-list">
              {externalParticipants.map((participant, index) => (
                <div key={index} className="participant-item">
                  <span>{participant.name || "Novo Participante"}</span>
                  <span className="participant-cpf">{participant.cpf}</span>
                  <TrashIcon onClick={() => removeExternalParticipant(index)} className="trash-icon" />
                </div>
              ))}
            </div>

            <div className="separator-line"></div>
          </div>
        </div>

        <div className="submit-button-container">
          <button className="submit-button">Cadastrar Reserva</button>
        </div>
      </section>
    </div>
  );
};

export default CadastrarReserva;
