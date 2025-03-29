import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';
import './UserHorarioModalidade.css';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import DefaultButton from './components/Buttons/DefaultButton';

const UserHorarioModalidade = () => {
    const [selectedTime, setSelectedTime] = useState(null);
    const { modalidade, quadra } = useParams();
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

    return (
        <div className="horario-modalidade-container">
            <Header />
            <MainContent title={`${formattedModalidade} - Quadra ${formattedQuadra}`} subtitle="Horários disponíveis" path={"/user-reservar-modalidade"}/>
    
            <div className="container-agendamento">
                <h2>Agende um horário</h2>
                <div className="container-form-agendamento">
                    <div className="date-container">
                        <label htmlFor="date">Data</label>
                        <input type="date" id="date" />
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
                <DefaultButton label="Avançar" />
                </div>
            </div>
        </div>
      );
}

export default UserHorarioModalidade;