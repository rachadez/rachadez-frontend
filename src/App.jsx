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
import AdminUsuariosMenu from './pages/AdminUsuariosMenu';
import ReservaDetalhes from './pages/ReservaDetalhes'
import AdminCadastroUsuarioUFCG from './pages/AdminCadastroUsuarioUFCG';
import AdminCadastroUsuarioExterno from './pages/AdminCadastroUsuarioExterno';
import AdminEditarUsuario from './pages/AdminEditarUsuario';
import AdminUsuariosEditar from './pages/AdminUsuariosEditar';
import AdminUsuariosExcluir from './pages/AdminUsuariosExcluir';
import AdminUsuariosVisualizar from './pages/AdminUsuariosVisualizar';
import AdminVisualizarUsuario from './pages/AdminVisualizarUsuario';
import AdminUsuariosMenuBanimento from './pages/AdminUsuariosMenuBanimento';
import AdminUsuariosBanir from './pages/AdminUsuariosBanir';


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
        {/* Users */}
        <Route path="/professor-home" element={<ProfessorHome />} />
        <Route path="/aluno-home" element={<AlunoHome />} />

        <Route path="/cadastro" element={<Cadastro />} />

        <Route path="/cadastrar-reserva" element={<CadastrarReserva />} />

        <Route path="/visualizar-reservas" element={<VisualizarReservas />} />

        <Route path="/editar-reserva" element={<EditarReserva />} />

        {/* Admin */}
        <Route path="/admin-menu" element={<AdminMenu />} />

        <Route path="/usuarios-menu" element={<AdminUsuariosMenu />} />

        <Route path="/admin-detalhes-reserva" element={<ReservaDetalhes />} />
          
        <Route path="/cadastrar-usuario-ufcg" element={<AdminCadastroUsuarioUFCG />} />
        
        <Route path="/cadastrar-usuario-externo" element={<AdminCadastroUsuarioExterno />} />
          
        <Route path="/admin-detalhes-reserva" element={<ReservaDetalhes />} />

        <Route path="/admin-editar-usuarios" element={<AdminUsuariosEditar />} />
      
        <Route path='/editar-usuario/:usuarioId' element={<AdminEditarUsuario />} />

        <Route path="/admin-excluir-usuarios" element={<AdminUsuariosExcluir />} />

        <Route path="/admin-visualizar-usuarios" element={<AdminUsuariosVisualizar />} />
          
        <Route path="/visualizar-usuario/:usuarioId" element={<AdminVisualizarUsuario />} />
          
        <Route path='/admin-usuarios-menu-banimento' element={<AdminUsuariosMenuBanimento />} />

        <Route path="/admin-banir-usuarios" element={<AdminUsuariosBanir />} />

      </Routes>
    </Router>
  );
}

export default App;
