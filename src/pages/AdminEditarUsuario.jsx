import React, { useState, useEffect } from "react";
import "./Cadastro.css";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import { UserRoundSearch } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import InputTemplateEdit from "./components/InputTemplate/InputTemplateEdit";
import DefaultButton from "./components/Buttons/DefaultButton";
import axios from "axios";
import ModalLoading from "./components/Modal/ModalLoading";
import ModalOneOption from "./components/Modal/ModalOneOption";


function AdminEditarUsuario() {
  const { id } = useParams(); // Obtém o ID do usuário da URL
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null); // Estado para armazenar os dados do usuário
  const [errorMessage, setErrorMessage] = useState(""); // Estado para mensagens de erro
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

  const traduzirMensagem = (mensagem) => {
    const traducoes = {
      "String should have at least 8 characters": "A senha deve ter pelo menos 8 caracteres",
      "String should have at most 11 characters": "O telefone/cpf deve ter no máximo 11 dígitos",
      "value is not a valid email address: There must be something after the @-sign.": "E-mail inválido: falta o domínio após o símbolo @",
      "value is not a valid email address: An email address must have an @-sign.": "E-mail inválido: o endereço de e-mail deve conter o símbolo @",
      "value is not a valid email address: The part after the @-sign is not valid. It should have a period.": "E-mail inválido: o domínio do e-mail deve conter um ponto, como '.com'",
      "value is not a valid email address: An email address cannot end with a period.": "E-mail inválido: um endereço de e-mail não pode terminar com um ponto ('.')",
      "Input should be 'ALUNO', 'SERVIDOR', 'PROFESSOR' or 'EXTERNO'": "Selecione uma ocupação válida: ALUNO, SERVIDOR, PROFESSOR ou EXTERNO.",
    };
    return traducoes[mensagem] || mensagem;
  };

  // Busca os dados do usuário ao carregar a página
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const token = localStorage.getItem("access_token"); // Obtém o token do localStorage
        const response = await axios.get(`http://127.0.0.1:8000/v1/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
          },
        });

        setUsuario(response.data); // Atualiza o estado com os dados do usuário
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        let mensagemBackend = "Erro ao buscar dados do usuário.";
        const detalhe = error.response?.data?.detail;
  
        if (typeof detalhe === "string") {
          mensagemBackend = detalhe;
        }
  
        setErrorMessage(mensagemBackend);
        abrirModal("erro");
        }      
    };

    fetchUsuario();
  }, [id]);

  // Função para salvar as alterações
  const handleSave = async () => {
    abrirModal("carregando")

    try {
      console.log("Dados enviados:", usuario);
      const token = localStorage.getItem("access_token");

      const dadosParaEnvio = {
        email: usuario.email,
        cpf: usuario.cpf,
        phone: usuario.phone,
        occupation: usuario.occupation,
        is_active: usuario.is_active ?? true,
        is_admin: usuario.is_admin ?? false,
        is_internal: usuario.is_internal ?? true,
        full_name: usuario.full_name,
        password: usuario.password || undefined,
      };

      console.log("Dados formatados para envio:", dadosParaEnvio);

      const response = await axios.patch(`http://127.0.0.1:8000/v1/users/${id}`, dadosParaEnvio, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Resposta do backend:", response.data);

      // Atualiza o estado com os dados atualizados recebidos do backend
      setUsuario(response.data);
      fecharModal(); //fecha o loading
      abrirModal("sucesso");

    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
      
      let mensagemBackend = "Erro ao atualizar o usuário. Tente novamente mais tarde.";
  
      const detalhe = error.response?.data?.detail;
  
      if (detalhe) {
        const mensagens = Array.isArray(detalhe)
          ? detalhe.map((err) => traduzirMensagem(err.msg))
          : [typeof detalhe === "string" ? traduzirMensagem(detalhe) : traduzirMensagem(detalhe?.msg)];
  
        mensagemBackend = mensagens[0];
      }

      fecharModal(); // fecha o de loading
      setErrorMessage(mensagemBackend);
      abrirModal("erro"); 
    }
  };

  if (!usuario) {
    return (
      <div className="cadastro-page">
        <Header />
        <MainContent
          path={"/admin-editar-usuarios"}
          title={"Carregando..."}
          subtitle={"Aguarde enquanto os dados do usuário são carregados."}
        />
      </div>
    );
  }

  return (
    <div className="cadastro-page">
      <Header />
      <MainContent
        path={"/admin-editar-usuarios"}
        title={"Editando usuário"}
        subtitle={"Você pode editar quaisquer campos que desejar. Tome as devidas precauções ao efetuar esta operação."}
      />

      <div className="form-wrapper">
        <div className="form-container">
          <div className="form-group">
            <InputTemplateEdit
              label="Nome completo"
              value={usuario.full_name}
              onChange={(e) => setUsuario({ ...usuario, full_name: e })} // Atualiza o estado usuario
            />
          </div>
          <div className="form-group">
            <InputTemplateEdit
              label="CPF"
              value={usuario.cpf}
              onChange={(e) => setUsuario({ ...usuario, cpf: e })} // Atualiza o estado usuario
            />
          </div>
          <div className="form-group">
            <InputTemplateEdit
              label="Ocupação"
              value={usuario.occupation}
              onChange={(e) => setUsuario({ ...usuario, occupation: e })} // Atualiza o estado usuario
            />
          </div>
          <div className="form-group">
            <InputTemplateEdit
              label="E-mail"
              value={usuario.email}
              onChange={(e) => setUsuario({ ...usuario, email: e })} // Atualiza o estado usuario
            />
          </div>
          <div className="form-group">
            <InputTemplateEdit
              type="password"
              label="Senha"
              value={usuario.password || ""}
              onChange={(e) => setUsuario({ ...usuario, password: e })} // Atualiza o estado usuario
            />
          </div>
          <div className="form-group">
            <InputTemplateEdit
              label="Telefone"
              value={usuario.phone}
              onChange={(e) => setUsuario({ ...usuario, phone: e })} // Atualiza o estado usuario
            />
          </div>
        </div>

        <div className="button">
          <DefaultButton label={"Finalizar edição"} onClick={handleSave} />
        </div>
      </div>


      {isModalOpen && modalType === "erro" && (
        <ModalOneOption
          iconName="X"
          modalText={errorMessage}
          buttonText="Tentar novamente"
          onClick={fecharModal}
        />
      )}

      {isModalOpen && modalType === "sucesso" && (
        <ModalOneOption
          iconName="sucesso-check"
          modalText="Usuário atualizado com sucesso!"
          buttonText="Voltar"
          buttonPath="/admin-editar-usuarios"
        />
      )}

      {isModalOpen && modalType === "carregando" && (
        <ModalLoading texto="Atualizando usuário..." />
      )}
    </div>
  );
}

export default AdminEditarUsuario;