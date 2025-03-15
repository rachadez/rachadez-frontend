import React from 'react';
import './CadastrarReserva.css';

const CadastrarReserva = () => {
  return (
    <div className="container">
      
      <header className="header">          
        <h2 className="logo">Racha10 UFCG</h2>
        <i className="fas fa-cog config-icon"></i>
      </header>

      <main className="main-content">
        <div className="title-container">
          <i className="fas fa-arrow-left back-icon"></i>
          <h2 className="title">Cadastrar Reserva</h2>
        </div>
      </main>

      <section className="form-section">
        <div className="form-grid">
          <div className="input-group">
            <label htmlFor="esporte">Esporte</label>
            <select id="esporte" className="select-input">
              <option>Esporte</option>
            </select>
          </div>
          
          <div className="input-group">
            <label htmlFor="data-hora">DATA E HORA</label>
            <div className="date-input-container">
              <span className="calendar-icon">
                <i className="far fa-calendar-alt"></i>
              </span>
              <input
                type="text"
                id="data-hora"
                className="date-input"
                placeholder="10/01/2024 00:00"
              />
            </div>
          </div>
        </div>

        <div className="participants-section">
          <h3 className="section-title">PARTICIPANTES</h3>
          
          <div className="participant-group">
            <h4 className="sub-title">UFCG</h4>
            <div className="participant-list">
              <div className="participant-item">
                <span>Fulano de Tal</span>
                <span className="participant-email">fulano.tal@curso.ufcg.edu.br</span>
                <i className="fas fa-trash-alt delete-icon"></i>
              </div>
              <div className="participant-item">
                <span>Ciclano Bla Bla Bla da Silva</span>
                <span className="participant-email">ciclano.silva@curso.ufcg.edu.br</span>
                <i className="fas fa-trash-alt delete-icon"></i>
              </div>
            </div>
            <div className="add-button">
              <i className="fas fa-plus-circle"></i>
            </div>
          </div>

          <div className="participant-group">
            <h4 className="sub-title">USUÁRIOS EXTERNOS</h4>
            <div className="participant-list">
              <div className="participant-item">
                <span>Fulano de Tal</span>
                <span className="participant-cpf">111.111.111-11</span>
                <i className="fas fa-trash-alt delete-icon"></i>
              </div>
              <div className="participant-item">
                <span>Ciclano Bla Bla Bla da Silva</span>
                <span className="participant-cpf">222.222.222-22</span>
                <i className="fas fa-trash-alt delete-icon"></i>
              </div>
              <div className="input-row">
                <input
                  type="text"
                  placeholder="Nome"
                  className="name-input"
                />
                <input
                  type="text"
                  placeholder="CPF"
                  className="cpf-input"
                />
                <i className="fas fa-trash-alt delete-icon"></i>
              </div>
            </div>
            <div className="add-button">
              <i className="fas fa-plus-circle"></i>
            </div>
          </div>
        </div>

        <div className="submit-button-container">
          <button className="submit-button">
            Cadastrar Reserva
          </button>
        </div>
      </section>
    </div>
  );
};

export default CadastrarReserva;