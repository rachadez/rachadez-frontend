import { Button } from "primereact/button";
import "./AddButton.css";

import { useNavigate } from "react-router-dom";

function AddButton({ label, icon, onClick, to }) {

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
            className="add-button"
            label={label}
            icon={icon}
            onClick={handleClick}
        ></Button>
    )
}

export default AddButton;