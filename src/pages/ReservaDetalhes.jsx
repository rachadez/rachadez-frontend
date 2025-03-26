import React from "react";
import "./ReservaDetalhes.css";
import Header from "./components/Header/Header";
import { ArrowLeft } from "lucide-react";
import SecondaryButton from "./components/Buttons/SecondaryButton";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable"; 
import Logo from "../assets/Logo_3_vazada.png"; 
import { useState } from "react";
import ModalTwoOptions from "./components/Modal/ModalTwoOptions";
import ModalOneOption from "./components/Modal/ModalOneOption";

const ReservaDetalhes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const handleDeleteClick = () => {
    setIsModalOpen(true);
    setModalType("deletar-reserva");
  };

  const handleDeletaReserva = () => {
    //add logica de deletar reserva
    setModalType("reserva-deletada");
};

  const navigate = useNavigate();

  const handleDownloadPDFClick = () => {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const imgWidth = 90;
    const imgHeight = 50;
    const imgX = (pageWidth - imgWidth) / 2; 

    doc.addImage(Logo, "PNG", imgX, 10, imgWidth, imgHeight);


    doc.setTextColor(11, 83, 184);
    doc.setFontSize(18);
    doc.text("Reserva Quadra 1 - Vôlei", 20, 63); 
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text("01/01/2025 - 18:00h", 20, 72); 

    const headers = [["Nome", "Curso/tipo", "CPF"]];
    const data = Array(10)
      .fill()
      .map((_, index) => [
        index % 2 === 0 ? "Alexandre Costa" : "José Canhoto da Silva Nunes Pereira",
        index % 2 === 0 ? "Ciência da computação" : "COMUNIDADE",
        index % 2 === 0 ? "123456789" : "111.111.111-11",
      ]);

    autoTable(doc, {
      startY: 80, 
      head: headers,
      body: data,
      headStyles: {
        fillColor: [0, 102, 204],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      styles: {
        fillColor: [230, 240, 255],
        textColor: [0, 0, 0],
      },
      didParseCell: function (data) {
        if (data.row.index === 0) {
          data.cell.styles.fontStyle = "bold";
        }
      },
    });

    doc.save("reserva_detalhes.pdf");
  };

  return (
    <div className="container-vizualizar-reservaDetalhes">
      <Header />
      <div className="main-content-reservaDetalhes">
        <div className="title-container-reservaDetalhes">
          <div className="title-left-reservaDetalhes">
            <ArrowLeft className="arrow-left-reservaDetalhes" color="#ffffff" size={40} onClick={() => navigate("/visualizar-reservas")} />
            <h1 className="title-reservaDetalhes">Reserva Quadra 1 - Vôlei</h1>
          </div>
          <h2 className="subtitle-reservaDetalhes">01/01/2025 - 18:00h</h2>
        </div>

        <div className="button-container-reservaDetalhes">
          <SecondaryButton
            label="Editar"
            onClick={() => navigate("/editar-reserva")}
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
          <span>CPF</span>
        </div>

        <div className="lista-reservas-reservaDetalhes">
          {Array(10)
            .fill()
            .map((_, index) => (
              <div key={index} className="item-reserva-reservaDetalhes">
                <span className={index === 0 ? "bold-text-reservaDetalhes" : ""}>
                  {index % 2 === 0 ? "Alexandre Costa" : "José Canhoto da Silva Nunes Pereira"}
                </span>
                <span className={index === 0 ? "bold-text-reservaDetalhes" : ""}>
                  {index % 2 === 0 ? "Ciência da computação" : "COMUNIDADE"}
                </span>
                <span className={index === 0 ? "bold-text-reservaDetalhes" : ""}>
                  {index % 2 === 0 ? "123456789" : "111.111.111-11"}
                </span>
              </div>
            ))}
        </div>
      </section>
          {/* Modal exibido ao clicar para deletar reserva */}
            {isModalOpen && modalType === "deletar-reserva" && (
              <ModalTwoOptions
                  iconName="triangulo-amarelo" 
                  modalText="Tem certeza que deseja remover esta reserva?"
                  buttonTextOne="Remover"
                  buttonColorOne="red"
                  onClickButtonOne={handleDeletaReserva}
                  buttonTextTwo="Cancelar"
                  onClickButtonTwo={() => setIsModalOpen(false)}
              />
            )}

          {/* Modal exibido após deletar a reserva com sucesso */}
            {isModalOpen && modalType === "reserva-deletada" && (
              <ModalOneOption
                  iconName="sucesso-check" 
                  modalText="Reserva deletada com sucesso!"
                  buttonText="Voltar"
                  buttonPath="/visualizar-reservas"
              />
            )}
    </div>
  );
};

export default ReservaDetalhes;
