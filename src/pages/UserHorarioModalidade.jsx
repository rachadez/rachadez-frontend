import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';
import './UserHorarioModalidade.css';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import DefaultButton from './components/Buttons/DefaultButton';
import ModalOneOption from './components/Modal/ModalOneOption';

const UserHorarioModalidade = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedDate, setSelectedDate] = useState("");

    const { modalidade, quadra } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    // Recebe o ID da arena via state ou params
    const arenaId = location.state?.arenaId || quadra;

    const correctAccents = (str) => {
        const accents = {
            'tenis': 'Tênis',
            'volei': 'Vôlei',
            'beach-tennis': 'Beach Tennis',
            'society': 'Society',
        };
        return accents[str.toLowerCase()] || str;
    };

    const formattedModalidade = correctAccents(modalidade);
    const formattedQuadra = quadra.replace('quadra', '').trim();

    const horarios = {
        manha: [
            { time: "08:00", available: true },
            { time: "09:00", available: false },
            { time: "10:00", available: true },
            { time: "11:00", available: true },
        ],
        tarde: [
            { time: "13:00", available: true },
            { time: "14:00", available: true },
            { time: "15:00", available: false },
            { time: "16:00", available: true },
            { time: "17:00", available: true },
        ],
        noite: [
            { time: "18:00", available: true },
            { time: "19:00", available: false },
            { time: "20:00", available: true },
        ],
    };

    const handleSelectTime = (time) => {
        if (!time.available) return;
        setSelectedTime(time.time);
    };

    const calculateEndTime = (startTime) => {
        const [hours, minutes] = startTime.split(":").map(Number);
        const endTime = new Date();
        endTime.setHours(hours, minutes + 90); // Adiciona 1:30 (90 minutos)
        const endHours = endTime.getHours().toString().padStart(2, "0");
        const endMinutes = endTime.getMinutes().toString().padStart(2, "0");
        return `${endHours}:${endMinutes}`;
    };

    const handleAvancar = () => {
        if (!selectedDate || !selectedTime) {
            setIsModalOpen(true);
            return;
        }

        const endTime = calculateEndTime(selectedTime);

        // Redireciona para a próxima página com os parâmetros necessários
        navigate(`/user-reserva-participantes/${modalidade}/${quadra}`, {
            state: {
                arenaId: Number(arenaId), // Certifique-se de que o ID da arena é um número
                startDate: `${selectedDate}T${selectedTime}:00`, // Data e hora de início
                endDate: `${selectedDate}T${endTime}:00`, // Data e hora de término
            },
        });
    };

    return (
        <div className="horario-modalidade-container">
            <Header />
            <MainContent
                title={`${formattedModalidade} - Quadra ${formattedQuadra}`}
                subtitle="Horários disponíveis"
                path={"/user-reserva-modalidade"}
            />

            <div className="container-agendamento">
                <h2>Agende um horário</h2>
                <div className="container-form-agendamento">
                    <div className="date-container">
                        <label htmlFor="date">Data</label>
                        <input
                            type="date"
                            id="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                    </div>

                    <div className="horario-container">
                        <label>Horários</label>
                        <div className="field">
                            <label>Manhã</label>
                            <div className="timeslot">
                                {horarios.manha.map((horario, index) => (
                                    <div
                                        key={index}
                                        className={`time-option ${horario.available ? '' : 'disabled'} ${selectedTime === horario.time ? 'selected' : ''}`}
                                        onClick={() => handleSelectTime(horario)}
                                    >
                                        {horario.time}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="field">
                            <label>Tarde</label>
                            <div className="timeslot">
                                {horarios.tarde.map((horario, index) => (
                                    <div
                                        key={index}
                                        className={`time-option ${horario.available ? '' : 'disabled'} ${selectedTime === horario.time ? 'selected' : ''}`}
                                        onClick={() => handleSelectTime(horario)}
                                    >
                                        {horario.time}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="field">
                            <label>Noite</label>
                            <div className="timeslot">
                                {horarios.noite.map((horario, index) => (
                                    <div
                                        key={index}
                                        className={`time-option ${horario.available ? '' : 'disabled'} ${selectedTime === horario.time ? 'selected' : ''}`}
                                        onClick={() => handleSelectTime(horario)}
                                    >
                                        {horario.time}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <DefaultButton label="Avançar" onClick={handleAvancar} />
                </div>
            </div>

            {/* Modal exibido quando o usuário não seleciona nenhum horário/data */}
            {isModalOpen && (
                <ModalOneOption
                    iconName="triangulo-amarelo"
                    modalText="Por favor, selecione um horário e uma data para prosseguir"
                    buttonText="Tentar novamente."
                    onClick={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default UserHorarioModalidade;