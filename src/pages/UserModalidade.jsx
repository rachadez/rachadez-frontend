import React, { useEffect, useState } from "react";
import Card from "./components/Cards/Card";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import getCustomIcon from "./components/Modal/getIcon/getIcon";
import axios from "axios";
import './UserModalidade.css';
import ModalLoading from "./components/Modal/ModalLoading";

const UserModalidade = () => {
  const [modalidades, setModalidades] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const abrirModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const fecharModal = () => {
    setModalType("");
    setIsModalOpen(false);
  };

  const tipoAlias = {
    "volei": "volei",
    "beach_tennis": "beach-tennis",
    "tênis": "tennis",
    "tenis": "tennis", // só por segurança
    "society": "futebol", 
  };

  const corrigirNome = (nome) => {
    return nome
      .replace(/volei/gi, "Vôlei")
      .replace(/tenis/gi, "Tênis")
  };

  // Função para buscar as arenas disponíveis
  const fetchArenas = async () => {
    abrirModal("carregando");

    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get("http://127.0.0.1:8000/v1/arenas/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Resposta do backend:", response.data);

      // Acessa a propriedade `data` que contém a lista de arenas
      const arenas = response.data.data.map((arena) => {
        const tipoOriginal = arena.type.toLowerCase();
        const tipoPadronizado = tipoAlias[tipoOriginal] || tipoOriginal;
      
        return {
          icon: getCustomIcon(tipoPadronizado),
          title: corrigirNome(arena.name),
          path: `/user-reserva-horario/${tipoPadronizado}/${arena.id}`,
          disabled: false,
          id: arena.id,
        };
      });

      setModalidades(arenas);
    } catch (error) {
      console.error("Erro ao buscar arenas:", error);
      const mensagemErro =
        error?.response?.data?.detail || "Erro ao carregar as modalidades.";
      setErrorMessage(mensagemErro);
      abrirModal("erro")
    } finally {
      fecharModal();
    }
  };

  useEffect(() => {
    fetchArenas();
  }, []);

  if (isModalOpen && modalType === "carregando") {
    return <ModalLoading />;
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

      {isModalOpen && modalType === "erro" && (
        <ModalOneOption
          iconName="X"
          modalText={errorMessage}
          buttonText="Fechar"
          onClick={fecharModal}
        />
      )}
    </div>
  );
};

export default UserModalidade;