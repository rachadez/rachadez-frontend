import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DeleteButton from "./components/Buttons/DeleteButton";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import TableList from "./components/TableList/TableList"
import ModalTwoOptions from "./components/Modal/ModalTwoOptions";
import ModalOneOption from "./components/Modal/ModalOneOption";

function AdminUsuariosVisualizarBanidos() {

  const navigate = useNavigate();  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const handleDesbanirUsuarioClick = () => {
    setIsModalOpen(true);
    setModalType("desbanir-usuario");
  };

  const handleUsuarioRestaurado = () => {
    setModalType("usuario-restaurado");
  };

    const cabecalho = ['Nome', 'CPF', 'Ocupação', 'Telefone'];
  
    const dados = [
      {
        nome: 'Emmanuel Fernandes da Silva Costa',
        cpf: '123.456.789-10',
        ocupacao: 'Aluno',
        telefone: '(83) 9 98888 1202'
      }
    ]

    return (
        <>
            <Header></Header>
            <MainContent title="Usuários Bloqueados" subtitle="Você pode desbanir usuários nesta lista. Usuários são bloqueados por infrigirem regras do Complexo Esportivo." path={"/admin-usuarios-menu-banimento"}/>

            <TableList cabecalho={cabecalho} dados={dados} botao={<DeleteButton label="Desbanir" onClick={handleDesbanirUsuarioClick}/>}></TableList>
            
            {/* Editar a forma que o ID é passado */}
            {/* <TableList cabecalho={cabecalho} dados={dados} botao={(usuario) => (<DefaultButton label="Editar" onClick={() => navigate(`/admin-editar-usuario/${usuario.id}`)}/>)}></TableList>  */}

            {/* Modal exibido ao clicar para restaurar/desbanir usuário */}
            {isModalOpen && modalType === "desbanir-usuario" && (
                <ModalTwoOptions
                    iconName="triangulo-amarelo"
                    modalText="Tem certeza que deseja restaurar este usuário ao sistema?"
                    buttonTextOne="Desbanir"
                    buttonColorOne="red"
                    onClickButtonOne={handleUsuarioRestaurado}
                    buttonTextTwo="Cancelar"
                    onClickButtonTwo={() => setIsModalOpen(false)}
                />
            )}

            {/* Modal exibido após desbanir o usuário com sucesso */}
            {isModalOpen && modalType === "usuario-restaurado" && (
                <ModalOneOption
                    iconName="sucesso-check"
                    modalText="Usuário desbloqueado com sucesso!"
                    buttonText="Voltar"
                    onClick={() => {
                        setIsModalOpen(false);
                        navigate("/admin-visualizar-usuarios-banidos"); // Adiciona navegação manualmente
                    }}
                />
            )}

        </>
    )
}


export default AdminUsuariosVisualizarBanidos;