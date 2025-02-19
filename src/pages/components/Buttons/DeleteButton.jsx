import { Button } from "primereact/button";
import "./DeleteButton.css";

function DeleteButton({ label, onClick }) {
    return (
        <Button             
            className="delete-button"
            label={label}
        ></Button>
    )
}

export default DeleteButton;