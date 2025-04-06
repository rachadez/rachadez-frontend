import React, { useState, useEffect } from "react";
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
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ModalLoading from "./components/Modal/ModalLoading";

const EditarReserva = () => {
    const { id: reservation_id } = useParams();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [reservaData, setReservaData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState("");
    const [showUfcgInput, setShowUfcgInput] = useState(false);
    const [showExternalInput, setShowExternalInput] = useState(false);
    const [newUfcgParticipant, setNewUfcgParticipant] = useState({ name: "", email: "" });
    const [newExternalParticipant, setNewExternalParticipant] = useState({ name: "", email: "" });
    const [editingUfcgIndex, setEditingUfcgIndex] = useState(null);
    const [editingExternalIndex, setEditingExternalIndex] = useState(null);

    const abrirModal = (tipo) => {
        setModalType(tipo);
        setIsModalOpen(true);
      };
      
      const fecharModal = () => {
        setModalType("");
        setIsModalOpen(false);
      };

    const fetchUserId = async () => {
        try {
            const token = localStorage.getItem("access_token");
            if (!token) {
                console.log("Token de acesso não encontrado. Redirecionando para login.");
                navigate("/login");
                return null;
            }
            console.log("Buscando ID do usuário com token:", token);
            const response = await axios.get("http://127.0.0.1:8000/v1/users/me", {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("ID do usuário recebido:", response.data.id);
            return response.data.id;
        } catch (error) {
            console.error("Erro ao buscar o ID do usuário:", error);
            setErrorMessage(error.response.data.detail);
            abrirModal("erro-loading"); 
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
                    ? response.data.participants.filter((p) => p.occupation === "ALUNO").map((p) => ({ name: p.full_name, email: p.email }))
                    : [],
                participantesExternos: response.data.participants
                    ? response.data.participants.filter((p) => p.occupation === "EXTERNO").map((p) => ({ name: p.full_name, email: p.email }))
                    : [],
                arenaId: response.data.arena_id,
            });
        } catch (error) {
            console.error("Erro ao buscar os dados da reserva:", error);
            setErrorMessage(error.response.data.detail);
            abrirModal("erro-loading"); 
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

    const handleUpdateClick = () => {
        setModalType("confirmar-edicoes");
        setIsModalOpen(true);
    };

    const handleAtualizarReserva = () => {
        handleEditarReserva();
        setIsModalOpen(false);
    };

    const handleEditarClick = async () => {
        if (!reservaData || !reservaData.dataHora || !reservaData.arenaId) {
            setErrorMessage("Por favor, selecione data e hora.");
            return;
        }

        const startDate = reservaData.dataHora.toISOString();
        const endDate = new Date(reservaData.dataHora.getTime() + 60 * 60 * 1000).toISOString();

        try {
            const token = localStorage.getItem("access_token");
            const checkResponse = await axios.post(
                `http://127.0.0.1:8000/v1/reservations/arena/${reservaData.arenaId}`,
                { start_date: startDate, end_date: endDate },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (checkResponse.data) {
                setModalType("sobrescrever-horario");
            } else {
                setModalType("confirmar-cadastro");
            }
            setIsModalOpen(true);
        } catch (error) {
            console.error("Erro ao verificar horário:", error);
            setErrorMessage("Erro ao verificar horário. Tente novamente.");
            abrirModal("erro"); 
        }
    };

    const subtractHours = (date, hours) => {
        return new Date(date.getTime() - hours * 60 * 60 * 1000);
    };

    const handleEditarReserva = async () => {
        setIsSaving(true);
        try {
            const token = localStorage.getItem("access_token");
            console.log("Token obtido do localStorage:", token);

            if (!token) {
                console.error("Token não encontrado");
                setErrorMessage("Token não encontrado, faça login novamente.");
                abrirModal("erro"); 
                return;
            }

            console.log("Cabeçalho Authorization:", { Authorization: `Bearer ${token}` });

            const emails = [
                ...reservaData.participantesUFCG.map((p) => p.email),
                ...reservaData.participantesExternos.map((p) => p.email),
            ];

            console.log("Emails dos participantes:", emails);

            const participants = await Promise.all(
                emails.map(async (email) => {
                    try {
                        const response = await axios.get(`http://127.0.0.1:8000/v1/users/user-id/${email}`, {
                            headers: { Authorization: `Bearer ${token}` },
                        });
                        console.log(`UUID para o email ${email} recebido:`, response.data.user_id);
                        return response.data.user_id;
                    } catch (error) {
                        console.error(`Erro ao buscar UUID para o email ${email}:`, error);
                        abrirModal("erro"); 
                        if (error.response) {
                            console.error("Dados da resposta:", error.response.data);
                            setErrorMessage(`Erro ao buscar usuário ${email}: ${error.response.data.detail || error.message}`);
                            abrirModal("erro"); 
                        } else {
                            setErrorMessage(`Erro ao buscar usuário ${email}.`);
                            abrirModal("erro"); 
                        }
                        throw error;
                    }
                })
            );

            console.log("UUIDs dos participantes:", participants);

            const startDate = reservaData.dataHora;
            const endDate = new Date(startDate.getTime() + 5400000);
            const adjustedStartDate = subtractHours(new Date(startDate), 3).toISOString();
            const adjustedEndDate = subtractHours(new Date(endDate), 3).toISOString();

            const payload = {
                start_date: adjustedStartDate,
                end_date: adjustedEndDate,
                participants: participants,
            };

            console.log("Payload da requisição PUT:", payload);

            const response = await axios.put(`http://127.0.0.1:8000/v1/reservations/${reservation_id}`, payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("Reserva editada com sucesso. Resposta:", response.data);
            abrirModal("sucesso")
        } catch (error) {
            console.error("Erro ao salvar as alterações:", error);
            if (error.response) {
                console.error("Dados da resposta:", error.response.data);
                setErrorMessage(`Erro ao salvar: ${error.response.data.detail || error.message}`);
                abrirModal("erro"); 
            } else {
                setErrorMessage("Erro ao salvar as alterações.");
                abrirModal("erro"); 
            }
        } finally {
            setIsSaving(false);
        }
    };

    const removeParticipant = (index, type) => {
        try {
            const updatedParticipants = reservaData[type].filter((_, i) => i !== index);
            setReservaData((prev) => ({ ...prev, [type]: updatedParticipants }));
        } catch (error) {
            console.error("Erro ao remover participante:", error);
            setErrorMessage(error.response.data.detail)
            abrirModal("erro"); 
        }
    };

    const handleDateChange = (date) => {
        setReservaData((prev) => ({ ...prev, dataHora: date }));
    };

    const addParticipantInput = (type) => {
        if (type === "participantesUFCG") {
            setShowUfcgInput(true);
        } else {
            setShowExternalInput(true);
        }
    };

    const confirmParticipant = (type) => {
        setReservaData((prev) => ({
            ...prev,
            [type]: [...prev[type], type === "participantesUFCG" ? newUfcgParticipant : newExternalParticipant],
        }));
        if (type === "participantesUFCG") {
            setShowUfcgInput(false);
            setNewUfcgParticipant({ name: "", email: "" });
        } else {
            setShowExternalInput(false);
            setNewExternalParticipant({ name: "", email: "" });
        }
    };

    const editParticipant = (index, type) => {
        if (type === "participantesUFCG") {
            setEditingUfcgIndex(index);
            setNewUfcgParticipant(reservaData.participantesUFCG[index]);
            setShowUfcgInput(true);
        } else {
            setEditingExternalIndex(index);
            setNewExternalParticipant(reservaData.participantesExternos[index]);
            setShowExternalInput(true);
        }
    };
    if (!reservaData) {
        return <ModalLoading />
    }

    return (
        <div className="container-editar-reserva">
            <Header />
            <MainContent title="Editar Reserva" path={"/admin-detalhes-reserva"} />
            <section className="form-section">
                <div className="form-grid">
                    <div className="input-group">
                        <label htmlFor="data-hora">DATA E HORA</label>
                        <DateTimePicker selectedDate={reservaData.dataHora} onChange={handleDateChange} />
                    </div>
                </div>
                <div className="participants-section">
                    <h3 className="section-title">PARTICIPANTES</h3>
                    <div className="participant-group">
                        <div className="title-and-button">
                            <h4 className="sub-title">UFCG</h4>
                            <div className="add-button" onClick={() => addParticipantInput("participantesUFCG")}>
                                <ion-icon name="add-circle-outline" className="add-button"></ion-icon>
                            </div>
                        </div>
                        {showUfcgInput && editingUfcgIndex === null && (
                            <div className="participant-item">
                                <input type="text" placeholder="Nome" value={newUfcgParticipant.name} onChange={(e) => setNewUfcgParticipant({ ...newUfcgParticipant, name: e.target.value })} />
                                <input type="email" placeholder="Email" value={newUfcgParticipant.email} onChange={(e) => setNewUfcgParticipant({ ...newUfcgParticipant, email: e.target.value })} />
                                <div className="action-buttons">
                                    <ConfirmIcon onClick={() => confirmParticipant("participantesUFCG")} />
                                    <CancelIcon onClick={() => setShowUfcgInput(false)} />
                                </div>
                            </div>
                        )}
                        <div className="participant-list">
                            {reservaData.participantesUFCG.map((participant, index) => (
                                <React.Fragment key={index}>
                                    {showUfcgInput && editingUfcgIndex === index && (
                                        <div className="participant-item">
                                            <input type="text" placeholder="Nome" value={newUfcgParticipant.name} onChange={(e) => setNewUfcgParticipant({ ...newUfcgParticipant, name: e.target.value })} />
                                            <input type="email" placeholder="Email" value={newUfcgParticipant.email} onChange={(e) => setNewUfcgParticipant({ ...newUfcgParticipant, email: e.target.value })} />
                                            <div className="action-buttons">
                                                <ConfirmIcon onClick={() => confirmParticipant("participantesUFCG")} />
                                                <CancelIcon onClick={() => setShowUfcgInput(false)} />
                                            </div>
                                        </div>
                                    )}
                                    <div className="participant-item">
                                        <span>{participant.name || "Novo Participante"}</span>
                                        <span className="participant-email">{participant.email}</span>
                                        <div className="action-icons">
                                            <EditIcon onClick={() => editParticipant(index, "participantesUFCG")} className="edit-icon" />
                                            <TrashIcon onClick={() => removeParticipant(index, "participantesUFCG")} className="trash-icon" />
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
                            <div className="add-button" onClick={() => addParticipantInput("participantesExternos")}>
                                <ion-icon name="add-circle-outline" className="add-button"></ion-icon>
                            </div>
                        </div>
                        {showExternalInput && editingExternalIndex === null && (
                            <div className="participant-item">
                                <input type="text" placeholder="Nome" value={newExternalParticipant.name} onChange={(e) => setNewExternalParticipant({ ...newExternalParticipant, name: e.target.value })} />
                                <input type="email" placeholder="Email" value={newExternalParticipant.email} onChange={(e) => setNewExternalParticipant({ ...newExternalParticipant, email: e.target.value })} />
                                <div className="action-buttons">
                                    <ConfirmIcon onClick={() => confirmParticipant("participantesExternos")} />
                                    <CancelIcon onClick={() => setShowExternalInput(false)} />
                                </div>
                            </div>
                        )}
                        <div className="participant-list">
                            {reservaData.participantesExternos.map((participant, index) => (
                                <React.Fragment key={index}>
                                    {showExternalInput && editingExternalIndex === index && (
                                        <div className="participant-item">
                                            <input type="text" placeholder="Nome" value={newExternalParticipant.name} onChange={(e) => setNewExternalParticipant({ ...newExternalParticipant, name: e.target.value })} />
                                            <input type="email" placeholder="Email" value={newExternalParticipant.email} onChange={(e) => setNewExternalParticipant({ ...newExternalParticipant, email: e.target.value })} />
                                            <div className="action-buttons">
                                                <ConfirmIcon onClick={() => confirmParticipant("participantesExternos")} />
                                                <CancelIcon onClick={() => setShowExternalInput(false)} />
                                            </div>
                                        </div>
                                    )}
                                    <div className="participant-item">
                                        <span>{participant.name || "Novo Participante"}</span>
                                        <span className="participant-email">{participant.email}</span>
                                        <div className="action-icons">
                                            <EditIcon onClick={() => editParticipant(index, "participantesExternos")} className="edit-icon" />
                                            <TrashIcon onClick={() => removeParticipant(index, "participantesExternos")} className="trash-icon" />
                                        </div>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
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
                            buttonText="Voltar"
                            buttonPath={`/admin-detalhes-reserva/${reservation_id}`}
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

                    {/* Modal de erro */}
                    {isModalOpen && modalType === "erro" && (
                        <ModalOneOption
                            iconName="calendario-erro"
                            modalText={errorMessage}
                            buttonText="Tentar novamente"
                            onClick={() => setIsModalOpen(false)}
                        />
                    )}

                    {/* Modal de erro no loading */}
                    {isModalOpen && modalType === "erro-loading" && (
                        <ModalOneOption
                            iconName="circulo-erro"
                            modalText={errorMessage}
                            buttonText="Voltar"
                            buttonPath={`/admin-detalhes-reserva/${reservation_id}`}
                        />
                    )}
                </div>
            </section>
        </div>
    );
};

export default EditarReserva;