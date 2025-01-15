import './LoginAluno.css';
import { useNavigate } from 'react-router-dom';

function LoginAluno() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui pode ir a lógica para autenticação.
        navigate('/aluno-home');
    };

    return (
        <div className="login-aluno">
            <h1>Login do Aluno</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Email" />
                <input type="password" placeholder="Senha" />
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}

export default LoginAluno;
