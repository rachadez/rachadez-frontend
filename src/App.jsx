import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginProfessor from './pages/LoginProfessor';
import LoginAluno from './pages/LoginAluno';
import ProfessorHome from './pages/ProfessorHome';
import AlunoHome from './pages/AlunoHome';
import Cadastro from './pages/Cadastro';
import CadastrarReserva from './pages/CadastrarReserva';
import VisualizarReservas from './pages/VisualizarReservas';
import EditarReserva from './pages/EditarReserva'; 
import AdminMenu from './pages/AdminMenu'
import ReservaDetalhes from './pages/ReservaDetalhes'

function App() {
  return (
    <Router>
      <Routes>
        {/* Página inicial */}
        <Route path="/" element={<Home />} />

        {/* Rotas de Login */}
        <Route path="/login-professor" element={<LoginProfessor />} />
        <Route path="/login-aluno" element={<LoginAluno />} />

        {/* Páginas pós-login */}
        <Route path="/professor-home" element={<ProfessorHome />} />
        <Route path="/aluno-home" element={<AlunoHome />} />

        <Route path="/cadastro" element={<Cadastro/>} />

        <Route path="/cadastrar-reserva" element={<CadastrarReserva />} />

        <Route path="/visualizar-reservas" element={<VisualizarReservas />} />

        <Route path="/editar-reserva" element={<EditarReserva />} />

        <Route path="/admin-menu" element={<AdminMenu />} />

        <Route path="/admin-detalhes-reserva" element={<ReservaDetalhes />} />
      </Routes>
    </Router>
  );
}

export default App;
