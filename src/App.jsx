import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginProfessor from './pages/LoginProfessor';
import LoginAluno from './pages/LoginAluno';
import ProfessorHome from './pages/ProfessorHome';
import AlunoHome from './pages/AlunoHome';
import Cadastro from './pages/Cadastro';
import CadastrarReserva from './pages/CadastrarReserva';
import VizualizarReservas from './pages/VizualizarReservas';

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

        <Route path="/vizualizar-reservas" element={<VizualizarReservas />} />


      </Routes>
    </Router>
  );
}

export default App;
