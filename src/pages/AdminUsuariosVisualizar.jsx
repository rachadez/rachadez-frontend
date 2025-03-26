import DefaultButton from "./components/Buttons/DefaultButton";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import TableList from "./components/TableList/TableList"

function AdminUsuariosVisualizar() {

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
            <MainContent title="Visualizar usuários" subtitle="Aqui, encontram-se todos os usuários do sistema, desde membros da UFCG a Usuários Externos." path={"/usuarios-menu"}/>

            <TableList cabecalho={cabecalho} dados={dados} botao={<DefaultButton label="Ver"/>}></TableList>
        </>
    )
}

export default AdminUsuariosVisualizar;