import DefaultButton from "../Buttons/DefaultButton";
import getIcon from "./getIcon/getIcon";
import './ModalTwoOptions.css';

const ModalTwoOptions = ({ 
    iconName, 
    modalText, 
    buttonTextOne, 
    buttonPathOne, 
    buttonColorOne, 
    buttonTextTwo, 
    buttonPathTwo, 
    onClickButtonOne,
    onClickButtonTwo,
}) => {
    const IconComponent = getIcon(iconName);

    const buttonOneClass = buttonColorOne === 'red' ? 'red-button' : 'blue-button';

    return (
        <>
        <div className="modal-backdrop"></div>

        <div className="modal-container">
            <IconComponent className="card-icon" width={85} height={85} />
            <p>{modalText}</p>
            <div className="button-container-modal">
                <DefaultButton 
                    label={buttonTextOne} 
                    onClick={onClickButtonOne} 
                    to={buttonPathOne} 
                    className={buttonOneClass} 
                />

                <DefaultButton 
                    label={buttonTextTwo} 
                    onClick={onClickButtonTwo} 
                    to={buttonPathTwo} 
                />
            </div>
        </div>
        </>
    );
}

export default ModalTwoOptions;
