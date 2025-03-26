import DeleteButton from "./components/Buttons/DeleteButton";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import TableList from "./components/TableList/TableList"

function AdminUsuariosBanir() {

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
            <MainContent title="Bloquear usuários" subtitle="Clique no usuário que deseja bloquear. Usuários são bloqueados por infrigirem regras do Complexo Esportivo." path={"/admin-usuarios-menu-banimento"}/>

            <TableList cabecalho={cabecalho} dados={dados} botao={<DeleteButton label="Banir"/>}></TableList>
        </>
    )
}

export default AdminUsuariosBanir;