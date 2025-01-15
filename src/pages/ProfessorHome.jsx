import './ProfessorHome.css';

function ProfessorHome() {
    return (
        <div className="professor-home">
            <h1>Bem-vindo, Professor!</h1>
            <p>Aqui você pode gerenciar suas turmas, postar materiais e acompanhar o desempenho dos alunos.</p>
            <button>Gerenciar Turmas</button>
            <button>Postar Material</button>
        </div>
    );
}

export default ProfessorHome;
