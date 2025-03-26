import { Icon } from "@iconify/react";
import { CalendarCheck, CalendarClock, Trash, CalendarOff, CalendarX, XCircle } from "lucide-react"; 

const iconMapIconify = {
    "triangulo-amarelo": { icon: "basil:info-triangle-outline", color: "#FFA629" },
    "X": { icon: "ix:cancel", color: "red" },
    "sucesso-check": { icon: "material-symbols:check", color: "#0B53B8" }
};

const iconMapLucide = {
    "calendario-check": { icon: <CalendarCheck size={85} strokeWidth={1} />, color: "#0B53B8" },
    "calendario-relogio": { icon: <CalendarClock size={85} strokeWidth={1} />, color: "#0B53B8" },
    "lixo": { icon: <Trash size={85} strokeWidth={1} />, color: "#0B53B8" },
    "calendario-off": { icon: <CalendarOff size={85} strokeWidth={1} />, color: "#0B53B8" },
    "calendario-erro": { icon: <CalendarX size={85} strokeWidth={1} />, color: "#FF4646" },
    "circulo-erro": { icon: <XCircle size={85} strokeWidth={1} />, color: "#FF4646" }
};

const getIconifyIcon = (iconName) => {
    const { icon, color } = iconMapIconify[iconName] || { icon: "mdi:help-circle-outline", color: "#0B53B8" };

    return (props) => <Icon icon={icon} color={color} {...props} />;
};

const getLucideIcon = (iconName) => {
    const { icon, color } = iconMapLucide[iconName] || { icon: <CalendarCheck size={85} strokeWidth={1} />, color: "#0B53B8" };

    return (props) => <div style={{ color: color }}>{icon}</div>; 
};

const getCustomIcon = (iconName) => {
    // Verifica se o ícone é do Iconify ou Lucide
    if (iconName in iconMapIconify) {
        return getIconifyIcon(iconName);
    } else {
        return getLucideIcon(iconName);
    }
};

export default getCustomIcon;
