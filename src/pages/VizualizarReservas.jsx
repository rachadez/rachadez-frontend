import React from 'react';
import './VizualizarReservas.css';
import Header from "./components/Header/Header";


const VizualizarReservas = () => {
    return (
        <div className="bg-gray-100">
            <Header />
            <main className="bg-blue-600 text-white p-4">
                <div className="flex items-center mb-4">
                    <i className="fas fa-arrow-left text-2xl mr-4"></i>
                    <h2 className="text-2xl font-bold">Reservas</h2>
                </div>
                <button className="bg-white text-blue-600 font-bold py-2 px-4 rounded">Cadastrar Reserva</button>
            </main>
            <section className="p-4">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="py-2 px-4 text-left">Quadra</th>
                            <th className="py-2 px-4 text-left">Esporte</th>
                            <th className="py-2 px-4 text-left">Data e horário</th>
                            <th className="py-2 px-4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array(10).fill().map((_, index) => (
                            <tr className="border-b" key={index}>
                                <td className="py-2 px-4">Quadra {index % 2 === 0 ? 1 : 2}</td>
                                <td className="py-2 px-4">{index % 2 === 0 ? 'Vôlei' : 'Society'}</td>
                                <td className="py-2 px-4">01/01/2025 - 18:00h</td>
                                <td className="py-2 px-4">
                                    <button className="bg-blue-600 text-white py-1 px-3 rounded">Ver detalhes</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default VizualizarReservas;