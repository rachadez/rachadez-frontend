import React, { useEffect, useState } from "react";
import "./ReservaDetalhes.css";
import Header from "./components/Header/Header";
import { ArrowLeft } from "lucide-react";
import SecondaryButton from "./components/Buttons/SecondaryButton";
import { useNavigate, useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";
import Logo from "../assets/Logo_3_vazada.png";
import ModalTwoOptions from "./components/Modal/ModalTwoOptions";
import ModalOneOption from "./components/Modal/ModalOneOption";
import axios from "axios";

const ReservaDetalhes = () => {
  const navigate = useNavigate();
  const { id: reservation_id } = useParams(); // Captura o reservation_id da URL
  const [reservaData, setReservaData] = useState(null); // Estado para armazenar os dados da reserva
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Estado para mensagens de erro

  // Função para buscar o user_id do usuário logado
  const fetchUserId = async () => {
    try {
      const token = localStorage.getItem("access_token"); // Obtém o token do localStorage
      if (!token) {
        setErrorMessage("Usuário não autenticado. Faça login novamente.");
        navigate("/login"); // Redireciona para a página de login
        return null;
      }

      const response = await axios.get("http://127.0.0.1:8000/v1/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.id; // Retorna o user_id
    } catch (error) {
      console.error("Erro ao buscar o ID do usuário:", error);
      setErrorMessage("Erro ao carregar os dados do usuário. Tente novamente mais tarde.");
      return null;
    }
  };

  // Função para buscar os detalhes da reserva
  const fetchReserva = async (user_id) => {
    try {
      const token = localStorage.getItem("access_token"); // Obtém o token do localStorage
      const url = `http://127.0.0.1:8000/v1/reservations/${user_id}/${reservation_id}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReservaData(response.data); // Atualiza o estado com os dados da reserva
    } catch (error) {
      console.error("Erro ao buscar os dados da reserva:", error);
      setErrorMessage("Erro ao carregar os dados da reserva. Tente novamente mais tarde.");
    }
  };

  // Função para deletar a reserva
  const handleDeletaReserva = async () => {
    try {
      const token = localStorage.getItem("access_token"); // Obtém o token do localStorage
      const url = `http://127.0.0.1:8000/v1/reservations/${reservation_id}`;
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setModalType("reserva-deletada");
    } catch (error) {
      console.error("Erro ao deletar a reserva:", error);
      setErrorMessage("Erro ao deletar a reserva. Tente novamente mais tarde.");
    }
  };

  // useEffect para buscar os dados da reserva ao carregar o componente
  useEffect(() => {
    const fetchData = async () => {
      const user_id = await fetchUserId(); // Busca o user_id do usuário logado
      if (user_id) {
        await fetchReserva(user_id); // Busca os dados da reserva
      }
    };

    fetchData();
  }, [reservation_id]);

  const handleDownloadPDFClick = () => {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const imgWidth = 90;
    const imgHeight = 50;
    const imgX = (pageWidth - imgWidth) / 2;

    doc.addImage(Logo, "PNG", imgX, 10, imgWidth, imgHeight);

    doc.setTextColor(11, 83, 184);
    doc.setFontSize(18);
    doc.text(`Reserva Quadra ${reservaData?.arena_id}`, 20, 63);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(`${new Date(reservaData?.start_date).toLocaleDateString()} - ${new Date(reservaData?.start_date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`, 20, 72);

    const headers = [["Nome", "Ocupação", "Email"]];
    const data = reservaData?.participants.map((participant) => [
      participant.name,
      participant.occupation,
      participant.email,
    ]);

    autoTable(doc, {
      startY: 80,
      head: headers,
      body: data,
      headStyles: {
        fillColor: [0, 102, 204],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      styles: {
        fillColor: [230, 240, 255],
        textColor: [0, 0, 0],
      },
    });

    doc.save("reserva_detalhes.pdf");
  };

  if (errorMessage) {
    return <p className="error-message">{errorMessage}</p>;
  }

  if (!reservaData) {
    return <p>Carregando dados da reserva...</p>;
  }

  return (
    <div className="container-vizualizar-reservaDetalhes">
      <Header />
      <div className="main-content-reservaDetalhes">
        <div className="title-container-reservaDetalhes">
          <div className="title-left-reservaDetalhes">
            <ArrowLeft className="arrow-left-reservaDetalhes" color="#ffffff" size={40} onClick={() => navigate("/visualizar-reservas")} />
            <h1 className="title-reservaDetalhes">Reserva Quadra {reservaData.arena_id}</h1>
          </div>
          <h2 className="subtitle-reservaDetalhes">
            {new Date(reservaData.start_date).toLocaleDateString()} - {new Date(reservaData.start_date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </h2>
        </div>

        <div className="button-container-reservaDetalhes">
          <SecondaryButton
            label="Editar"
            onClick={() => navigate(`/editar-reserva/${reservation_id}`)}
            className="secondary-button-reservaDetalhes"
          />
          <SecondaryButton
            label="Baixar PDF"
            onClick={handleDownloadPDFClick}
            className="secondary-button-reservaDetalhes"
          />
          <button
            className="delete-button-reservaDetalhes"
            onClick={() => {
              setIsModalOpen(true);
              setModalType("deletar-reserva");
            }}
          >
            Deletar
          </button>
        </div>
      </div>

      <section className="section-reservas-reservaDetalhes">
        <div className="responsavel-reservaDetalhes">
          <span className="responsavel-flag-reservaDetalhes">(Responsável)</span>
          <span className="responsavel-nome-reservaDetalhes">{reservaData.responsible_user_id}</span>
        </div>

        <div className="titulos-reservas-reservaDetalhes">
          <span>Nome</span>
          <span>Ocupação</span>
          <span>Email</span>
        </div>

        <div className="lista-reservas-reservaDetalhes">
          {reservaData.participants.map((participant, index) => (
            <div key={index} className="item-reserva-reservaDetalhes">
              <span>{participant.name}</span>
              <span>{participant.occupation}</span>
              <span>{participant.email}</span>
            </div>
          ))}
        </div>
      </section>

      {isModalOpen && modalType === "deletar-reserva" && (
        <ModalTwoOptions
          iconName="triangulo-amarelo"
          modalText="Tem certeza que deseja remover esta reserva?"
          buttonTextOne="Remover"
          buttonColorOne="red"
          onClickButtonOne={handleDeletaReserva}
          buttonTextTwo="Cancelar"
          onClickButtonTwo={() => setIsModalOpen(false)}
        />
      )}

      {isModalOpen && modalType === "reserva-deletada" && (
        <ModalOneOption
          iconName="sucesso-check"
          modalText="Reserva deletada com sucesso!"
          buttonText="Voltar"
          buttonPath="/visualizar-reservas"
        />
      )}
    </div>
  );
};

export default ReservaDetalhes;