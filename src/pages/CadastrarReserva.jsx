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
import ModalTwoOptions from "./components/Modal/ModalTwoOptions";
import ModalOneOption from "./components/Modal/ModalOneOption";

const CadastrarReserva = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const handleCadastrarClick = () => {
      const horarioAgendado = false; // Substitua isso pela lógica para verificar se há reserva no horário
      const horarioIndisponivel = false; // substitua para a logica de checar se o horario esta disponivel
      const credenciaisInvalidas = true; /* substitua para a lógica de checar se o local está disponivel,
                                           checar se o usuario responsavel é permitido, ou 
                                           qualquer outro problema com os dados inseridos */

      if (horarioAgendado) {
          setModalType("sobrescrever-horario");
      } else if (horarioIndisponivel){
          setModalType("horario-indisponivel");
      } else if (credenciaisInvalidas) {
          setModalType("credenciais-invalidas");
      } else {
          setModalType("confirmar-cadastro");
      }

      setIsModalOpen(true);
  };

  const handleCadastrarReserva = () => {
      //add logica de cadastrar reserva
      setModalType("reserva-realizada");
  };


  const [selectedDate, setSelectedDate] = useState(null);

  const [newUfcgParticipant, setNewUfcgParticipant] = useState({ name: "", email: "" });
  const [newExternalParticipant, setNewExternalParticipant] = useState({ name: "", email: "" });

  const [showUfcgInput, setShowUfcgInput] = useState(false);
  const [showExternalInput, setShowExternalInput] = useState(false);

  const [ufcgParticipants, setUfcgParticipants] = useState([
    { name: "Fulano de Tal", email: "fulano.tal@curso.ufcg.edu.br" },
    { name: "Ciclano Bla Bla Bla da Silva", email: "ciclano.silva@curso.ufcg.edu.br" },
  ]);

  const [externalParticipants, setExternalParticipants] = useState([
    { name: "Fulano de Tal", email: "fulano.tal@example.com" },
    { name: "Ciclano Bla Bla Bla da Silva", email: "ciclano.silva@example.com" },
  ]);

  const [responsavel, setResponsavel] = useState(null);

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

  const handleResponsavelChange = (participant, type) => {
    setResponsavel({ participant, type });
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
              <option>Esporte - Local</option>
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
                  <input
                    type="checkbox"
                    checked={responsavel?.participant === participant && responsavel?.type === 'ufcg'}
                    onChange={() => handleResponsavelChange(participant, 'ufcg')}
                  />
                  <label className="responsavel-label">Marcar como responsável</label>
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
                  type="email"
                  placeholder="Email"
                  value={newExternalParticipant.email}
                  onChange={(e) => setNewExternalParticipant({ ...newExternalParticipant, email: e.target.value })}
                />
                <div className="action-buttons">
                  <ConfirmIcon
                    onClick={() => {
                      setExternalParticipants([...externalParticipants, newExternalParticipant]);
                      setShowExternalInput(false);  // Esconde os campos após confirmar
                      setNewExternalParticipant({ name: "", email: "" });
                    }}
                  />
                  <CancelIcon
                    onClick={() => {
                      setShowExternalInput(false);  // Esconde os campos após negar
                      setNewExternalParticipant({ name: "", email: "" });
                    }}
                  />
                </div>
              </div>
            )}

            <div className="participant-list">
              {externalParticipants.map((participant, index) => (
                <div key={index} className="participant-item">
                  <span>{participant.name || "Novo Participante"}</span>
                  <span className="participant-email">{participant.email}</span>
                  <input
                    type="checkbox"
                    checked={responsavel?.participant === participant && responsavel?.type === 'external'}
                    onChange={() => handleResponsavelChange(participant, 'external')}
                  />
                  <label className="responsavel-label">Marcar como responsável</label>
                  <TrashIcon onClick={() => removeExternalParticipant(index)} className="trash-icon" />
                </div>
              ))}
            </div>

            <div className="separator-line"></div>
          </div>
        </div>

        <div className="submit-button-container">
          <button className="submit-button" onClick={handleCadastrarClick}>Cadastrar Reserva</button>
        </div>

          {/* Modal de sobrescrever Horário */}
          {isModalOpen && modalType === "sobrescrever-horario" && (
                <ModalTwoOptions
                    iconName="triangulo-amarelo"
                    modalText="Já existe uma reserva agendada para este horário. Deseja sobrescrever?"
                    buttonTextOne="Sim"
                    buttonColorOne="red"
                    onClickButtonOne={handleCadastrarReserva}

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
                    buttonPath={"/visualizar-reservas"}
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
                    onClickButtonTwo={handleCadastrarReserva}
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

export default CadastrarReserva;