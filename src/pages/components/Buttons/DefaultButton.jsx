import { Button } from "primereact/button";
import "./DefaultButton.css";

function DefaultButton({ label, onClick }) {
    return (
        <Button             
            className="default-button"
            label={label}
            onClick={onClick}
        ></Button>
    )
}

export default DefaultButton;