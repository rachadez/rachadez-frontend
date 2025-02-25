import './LoginProfessor.css';
import { useNavigate } from 'react-router-dom';

function LoginProfessor() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui pode ir a lógica para autenticação.
        navigate('/professor-home');
    };

    return (
        <div className="login-professor">
            <h1>Login do Professor</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Email" />
                <input type="password" placeholder="Senha" />
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}

export default LoginProfessor;
