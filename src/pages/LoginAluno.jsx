import './LoginAluno.css';
import InputEmail from './components/InputEmail';
import { useNavigate } from 'react-router-dom';
import DefaultButton from './components/Buttons/DefaultButton';

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
                <InputEmail />
                <input type="password" placeholder="Senha" />
                <DefaultButton label={"Entrar"}></DefaultButton>
            </form>
        </div>
    );
}

export default LoginAluno;
