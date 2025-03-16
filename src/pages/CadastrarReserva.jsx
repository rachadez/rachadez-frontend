import React, { useState } from "react";
import "./CadastrarReserva.css";
import ConfigIcon from "./components/ConfigIcon/ConfigIcon";


const CadastrarReserva = () => {
  // Estado para armazenar os participantes
  const [ufcgParticipants, setUfcgParticipants] = useState([
    { name: "Fulano de Tal", email: "fulano.tal@curso.ufcg.edu.br" },
    { name: "Ciclano Bla Bla Bla da Silva", email: "ciclano.silva@curso.ufcg.edu.br" },
  ]);

  const [externalParticipants, setExternalParticipants] = useState([
    { name: "Fulano de Tal", cpf: "111.111.111-11" },
    { name: "Ciclano Bla Bla Bla da Silva", cpf: "222.222.222-22" },
  ]);

  // Função para remover um participante da lista UFCG
  const removeUfcgParticipant = (index) => {
    setUfcgParticipants(ufcgParticipants.filter((_, i) => i !== index));
  };

  // Função para remover um participante da lista de externos
  const removeExternalParticipant = (index) => {
    setExternalParticipants(externalParticipants.filter((_, i) => i !== index));
  };

  const addUfcgParticipant = () => {
    setExternalParticipants([...externalParticipants, { name: "", email: "" }]);
  };

  // Função para adicionar um participante externo
  const addExternalParticipant = () => {
    setExternalParticipants([...externalParticipants, { name: "", cpf: "" }]);
  };

  return (
    <div className="container">
      <header className="header">
        <h2 className="logo">Racha10 UFCG</h2>
        <ConfigIcon className="config-icon" />
      </header>

      <main className="main-content">
        <div className="title-container">
          <ion-icon name="arrow-back-outline" className="back-icon"></ion-icon>
          <h2 className="title">Cadastrar Reserva</h2>
        </div>
      </main>

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
            <div className="date-input-container">
              <span className="calendar-icon">
                <ion-icon name="calendar-outline"></ion-icon>
              </span>
              <input
                type="text"
                id="data-hora"
                className="date-input"
                placeholder="10/01/2024 00:00"
              />
            </div>
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
            <div className="participant-list">
              {ufcgParticipants.map((participant, index) => (
                <div key={index} className="participant-item">
                  <span>{participant.name || "Novo Participante"}</span>
                  <span className="participant-email">{participant.email}</span>
                  <ion-icon
                    name="trash-outline"
                    className="delete-icon"
                    onClick={() => removeUfcgParticipant(index)}
                  ></ion-icon>
                </div>
              ))}
            </div>
            {/* Linha cinza ocupando toda a largura */}
            <div className="separator-line"></div>
          </div>

          <div className="participant-group">
            <div className="title-and-button">
              <h4 className="sub-title">USUÁRIOS EXTERNOS</h4>
              <div className="add-button" onClick={addExternalParticipant}>
                <ion-icon name="add-circle-outline" className="add-button"></ion-icon>
              </div>
            </div>
            <div className="participant-list">
              {externalParticipants.map((participant, index) => (
                <div key={index} className="participant-item">
                  <span>{participant.name || "Novo Participante"}</span>
                  <span className="participant-cpf">{participant.cpf}</span>
                  <ion-icon
                    name="trash-outline"
                    className="delete-icon"
                    onClick={() => removeExternalParticipant(index)}
                  ></ion-icon>
                </div>
              ))}
            </div>
            {/* Linha cinza ocupando toda a largura */}
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
