import React, { useState } from "react";
import "./CadastrarReserva.css";
import { Calendar, Clock4 } from "lucide-react";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";

const UserVisualizarReserva = () => {
  const [reservaData] = useState({
    esporte: "Esporte X",
    dataHora: new Date("2025-01-01T18:30:00"),
    participantesUFCG: [
      { name: "Fulano de Tal", email: "fulano.tal@curso.ufcg.edu.br" },
      {
        name: "Ciclano Bla Bla Bla da Silva",
        email: "ciclano.silva@curso.ufcg.edu.br",
      },
    ],
    participantesExternos: [
      { name: "Beltrano dos Santos", email: "beltrano.santos@example.com" },
      { name: "Maria Souza", email: "maria.souza@example.com" },
    ],
  });

  const dataFormatada = reservaData.dataHora.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const horaFormatada = reservaData.dataHora.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="container-cadastrar-reserva">
      <Header />
      <MainContent title={reservaData.esporte} path={"/user-home"} />
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

          {/* UFCG Participants */}
          <div className="participant-group">
            <div className="title-and-button">
              <h4 className="sub-title">UFCG</h4>
            </div>
            <div className="participant-list">
            {reservaData.participantesUFCG.map((participant, index) => (
                <div key={index} className="participant-item">
                  <span>{participant.name}</span>
                  <span className="participant-email">{participant.email}</span>
                </div>
              ))}
            </div>
          </div>

          {/* External Participants */}
          <div className="participant-group">
            <div className="title-and-button">
              <h4 className="sub-title">USUÁRIOS EXTERNOS</h4>
            </div>
            <div className="participant-list">
            {reservaData.participantesExternos.map((participant, index) => (
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
