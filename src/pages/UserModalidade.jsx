import React, { useEffect, useState } from "react";
import Card from "./components/Cards/Card";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import getCustomIcon from "./components/Modal/getIcon/getIcon";
import axios from "axios";
import './UserModalidade.css';
import ModalOneOption from "./components/Modal/ModalOneOption";

const UserModalidade = () => {
  const [modalidades, setModalidades] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  // Função para buscar as arenas disponíveis
  const fetchArenas = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get("http://127.0.0.1:8000/v1/arenas/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Resposta do backend:", response.data);

      // Acessa a propriedade `data` que contém a lista de arenas
      const arenas = response.data.data.map((arena) => ({
        icon: getCustomIcon(arena.type.toLowerCase()),
        title: `${arena.name} - ${arena.type}`,
        path: `/user-reserva-horario/${arena.type.toLowerCase()}/${arena.id}`, // Passa modalidade e ID da quadra
        disabled: false,
        id: arena.id,
      }));

      setModalidades(arenas);
    } catch (error) {
      console.error("Erro ao buscar arenas:", error);
      
      const backendErrorMessage =
        error.response?.data?.detail ||
        "Erro ao carregar as modalidades. Tente novamente mais tarde.";

      setErrorMessage(backendErrorMessage);
      setModalType("erro");
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    fetchArenas();
  }, []);

  if (errorMessage) {
    return (
      isModalOpen && modalType === "erro" && (
        <ModalOneOption
          iconName="X"
          modalText={errorMessage}
          buttonText="Voltar"
          buttonPath="/user-home"
        />
      )
    );
  }

  return (
    <div className="container-user-modalidade">
      <Header />
      <MainContent
        title="Modalidade"
        subtitle="As modalidades que possuem mais de uma quadra são identificadas por números no título, indicando qual quadra está disponível para reserva."
        path={"/user-home"}
      />

      <div className="modalidade-cards-container">
        {modalidades.map((modalidade, index) => (
          <Card
            key={index}
            icon={modalidade.icon}
            title={modalidade.title}
            path={modalidade.path}
            disabled={modalidade.disabled}
          />
        ))}
      </div>
    </div>
  );
};

export default UserModalidade;