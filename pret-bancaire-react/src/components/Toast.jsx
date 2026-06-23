import { useEffect } from "react";
import "../styles/toast.css";

function Toast({ message, onClose }) {

    useEffect(() => {
        if (!message) return;
        const timer = setTimeout(onClose, 3500);
        return () => clearTimeout(timer);
    }, [message, onClose]);

    if (!message) return null;

    const icone = message.type === "succes" ? "✓"
                : message.type === "erreur" ? "✕"
                : "⚠";

    return (
        <div className={`toast toast-${message.type}`}>
            <span className="toast-icon">{icone}</span>
            <span className="toast-texte">{message.texte}</span>
            <button className="toast-close" onClick={onClose}>×</button>
        </div>
    );
}

export default Toast;