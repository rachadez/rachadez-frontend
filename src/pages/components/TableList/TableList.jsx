import React from 'react';
import './TableList.css';
import { Pencil, Trash, Eye } from 'lucide-react';

const TableList = ({ cabecalho, dados, dadosEdit = [], botao, hideAcoes = false, handleView, handleEdit, handleDelete}) => {
  const cabecalhoCompleto = !hideAcoes ? [...cabecalho, "Ação"] : cabecalho;
  
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

              {hideAcoes ? (
                <div className="acoes-container">
                {dadosEdit.includes(linhaIndex + 1) && (
                  <Pencil className="icon edit" color='#0B53B8' size={18} onClick={handleEdit} />
                )}
                <Trash className="icon delete" color= '#FF4646' size={18} onClick={handleDelete}/>
                <Eye className="icon view" color='#0B53B8' size={18} onClick={handleView}/>
              </div>
              ) : (
                <div className="botao-container">
                  {botao ? React.cloneElement(botao, { item: linha }) : null}
                </div>
              )}
            </div>
            {linhaIndex < dados.length - 1 && <div className="linha-divisoria" />}
          </React.Fragment>
        ))}
      </div>
    );
};

export default TableList;