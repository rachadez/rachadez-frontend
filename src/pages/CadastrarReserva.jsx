import React, { useState } from "react";
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

const CadastrarReserva = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [ufcgParticipantInputs, setUfcgParticipantInputs] = useState([]);
  const [externalParticipantInputs, setExternalParticipantInputs] = useState([]);


  const handleCadastrarClick = () => {
    const horarioAgendado = false; // Substitua isso pela lógica para verificar se há reserva no horário
    const horarioIndisponivel = false; // substitua para a logica de checar se o horario esta disponivel
    const credenciaisInvalidas = true; /* substitua para a lógica de checar se o local está disponivel,
                                           checar se o usuario responsavel é permitido, ou 
                                           qualquer outro problema com os dados inseridos */

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

  const handleCadastrarReserva = () => {
    //add logica de cadastrar reserva
    setModalType("reserva-realizada");
  };


  const [selectedDate, setSelectedDate] = useState(null);
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
    setUfcgParticipantInputs([...ufcgParticipantInputs, { email: "" }]);
  };
  
  const addExternalParticipant = () => {
    setExternalParticipantInputs([...externalParticipantInputs, { email: "" }]);
  };
  

  const handleResponsavelChange = (participant, type) => {
    setResponsavel({ participant, type });
  };

  return (
    <div className="container-cadastrar-reserva">
      <Header />
      <MainContent title="Cadastrar Reserva" path={"/visualizar-reservas"} />
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
                    onClick={() => {
                      setUfcgParticipants([...ufcgParticipants, participant]);
                      setUfcgParticipantInputs(ufcgParticipantInputs.filter((_, i) => i !== index));
                    }}
                  />
                  <CancelIcon
                    onClick={() => {
                      setUfcgParticipantInputs(ufcgParticipantInputs.filter((_, i) => i !== index));
                    }}
                  />
                </div>
              </div>
            ))}
            <div className="participant-list">
              {ufcgParticipants.map((participant, index) => (
                <React.Fragment key={index}>
                  <div className="participant-item">
                    <span>{participant.name || "Novo Participante"}</span>
                    <span className="participant-email">{participant.email}</span>
                    <div className="action-icons">
                      <input
                        type="checkbox"
                        checked={responsavel?.participant === participant && responsavel?.type === 'ufcg'}
                        onChange={() => handleResponsavelChange(participant, 'ufcg')}
                      />
                      <label className="responsavel-label">Marcar como responsável</label>
                      <TrashIcon onClick={() => removeUfcgParticipant(index)} className="trash-icon" />
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
            <div className="separator-line"></div>
          </div>
          <div className="participant-group">
            <div className="title-and-button">
              <h4 className="sub-title">USUÁRIOS EXTERNOS</h4>
              <div className="add-button" onClick={addExternalParticipant}>
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
                    onClick={() => {
                      setExternalParticipants([...externalParticipants, participant]);
                      setExternalParticipantInputs(externalParticipantInputs.filter((_, i) => i !== index));
                    }}
                  />
                  <CancelIcon
                    onClick={() => {
                      setExternalParticipantInputs(externalParticipantInputs.filter((_, i) => i !== index));
                    }}
                  />
                </div>
              </div>
            ))}
            <div className="participant-list">
              {externalParticipants.map((participant, index) => (
                <React.Fragment key={index}>
                  <div className="participant-item">
                    <span>{participant.name || "Novo Participante"}</span>
                    <span className="participant-email">{participant.email}</span>
                    <div className="action-icons">
                      <input
                        type="checkbox"
                        checked={responsavel?.participant === participant && responsavel?.type === 'external'}
                        onChange={() => handleResponsavelChange(participant, 'external')}
                      />
                      <label className="responsavel-label">Marcar como responsável</label>
                      <TrashIcon onClick={() => removeExternalParticipant(index)} className="trash-icon" />
                    </div>
                  </div>
                </React.Fragment>
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