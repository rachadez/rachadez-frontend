import "./ReservaDetalhes.css";
import Header from "./components/Header/Header";
import ArrowIcon from "./components/ArrowIcon/ArrowIcon";
import SecondaryButton from "./components/Buttons/SecondaryButton";

const ReservaDetalhes = () => {
  const handleEditClick = () => {
    console.log("Edit button clicked");
  };

  const handleDownloadPDFClick = () => {
    console.log("Download PDF button clicked");
  };

  const handleDeleteClick = () => {
    console.log("Delete button clicked");
  };

  return (
    <div className="container-vizualizar-reservaDetalhes">
      <Header />
      <div className="main-content-reservaDetalhes">
        <div className="title-container-reservaDetalhes">
          <div className="title-left-reservaDetalhes">
            <ArrowIcon direction="back" className="back-icon-reservaDetalhes" />
            <h1 className="title-reservaDetalhes">Reserva Quadra 1 - Vôlei</h1>
          </div>
          <h2 className="subtitle-reservaDetalhes">01/01/2025 - 18:00h</h2>
        </div>

        <div className="button-container-reservaDetalhes">
          <SecondaryButton
            label="Editar"
            onClick={handleEditClick}
            className="secondary-button-reservaDetalhes"
          />
          <SecondaryButton
            label="Baixar PDF"
            onClick={handleDownloadPDFClick}
            className="secondary-button-reservaDetalhes"
          />
          <button
            className="delete-button-reservaDetalhes"
            onClick={handleDeleteClick}
          >
            Deletar
          </button>
        </div>
      </div>

      <section className="section-reservas-reservaDetalhes">
        <div className="responsavel-reservaDetalhes">
          <span className="responsavel-flag-reservaDetalhes">
            (Responsável)
          </span>
          <span className="responsavel-nome-reservaDetalhes">
            Alexandre Costa
          </span>
        </div>

        <div className="titulos-reservas-reservaDetalhes">
          <span>Nome</span>
          <span>Curso/tipo</span>
          <span>Matrícula/CPF</span>
        </div>

        <div className="lista-reservas-reservaDetalhes">
          {Array(10)
            .fill()
            .map((_, index) => (
              <div key={index} className="item-reserva-reservaDetalhes">
                <span
                  className={index === 0 ? "bold-text-reservaDetalhes" : ""}
                >
                  {index % 2 === 0
                    ? "Alexandre Costa"
                    : "José Canhoto da Silva Nunes Pereira"}
                </span>
                <span
                  className={index === 0 ? "bold-text-reservaDetalhes" : ""}
                >
                  {index % 2 === 0 ? "Ciência da computação" : "COMUNIDADE"}
                </span>
                <span
                  className={index === 0 ? "bold-text-reservaDetalhes" : ""}
                >
                  {index % 2 === 0 ? "123456789" : "111.111.111-11"}
                </span>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default ReservaDetalhes;
