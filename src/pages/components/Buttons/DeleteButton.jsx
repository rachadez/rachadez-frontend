import { Button } from "primereact/button";
import "./DeleteButton.css";

import { useNavigate } from "react-router-dom";

function DeleteButton({ label, onClick, to }) {

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
            className="delete-button"
            label={label}
            onClick={handleClick}
        ></Button>
    )
}

export default DeleteButton;