import { Button } from "primereact/button";
import "./AddButton.css";

function AddButton({ label, icon, onClick }) {
    return (
        <Button             
            className="add-button"
            label={label}
            icon={icon}
            onClick={onClick}
        ></Button>
    )
}

export default AddButton;