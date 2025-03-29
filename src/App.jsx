import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
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
import AdminUsuariosVisualizarBanidos from './pages/AdminUsuariosVisualizarBanidos';
import UserHome from './pages/UserHome';
import UserEditarReserva from './pages/UserEditarReserva';
import UserVisualizarReserva from './pages/UserVisualizarReserva';
import RecuperarSenha from './pages/RecuperarSenha';
import RedefinirSenha from './pages/RedefinirSenha';


function App() {
  return (
    <Router>
      <Routes>
        {/* Página inicial */}
        <Route path="/" element={<Home />} />

        {/* Rotas de Login */}
        <Route path="/login" element={<Login />} />

        <Route path="/cadastro" element={<Cadastro />} />

        <Route path="/recuperar-senha" element={<RecuperarSenha/>} />

        <Route path="/redefinir-senha" element={<RedefinirSenha/>} />

        {/* Páginas pós-login */}
        {/* Users */}
        <Route path="/user-home" element={<UserHome />} />

        <Route path="/user-editar-reserva/:id" element={<UserEditarReserva />} />
        
        <Route path="/user-visualizar-reserva/:id" element={<UserVisualizarReserva />} />

        {/* Admin */}
        <Route path="/admin-menu" element={<AdminMenu />} />

        <Route path="/usuarios-menu" element={<AdminUsuariosMenu />} />
        
        <Route path="/cadastrar-reserva" element={<CadastrarReserva />} />

        <Route path="/visualizar-reservas" element={<VisualizarReservas />} />

        <Route path="/editar-reserva" element={<EditarReserva />} />

        <Route path="/admin-detalhes-reserva" element={<ReservaDetalhes />} />
          
        <Route path="/cadastrar-usuario-ufcg" element={<AdminCadastroUsuarioUFCG />} />
        
        <Route path="/cadastrar-usuario-externo" element={<AdminCadastroUsuarioExterno />} />
          
        <Route path="/admin-detalhes-reserva" element={<ReservaDetalhes />} />

        <Route path="/admin-editar-usuarios" element={<AdminUsuariosEditar />} />
      
        <Route path='/admin-editar-usuario/:id' element={<AdminEditarUsuario />} />

        <Route path="/admin-excluir-usuarios" element={<AdminUsuariosExcluir />} />

        <Route path="/admin-visualizar-usuarios" element={<AdminUsuariosVisualizar />} />
          
        <Route path="/admin-visualizar-usuario/:id" element={<AdminVisualizarUsuario />} />
          
        <Route path='/admin-usuarios-menu-banimento' element={<AdminUsuariosMenuBanimento />} />

        <Route path="/admin-banir-usuarios" element={<AdminUsuariosBanir />} />

        <Route path="/admin-visualizar-usuarios-banidos" element={<AdminUsuariosVisualizarBanidos />} />

      </Routes>
    </Router>
  );
}

export default App;
