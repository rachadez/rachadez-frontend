import React, { useEffect, useState } from 'react';
import './VisualizarReservas.css';
import Header from "./components/Header/Header";
import DefaultButton from "./components/Buttons/DefaultButton";
import MainContentWithButton from "./components/MainContentWithButton/MainContentWithButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VizualizarReservas = () => {
    const navigate = useNavigate();
    const [reservas, setReservas] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    // Função para buscar as reservas
    const fetchReservas = async () => {
        try {
            const token = localStorage.getItem("access_token");
            const response = await axios.get("http://127.0.0.1:8000/v1/reservations/all", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setReservas(response.data); // Atualiza o estado com as reservas recebidas
        } catch (error) {
            console.error("Erro ao buscar reservas:", error);
            setErrorMessage("Erro ao carregar as reservas. Tente novamente mais tarde.");
        }
    };

    // useEffect para buscar as reservas ao carregar a página
    useEffect(() => {
        fetchReservas();
    }, []);

    return (
        <div className="container-vizualizar-reserva">
            <Header />
            <MainContentWithButton
                title="Reservas"
                buttonText="Cadastrar Reserva"
                path={"/admin-menu"}
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
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {reservas.length > 0 ? (
                        reservas.map((reserva) => (
                            <div key={reserva.id} className="item-reserva">
                                <span>Quadra {reserva.arena_id}</span>
                                <span>Esporte</span> {/* Ajuste conforme os dados disponíveis */}
                                <span>
                                    {new Date(reserva.start_date).toLocaleDateString()} -{" "}
                                    {new Date(reserva.start_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                                <div className="button">
                                    <DefaultButton
                                        label={"Detalhes"}
                                        onClick={() => navigate(`/admin-detalhes-reserva/${reserva.id}`)} // Passa o ID da reserva na URL
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Nenhuma reserva encontrada.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default VizualizarReservas;