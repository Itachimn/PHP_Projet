import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null); // { texte, type }

    async function connexion(e) {

        e.preventDefault();
        setMessage(null);

        try {

            const response = await fetch("http://localhost:8000/api/login.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (data.success) {
                setMessage({ texte: "Connexion réussie ! Redirection...", type: "succes" });
                setTimeout(() => navigate("/ajout"), 1200);
            } else {
                setMessage({ texte: data.message, type: "erreur" });
            }

        } catch (error) {
            setMessage({ texte: "Impossible de joindre le serveur.", type: "erreur" });
        }
    }

    return (

        <div className="login-container">

            <div className="login-card">

                <div className="left">
                    <div className="logo">PB</div>
                    <h1>Prêt Bancaire</h1>
                    <p>Gestion des dossiers de prêt bancaire</p>
                </div>

                <div className="right">

                    <h2>Connexion</h2>

                    <form onSubmit={connexion}>

                        <label>Nom d'utilisateur</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <label>Mot de passe</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button type="submit">Connexion</button>

                    </form>

                    {/* Message affiché sous le bouton */}
                    {message && (
                        <p className={`message-login ${message.type}`}>
                            {message.texte}
                        </p>
                    )}

                </div>

            </div>

        </div>
    );
}

export default Login;