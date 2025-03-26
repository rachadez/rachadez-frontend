import { useNavigate } from "react-router-dom";
import DefaultButton from "./components/Buttons/DefaultButton";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import TableList from "./components/TableList/TableList"

function AdminUsuariosEditar() {
    const navigate = useNavigate();

    const cabecalho = ['Nome', 'CPF', 'Ocupação', 'Telefone'];
  
    const dados = [
      {
        nome: 'Emmanuel Fernandes da Silva Costa',
        cpf: '123.456.789-10',
        ocupacao: 'Aluno',
        telefone: '(83) 9 98888 1202'
      },
      {
        nome: 'Maria do Rosário',
        cpf: '123.456.789-10',
        ocupacao: 'Usuário Externo',
        telefone: '(83) 9 98888 1202'
      },
      {
        nome: 'Epaminodas Cavalcante',
        cpf: '123.456.789-10',
        ocupacao: 'Servidor UFCG',
        telefone: '(83) 9 98888 1202'
      },
      {
        nome: 'Abrâao Lima',
        cpf: '123.456.789-10',
        ocupacao: 'Aluno',
        telefone: '(83) 9 98888 1202'
      }
    ]

    return (
        <>
            <Header></Header>
            <MainContent title="Edite um usuário" subtitle="Clique no usuário que deseja editar informações. Você pode alterar quaisquer campos que desejar." path={"/usuarios-menu"}/>

            <TableList cabecalho={cabecalho} dados={dados} botao={<DefaultButton label="Editar"/>}></TableList>
            
            {/* Editar a forma que o ID é passado */}
            {/* <TableList cabecalho={cabecalho} dados={dados} botao={(usuario) => (<DefaultButton label="Editar" onClick={() => navigate(`/admin-editar-usuario/${usuario.id}`)}/>)}></TableList>  */}

        </>
    )
}


export default AdminUsuariosEditar;