import { Dialog } from 'primereact/dialog';
import './RegrasDialog.css';

export default function RegrasDialog({ visible, onHide }) {
    return (
        <Dialog
            header="Horários de Agendamento permitidos"
            visible={visible}
            style={{ width: '50vw' }}
            onHide={onHide}
            className="regras-dialog"
            modal
        >
            <div className="regras-conteudo">
                <h4>Tênis e Beach Tennis</h4>
                <p><b>1.</b> Usuários da comunidade interna podem agendar horários para qualquer dia da semana;</p>
                <p><b>2.</b> A partir de toda quinta-feira às 15h, usuários da comunidade interna podem reservar horários para a semana subsequente;</p>
                <p><b>3.</b> Usuários externos só podem marcar horários na semana a partir das segundas-feiras, sem possibilidade de reservar para a semana subsequente.</p>
                
                <h4>Vôlei e Society</h4>
                <p><b>1.</b> Usuários da comunidade interna podem agendar qualquer dia e horário disponível no mês;</p>
                <p><b>2.</b> Society só ocorre nas quartas e sextas-feiras, no turno da noite (18h - 19h30 e 19h30 - 21h)</p>
                <p><b>3.</b> A partir do dia 15 do mês, usuários da comunidade interna podem agendar um horário para o mês seguinte;</p>
                <p><b>4.</b> Usuários externos não podem agendar partidas de Vôlei ou Society.</p>
            </div>
        </Dialog>
    );
}
