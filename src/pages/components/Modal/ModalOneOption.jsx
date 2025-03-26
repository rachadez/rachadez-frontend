import DefaultButton from "../Buttons/DefaultButton";
import getIcon from "./getIcon/getIcon";
import './ModalOneOption.css';

const ModalOneOption = ({ iconName, modalText, buttonText, buttonPath, onClose }) => {
    const IconComponent = getIcon(iconName);

    return (
        <>
        <div className="ModalBackdrop"></div>

        <div className="ModalContainer">
            <IconComponent className="card-icon" width={85} height={85} />
            <p>{modalText}</p>
            <DefaultButton label={buttonText} onClick={onClose} to={buttonPath} />
            {/* onClose pode ser utilizado quando desejar apenas 
            fechar o modal, ao inves de redirecionar */}
       </div>
       </>
    );
}

export default ModalOneOption;