import React, { useState, useEffect } from "react";
import "./CadastrarReserva.css";
import ConfigIcon from "./components/LogoutIcon/LogoutIcon";
import TrashIcon from "./components/TrashIcon/TrashIcon";
import ArrowIcon from "./components/ArrowIcon/ArrowIcon";
import DateTimePicker from "./components/DateTimePicker/DateTimePicker";
import ConfirmIcon from "./components/ConfirmIcon/ConfirmIcon";
import CancelIcon from "./components/CancelIcon/CancelIcon";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import ModalTwoOptions from "./components/Modal/ModalTwoOptions";
import ModalOneOption from "./components/Modal/ModalOneOption";
import axios from "axios";

const CadastrarReserva = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [ufcgParticipantInputs, setUfcgParticipantInputs] = useState([]);
  const [externalParticipantInputs, setExternalParticipantInputs] = useState([]);
  const [ufcgParticipants, setUfcgParticipants] = useState([]);
  const [externalParticipants, setExternalParticipants] = useState([]);
  const [users, setUsers] = useState([]);
  const [responsavel, setResponsavel] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [arenas, setArenas] = useState([]);
  const [arenaId, setArenaId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const abrirModal = (tipo) => {
    setModalType(tipo);
    setIsModalOpen(true);
  };

  const fecharModal = () => {
    setModalType("");
    setIsModalOpen(false);
  };

  const traduzirMensagem = (mensagem) => {
    const traducoes = {
      "Input should be a valid UUID, invalid length: expected length 32 for simple format, found 0": "Selecione um responsável pela reserva",
    };
    return traducoes[mensagem] || mensagem;
  };

  const getPerfil = async () => {
    const token = localStorage.getItem("access_token");

    const response = await axios.get("http://127.0.0.1:8000/v1/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = response.data;

    const isAdmin = user?.is_admin;
    return isAdmin;
  };

  const fetchArenas = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get("http://127.0.0.1:8000/v1/arenas/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (Array.isArray(response.data.data)) {
        setArenas(response.data.data);
      } else {
        console.error("Resposta inesperada da API:", response.data);
        setErrorMessage("Erro ao carregar arenas. Resposta inesperada do servidor.");
      }
    } catch (error) {
      console.error("Erro ao buscar arenas:", error);
      setErrorMessage("Erro ao carregar arenas. Tente novamente mais tarde.");
      abrirModal("erro-loading");
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get("http://127.0.0.1:8000/v1/users/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        console.error("Resposta inesperada da API:", response.data);
        setErrorMessage("Erro ao carregar usuários. Resposta inesperada do servidor.");
      }
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      setErrorMessage("Erro ao carregar usuários. Tente novamente mais tarde.");
      abrirModal("erro-loading");
    }
  };

  const addUfcgParticipant = (index) => {
    const email = ufcgParticipantInputs[index].email;
    const user = users.find((u) => u.email === email && u.is_internal);
    if (user) {
      setUfcgParticipants([...ufcgParticipants, { name: user.full_name, email: user.email, id: user.id }]);
      setUfcgParticipantInputs(ufcgParticipantInputs.filter((_, i) => i !== index));
    } else {
      setErrorMessage("Usuário não encontrado ou não é da UFCG.");
      abrirModal("erro");
    }
  };

  const addExternalParticipant = (index) => {
    const email = externalParticipantInputs[index].email;
    const user = users.find((u) => u.email === email && !u.is_internal);
    if (user) {
      setExternalParticipants([...externalParticipants, { name: user.full_name, email: user.email, id: user.id }]);
      setExternalParticipantInputs(externalParticipantInputs.filter((_, i) => i !== index));
    } else {
      setErrorMessage("Usuário não encontrado ou não é externo.");
      abrirModal("erro");
    }
  };

  const subtractHours = (date, hours) => {
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() - hours);
    return newDate;
  };

  const handleCadastrarReserva = async () => {
    abrirModal("carregando");

    try {
      const token = localStorage.getItem("access_token");

      const uniqueParticipants = [...new Set([
        ...(responsavel?.id ? [responsavel.id] : []),
        ...ufcgParticipants.map((p) => p.id),
        ...externalParticipants.map((p) => p.id),
      ])];

      const adjustedStartDate = subtractHours(new Date(selectedDate), 3).toISOString();
      const endDate = new Date(selectedDate.getTime() + 90 * 60000);
      const adjustedEndDate = subtractHours(new Date(endDate), 3).toISOString();

      const dadosParaEnvio = {
        responsible_user_id: responsavel?.id || "",
        arena_id: String(arenaId),
        start_date: adjustedStartDate,
        end_date: adjustedEndDate,
        participants: uniqueParticipants,
      };

      const verifyUrl = `http://127.0.0.1:8000/v1/reservations/arena/${arenaId}`;
      const verifyResponse = await axios.post(verifyUrl, {
        start_date: adjustedStartDate,
        end_date: adjustedEndDate,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const available = verifyResponse.data;

      if (!available) {
        fecharModal();
        abrirModal("sobrescrever");
        return;
      }

      console.log("Dados enviados para o backend:", dadosParaEnvio);

      const response = await axios.post("http://127.0.0.1:8000/v1/reservations/", dadosParaEnvio, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Reserva realizada com sucesso:", response.data);
      fecharModal();
      abrirModal("sucesso");
    } catch (error) {
      console.error("Erro ao cadastrar reserva:", error);
      const detail = error?.response?.data?.detail;
      let message = "Erro ao cadastrar reserva";

      if (error.response && error.response.data) {
        if (typeof detail === "string") {
          message = detail;
        } else if (Array.isArray(detail)) {
          message = detail[0]?.msg || message;
        } else if (typeof detail === "object" && detail?.msg) {
          message = detail.msg;
        }

        setErrorMessage(traduzirMensagem(message));
      } else {
        setErrorMessage("Erro ao cadastrar reserva. Tente novamente mais tarde.");
      }

      fecharModal();
      abrirModal("erro");
    }
  };

  useEffect(() => {
    fetchArenas();
    fetchUsers();
  }, []);

  const handleSobrescreverReserva = async () => {
    abrirModal("carregando");

    try {
      const isAdmin = await getPerfil();

      if (!isAdmin) {
        setErrorMessage("Apenas administradores podem sobrescrever reservas.");
        fecharModal();
        abrirModal("erro");
        return;
      }

      const token = localStorage.getItem("access_token");

      const uniqueParticipants = [...new Set([
        ...(responsavel?.id ? [responsavel.id] : []),
        ...ufcgParticipants.map((p) => p.id),
        ...externalParticipants.map((p) => p.id),
      ])];

      const adjustedStartDate = subtractHours(new Date(selectedDate), 3).toISOString();
      const endDate = new Date(selectedDate.getTime() + 90 * 60000);
      const adjustedEndDate = subtractHours(new Date(endDate), 3).toISOString();

      const dadosParaEnvio = {
        responsible_user_id: responsavel?.id || "",
        arena_id: String(arenaId),
        start_date: adjustedStartDate,
        end_date: adjustedEndDate,
        participants: uniqueParticipants,
      };

      const response = await axios.post("http://127.0.0.1:8000/v1/reservations/", dadosParaEnvio, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Reserva sobrescrita com sucesso:", response.data);
      fecharModal();
      abrirModal("sucesso-sobrescrita");
    } catch (error) {
      console.error("Erro ao sobrescrever reserva:", error);
      const detail = error?.response?.data?.detail;
      let message = "Erro ao cadastrar reserva. Verifique os dados e tente novamente.";

      if (typeof detail === "string") {
        message = detail;
      } else if (Array.isArray(detail)) {
        message = detail[0]?.msg || message;
      } else if (typeof detail === "object" && detail?.msg) {
        message = detail.msg;
      }

      setErrorMessage(traduzirMensagem(message));
      fecharModal();
      abrirModal("erro");
    }
  };

  return (
    <div className="container-cadastrar-reserva">
      <Header />
      <MainContent title="Cadastrar Reserva" path={"/visualizar-reservas"} />
      <section className="form-section">
        <div className="form-grid">
          <div className="input-group">
            <label htmlFor="esporte">Esporte</label>
            <select
              id="esporte"
              className="select-input"
              value={arenaId || ""}
              onChange={(e) => setArenaId(e.target.value)}
            >
              <option value="">Selecione uma arena</option>
              {arenas.map((arena) => (
                <option key={arena.id} value={arena.id}>
                  {arena.name}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="data-hora">DATA E HORA</label>
            <DateTimePicker selectedDate={selectedDate} onChange={setSelectedDate} />
          </div>
        </div>
        <div className="participants-section">
          <h3 className="section-title">PARTICIPANTES</h3>
          <div className="participant-group">
            <div className="title-and-button">
              <h4 className="sub-title">UFCG</h4>
              <div className="add-button" onClick={() => setUfcgParticipantInputs([...ufcgParticipantInputs, { email: "" }])}>
                <ion-icon name="add-circle-outline" className="add-button"></ion-icon>
              </div>
            </div>
            {ufcgParticipantInputs.map((participant, index) => (
              <div key={index} className="participant-item">
                <input
                  type="email"
                  placeholder="Email"
                  value={participant.email}
                  onChange={(e) => {
                    const updatedInputs = [...ufcgParticipantInputs];
                    updatedInputs[index].email = e.target.value;
                    setUfcgParticipantInputs(updatedInputs);
                  }}
                />
                <div className="action-buttons">
                  <ConfirmIcon onClick={() => addUfcgParticipant(index)} />
                  <CancelIcon
                    onClick={() => setUfcgParticipantInputs(ufcgParticipantInputs.filter((_, i) => i !== index))}
                  />
                </div>
              </div>
            ))}
            <div className="participant-list">
              {ufcgParticipants.map((participant, index) => (
                <div key={index} className="participant-item">
                  <span>{participant.name}</span>
                  <span className="participant-email">{participant.email}</span>
                  <div className="action-icons">
                    <input
                      type="radio"
                      name="responsavel"
                      checked={responsavel?.id === participant.id}
                      onChange={() => setResponsavel(participant)}
                    />
                    <label className="responsavel-label">Responsável</label>
                    <TrashIcon onClick={() => setUfcgParticipants(ufcgParticipants.filter((_, i) => i !== index))} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="participant-group">
            <div className="title-and-button">
              <h4 className="sub-title">USUÁRIOS EXTERNOS</h4>
              <div className="add-button" onClick={() => setExternalParticipantInputs([...externalParticipantInputs, { email: "" }])}>
                <ion-icon name="add-circle-outline" className="add-button"></ion-icon>
              </div>
            </div>
            {externalParticipantInputs.map((participant, index) => (
              <div key={index} className="participant-item">
                <input
                  type="email"
                  placeholder="Email"
                  value={participant.email}
                  onChange={(e) => {
                    const updatedInputs = [...externalParticipantInputs];
                    updatedInputs[index].email = e.target.value;
                    setExternalParticipantInputs(updatedInputs);
                  }}
                />
                <div className="action-buttons">
                  <ConfirmIcon onClick={() => addExternalParticipant(index)} />
                  <CancelIcon
                    onClick={() => setExternalParticipantInputs(externalParticipantInputs.filter((_, i) => i !== index))}
                  />
                </div>
              </div>
            ))}
            <div className="participant-list">
              {externalParticipants.map((participant, index) => (
                <div key={index} className="participant-item">
                  <span>{participant.name}</span>
                  <span className="participant-email">{participant.email}</span>
                  <div className="action-icons">
                    <input
                      type="radio"
                      name="responsavel"
                      checked={responsavel?.id === participant.id}
                      onChange={() => setResponsavel(participant)}
                    />
                    <label className="responsavel-label">Responsável</label>
                    <TrashIcon onClick={() => setExternalParticipants(externalParticipants.filter((_, i) => i !== index))} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="submit-button-container">
          <button className="submit-button" onClick={() => abrirModal("confirmacao")}>
            Cadastrar Reserva
          </button>
        </div>

        {isModalOpen && modalType === "sobrescrever" && (
          <ModalTwoOptions
            iconName="calendario-erro"
            modalText="Já existe uma reserva nesse horário. Deseja sobrescrever?"
            buttonTextOne="Sobrescrever"
            buttonColorOne="red"
            onClickButtonOne={handleSobrescreverReserva}
            buttonTextTwo="Cancelar"
            onClickButtonTwo={fecharModal}
          />
        )}

        {isModalOpen && modalType === "sucesso" && (
          <ModalOneOption
            iconName="calendario-check"
            modalText="Reserva realizada com sucesso!"
            buttonText="Voltar"
            buttonPath="/visualizar-reservas"
          />
        )}

        {isModalOpen && modalType === "sucesso-sobrescrita" && (
          <ModalOneOption
            iconName="calendario-check"
            modalText="Reserva sobrescrita com sucesso!"
            buttonText="Voltar"
            buttonPath="/visualizar-reservas"
          />
        )}

        {isModalOpen && modalType === "erro" && (
          <ModalOneOption
            iconName="X"
            modalText={errorMessage || "Erro inesperado, tente novamente mais tarde."}
            buttonText="Fechar"
            buttonPath=""
            onClick={fecharModal}
          />
        )}

        {isModalOpen && modalType === "erro-loading" && (
          <ModalOneOption
            iconName="circulo-erro"
            modalText={errorMessage || "Erro ao carregar dados."}
            buttonText="Voltar"
            buttonPath="/visualizar-reservas"
          />
        )}

        {isModalOpen && modalType === "confirmacao" && (
          <ModalTwoOptions
            iconName="calendario-relogio"
            modalText="Deseja confirmar a reserva?"
            buttonTextOne="Confirmar"
            onClickButtonOne={() => {
              fecharModal();
              handleCadastrarReserva();
            }}
            buttonTextTwo="Cancelar"
            onClickButtonTwo={fecharModal}
          />
        )}
      </section>
    </div>
  );
};

export default CadastrarReserva;