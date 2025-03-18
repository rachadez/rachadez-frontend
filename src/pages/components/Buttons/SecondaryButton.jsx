import { Button } from "primereact/button";
import "./SecondaryButton.css";

function DefaultButton({ label, onClick, link }) {
    return (
        <Button             
            className="secondary-button"
            label={label}
            onClick={onClick}
            href={link}
        ></Button>
    )
}

export default DefaultButton;