import { Icon } from "@iconify/react";

const getCustomIcon = (iconName) => {
    const iconMap = {
        "triangulo-amarelo": { icon: "basil:info-triangle-outline", color: "#FFA629" }, 
        "cancelar": { icon: "ix:cancel", color: "red" },
        "sucesso-check": { icon: "material-symbols:check", color: "#0B53B8"},
        "calendario-check": { icon: "lucide/calendar-check", color: "#0B53B8"},
        "calendario-relogio": { icon: "lucide/calendar-clock", color: "#0B53B8"},
        "lixo": { icon: "lucide/trash", color: "#0B53B8"},
        "calendario-off": { icon: "lucide/calendar-off", color: "#0B53B8"},
        "calendario-erro": { icon: "lucide/calendar-x", color: "#FF4646"},
        "circulo-erro": { icon: "lucide/circle-x", color: "#FF4646"}
    };

    const { icon, color } = iconMap[iconName] || { icon: "mdi:help-circle-outline", color: "gray" }; 

    return (props) => <Icon icon={icon} color={color} {...props} />;
};

export default getCustomIcon;