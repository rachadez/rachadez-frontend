import React, { useState, useEffect } from "react";
import "./Cadastro.css";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import { UserRoundSearch } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import InputTemplateEdit from "./components/InputTemplate/InputTemplateEdit";
import DefaultButton from "./components/Buttons/DefaultButton";
import axios from "axios";

function AdminEditarUsuario() {
  const { id } = useParams(); // Obtém o ID do usuário da URL
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null); // Estado para armazenar os dados do usuário
  const [errorMessage, setErrorMessage] = useState(""); // Estado para mensagens de erro

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
        setErrorMessage("Erro ao carregar os dados do usuário. Tente novamente mais tarde.");
      }
    };

    fetchUsuario();
  }, [id]);

  // Função para salvar as alterações
  const handleSave = async () => {
    try {
      console.log("Dados enviados:", usuario); // Verifica os dados enviados
      const token = localStorage.getItem("access_token");

      // Prepara os dados para envio, garantindo que todos os campos obrigatórios estejam presentes
      const dadosParaEnvio = {
        email: usuario.email,
        cpf: usuario.cpf,
        phone: usuario.phone,
        occupation: usuario.occupation,
        is_active: usuario.is_active ?? true, // Define como ativo por padrão, se não estiver definido
        is_admin: usuario.is_admin ?? false, // Define como não administrador por padrão
        is_internal: usuario.is_internal ?? true, // Define como interno por padrão
        full_name: usuario.full_name,
        password: usuario.password || undefined, // Envia a senha apenas se for alterada
      };

      console.log("Dados formatados para envio:", dadosParaEnvio);

      // Envia a requisição PATCH para o backend
      const response = await axios.patch(`http://127.0.0.1:8000/v1/users/${id}`, dadosParaEnvio, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Resposta do backend:", response.data);

      // Redireciona para a página de listagem após salvar
      navigate("/admin-editar-usuarios");
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);

      if (error.response && error.response.status === 422) {
        setErrorMessage("Erro nos dados enviados. Verifique os campos e tente novamente.");
      } else {
        setErrorMessage("Erro ao salvar as alterações. Tente novamente mais tarde.");
      }
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
              onChange={(e) => setUsuario({ ...usuario, full_name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <InputTemplateEdit
              label="CPF"
              value={usuario.cpf}
              onChange={(e) => setUsuario({ ...usuario, cpf: e.target.value })}
            />
          </div>
          <div className="form-group">
            <InputTemplateEdit
              label="Ocupação"
              value={usuario.occupation}
              onChange={(e) => setUsuario({ ...usuario, occupation: e.target.value })}
            />
          </div>
          <div className="form-group">
            <InputTemplateEdit
              label="E-mail"
              value={usuario.email}
              onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <InputTemplateEdit
              type="password"
              label="Senha"
              value={usuario.password || ""}
              onChange={(e) => setUsuario({ ...usuario, password: e.target.value })}
            />
          </div>
          <div className="form-group">
            <InputTemplateEdit
              label="Telefone"
              value={usuario.phone}
              onChange={(e) => setUsuario({ ...usuario, phone: e.target.value })}
            />
          </div>
        </div>

        <div className="button">
          <DefaultButton label={"Finalizar edição"} onClick={handleSave} />
        </div>
      </div>
    </div>
  );
}

export default AdminEditarUsuario;