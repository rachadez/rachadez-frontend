import { Button } from "primereact/button";
import "./DefaultButton.css";

import { useNavigate } from "react-router-dom";

function DefaultButton({ label, onClick, to, className }) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (to) {
            navigate(to); // Se tiver um link, navega
        } else if (onClick) {
            onClick(); // Se quiser chamar uma função, chama
        }
    }

    return (
        <Button             
            className={`default-button ${className}`}
            label={label}
            onClick={handleClick}
        ></Button>
    );
}

export default DefaultButton;