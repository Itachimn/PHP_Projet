import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {

    const navigate = useNavigate();

    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");

    function connexion(e){

        e.preventDefault();

        if(username==="admin" && password==="1234"){

            navigate("/ajout");

        }else{

            alert("Nom d'utilisateur ou mot de passe incorrect");

        }

    }

    return(

        <div className="login-container">

            <div className="login-card">

                <div className="left">

                    <div className="logo">
                        PB
                    </div>

                    <h1>Prêt Bancaire</h1>

                    <p>
                        Gestion des dossiers de prêt bancaire
                    </p>

                </div>

                <div className="right">

                    <h2>Connexion</h2>

                    <form onSubmit={connexion}>

                        <label>Nom d'utilisateur</label>

                        <input
                            type="text"
                            value={username}
                            onChange={(e)=>setUsername(e.target.value)}
                        />

                        <label>Mot de passe</label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />

                        <button type="submit">
                            Connexion
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default Login;