import React from "react";
import Header from "./components/Header/Header";
import TableList from "./components/TableList/TableList";
import { useNavigate } from "react-router-dom";
import MainContentWithoutArrow from "./components/MainContentWithoutArrow/MainContentWithoutArrow";

const UserHome = () => {
  const navigate = useNavigate();
  const cabecalho = ["Reserva", "Data", "Hora", "Participantes"];

  const dados = [
    { id: 1, tipo: "Society", data: "09/03/2026", hora: "16:00", participantes: 12, editavel: true },
    { id: 2, tipo: "Vôlei de areia", data: "09/03/2026", hora: "16:00", participantes: 12, editavel: true },
    { id: 3, tipo: "Beach Tennis", data: "09/03/2025", hora: "16:00", participantes: 12, editavel: false },
    { id: 4, tipo: "Society", data: "09/03/2025", hora: "16:00", participantes: 12, editavel: false },
    { id: 5, tipo: "Tênis", data: "09/03/2025", hora: "16:00", participantes: 12, editavel: false },
  ];

  const reservas = dados.map(({ tipo, data, hora, participantes }) => ({
    tipo,
    data,
    hora,
    participantes
  }));

  const reservasEditaveis = dados.filter(r => r.editavel).map(r => r.id);

  const handleView = (id) => {
    navigate(`/user-visualizar-reserva/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/user-editar-reserva/${id}`);
  };

  const handleDelete = async (id) => {
    // await fetch(`/api/reservas/${id}`, { method: "DELETE" });
  };

  return (
    <>
      <Header />
      <MainContentWithoutArrow title={"Minhas reservas"} buttonText={"Cadastrar reserva"} path={"/user-reserva-modalidade"} />
      {/* <MainContentWithoutArrow title={"Minhas reservas"}/> */}

      <TableList cabecalho={cabecalho} dados={reservas} dadosEdit={reservasEditaveis} hideAcoes handleView={handleView} handleEdit={handleEdit} handleDelete={handleDelete}></TableList>
    </>
  );
};

export default UserHome;
