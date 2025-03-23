import React from 'react';
import './VisualizarReservas.css';
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import DefaultButton from "./components/Buttons/DefaultButton";
import MainContentWithButton from "./components/MainContentWithButton/MainContentWithButton";


const VizualizarReservas = () => {

    const handleButtonClick = () => {
        
        console.log("Botão clicado!");
    };

    return (
        <div className="container-vizualizar-reserva">
            <Header />
            <MainContentWithButton
                title="Reservas"
                buttonText="Cadastrar Reserva"
            />
            <section className="section-reservas">
                {/* Títulos das colunas */}
                <div className="titulos-reservas">
                    <span>Quadra</span>
                    <span>Esporte</span>
                    <span>Data e Horário</span>
                    <span></span> {/* Espaço vazio para o botão */}
                </div>
                <div className="lista-reservas">
                    {Array(10).fill().map((_, index) => (
                        <div key={index} className="item-reserva">
                            <span>Quadra {index % 2 === 0 ? 1 : 2}</span>
                            <span>{index % 2 === 0 ? 'Vôlei' : 'Society'}</span>
                            <span>01/01/2025 - 18:00h</span>

                            <div className="button">
                                <DefaultButton label={"Detalhes"} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default VizualizarReservas;