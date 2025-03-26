import React, { useState } from "react";
import "./EditarReserva.css";
import TrashIcon from "./components/TrashIcon/TrashIcon";
import EditIcon from "./components/EditIcon/EditIcon"; 
import DateTimePicker from "./components/DateTimePicker/DateTimePicker";
import ConfirmIcon from "./components/ConfirmIcon/ConfirmIcon";
import CancelIcon from "./components/CancelIcon/CancelIcon";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import ModalTwoOptions from "./components/Modal/ModalTwoOptions";
import ModalOneOption from "./components/Modal/ModalOneOption";

const EditarReserva = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState("");
  
    const handleUpdateClick = () => {
        const horarioAgendado = true; // Substitua isso pela lógica para verificar se há reserva no horário
        
        if (horarioAgendado) {
            setModalType("sobrescrever-horario");
        } else {
            setModalType("confirmar-edicoes");
        }

        setIsModalOpen(true);
    };

    const handleAtualizarReserva = () => {
        //add logica de atualizar reserva
        setModalType("reserva-atualizada");
    };

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

    const [editingUfcgIndex, setEditingUfcgIndex] = useState(null);
    const [editingExternalIndex, setEditingExternalIndex] = useState(null);

    const removeUfcgParticipant = (index) => {
        setUfcgParticipants(ufcgParticipants.filter((_, i) => i !== index));
    };

    const removeExternalParticipant = (index) => {
        setExternalParticipants(externalParticipants.filter((_, i) => i !== index));
    };

    const addUfcgParticipant = () => {
        setShowUfcgInput(true);
        setEditingUfcgIndex(null);
        setNewUfcgParticipant({ name: "", email: "" });
    };

    const addExternalParticipant = () => {
        setShowExternalInput(true);
        setEditingExternalIndex(null);
        setNewExternalParticipant({ name: "", cpf: "" });
    };

    const editUfcgParticipant = (index) => {
        setShowUfcgInput(true);
        setEditingUfcgIndex(index);
        setNewUfcgParticipant(ufcgParticipants[index]);
    };

    const editExternalParticipant = (index) => {
        setShowExternalInput(true);
        setEditingExternalIndex(index);
        setNewExternalParticipant(externalParticipants[index]);
    };

    const confirmUfcgParticipant = () => {
        if (editingUfcgIndex !== null) {
            const updatedParticipants = [...ufcgParticipants];
            updatedParticipants[editingUfcgIndex] = newUfcgParticipant;
            setUfcgParticipants(updatedParticipants);
        } else {
            setUfcgParticipants([...ufcgParticipants, newUfcgParticipant]);
        }
        setShowUfcgInput(false);
        setNewUfcgParticipant({ name: "", email: "" });
    };

    const confirmExternalParticipant = () => {
        if (editingExternalIndex !== null) {
            const updatedParticipants = [...externalParticipants];
            updatedParticipants[editingExternalIndex] = newExternalParticipant;
            setExternalParticipants(updatedParticipants);
        } else {
            setExternalParticipants([...externalParticipants, newExternalParticipant]);
        }
        setShowExternalInput(false);
        setNewExternalParticipant({ name: "", cpf: "" });
    };

    return (
        <div className="container-editar-reserva">
            <Header />

            <MainContent title="Editar Reserva" path={"/admin-detalhes-reserva"}/>

            <section className="form-section">
                <div className="form-grid">
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

                        {showUfcgInput && editingUfcgIndex === null && (
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
                                    <ConfirmIcon onClick={confirmUfcgParticipant} />
                                    <CancelIcon onClick={() => setShowUfcgInput(false)} />
                                </div>
                            </div>
                        )}

                        <div className="participant-list">
                            {ufcgParticipants.map((participant, index) => (
                                <React.Fragment key={index}>
                                    {showUfcgInput && editingUfcgIndex === index && (
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
                                                <ConfirmIcon onClick={confirmUfcgParticipant} />
                                                <CancelIcon onClick={() => setShowUfcgInput(false)} />
                                            </div>
                                        </div>
                                    )}
                                    <div className="participant-item">
                                        <span>{participant.name || "Novo Participante"}</span>
                                        <span className="participant-email">{participant.email}</span>
                                        <div className="action-icons">
                                            <EditIcon onClick={() => editUfcgParticipant(index)} className="edit-icon" />
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

                        {showExternalInput && editingExternalIndex === null && (
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
                                    <ConfirmIcon onClick={confirmExternalParticipant} />
                                    <CancelIcon onClick={() => setShowExternalInput(false)} />
                                </div>
                            </div>
                        )}

                        <div className="participant-list">
                            {externalParticipants.map((participant, index) => (
                                <React.Fragment key={index}>
                                    {showExternalInput && editingExternalIndex === index && (
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
                                                <ConfirmIcon onClick={confirmExternalParticipant} />
                                                <CancelIcon onClick={() => setShowExternalInput(false)} />
                                            </div>
                                        </div>
                                    )}
                                    <div className="participant-item">
                                        <span>{participant.name || "Novo Participante"}</span>
                                        <span className="participant-cpf">{participant.cpf}</span>
                                        <div className="action-icons">
                                            <EditIcon onClick={() => editExternalParticipant(index)} className="edit-icon" />
                                            <TrashIcon onClick={() => removeExternalParticipant(index)} className="trash-icon" />
                                        </div>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>

                        <div className="separator-line"></div>
                    </div>
                </div>

                <div>
            <div className="submit-button-container">
                <button className="submit-button" onClick={handleUpdateClick}>
                    Atualizar Reserva
                </button>
            </div>

            {/* Modal de sobrescrever Horário */}
            {isModalOpen && modalType === "sobrescrever-horario" && (
                <ModalTwoOptions
                    iconName="triangulo-amarelo"
                    modalText="Já existe uma reserva agendada para este horário. Deseja sobrescrever?"
                    buttonTextOne="Sim"
                    buttonColorOne="red"
                    onClickButtonOne={handleAtualizarReserva}

                    buttonTextTwo="Não"
                    onClickButtonTwo={() => setIsModalOpen(false)}
                />
            )}

            {/* Modal de reserva atualizada */}
            {isModalOpen && modalType === "reserva-atualizada" && (
                <ModalOneOption
                    iconName="calendario-check" 
                    modalText="Reserva atualizada com sucesso!"
                    buttonText="Ir para a página inicial"
                    buttonPath={"/admin-menu"}
                />
            )}

            {/* Modal de Confirmação das Edições */}
            {isModalOpen && modalType === "confirmar-edicoes" && (
                <ModalTwoOptions
                    iconName="calendario-relogio"
                    modalText="Deseja confirmar suas edições?"
                    buttonTextOne="Continuar editando"
                    onClickButtonOne={() => setIsModalOpen(false)}
                    buttonTextTwo="Confirmar"
                    onClickButtonTwo={handleAtualizarReserva}
                />
            )}
        </div>
            </section>
        </div>
    );
};

export default EditarReserva;