import React from 'react';
import './TableList.css';
import DefaultButton from '../Buttons/DefaultButton';

const TableList = ({ cabecalho, dados }) => {
    const cabecalhoCompleto = [...cabecalho, 'Ação'];
  
    return (
      <div className="tabela-container">
        <div className="tabela-header">
          {cabecalhoCompleto.map((item, index) => (
            <div key={index} className="header-item">
              {item}
            </div>
          ))}
        </div>
        <div className="linha-divisoria" />
        
        {dados.map((linha, linhaIndex) => (
          <React.Fragment key={linhaIndex}>
            <div className="linha-dados">
              {Object.values(linha).map((valor, colunaIndex) => (
                <div key={colunaIndex} className="dado-item">
                  {valor}
                </div>
              ))}
              <div className="botao-container">
                <DefaultButton label="Editar" />
              </div>
            </div>
            {linhaIndex < dados.length - 1 && <div className="linha-divisoria" />}
          </React.Fragment>
        ))}
      </div>
    );
};

export default TableList;