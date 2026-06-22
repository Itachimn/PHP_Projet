import { useState } from "react";
import "../styles/ajout.css";
import Navbar from "../components/Navbar";

function Ajout() {

    const [nom,setNom]=useState("");
    const [banque,setBanque]=useState("");
    const [montant,setMontant]=useState("");
    const [taux,setTaux]=useState("");
    const [duree,setDuree]=useState("");

    function enregistrer(e){

        e.preventDefault();

        alert("Prêt enregistré !");
    }

    return(
        
         <>

        <Navbar />

        <div className="ajout-container">

            <div className="circle circle1"></div>
            <div className="circle circle2"></div>
            <div className="circle circle3"></div>

            <div className="ajout-box">

                <h1>🏦 Nouveau prêt bancaire</h1>

                <p className="subtitle">
                    Remplissez les informations du prêt
                </p>

                <form onSubmit={enregistrer}>

                    <div className="grid">

                        <div className="input-box">

                            <span>👤</span>

                            <input
                                type="text"
                                placeholder="Nom du client"
                                value={nom}
                                onChange={(e)=>setNom(e.target.value)}
                            />

                        </div>

                        <div className="input-box">

                            <span>🏛️</span>

                            <input
                                type="text"
                                placeholder="Banque"
                                value={banque}
                                onChange={(e)=>setBanque(e.target.value)}
                            />

                        </div>

                        <div className="input-box">

                            <span>💰</span>

                            <input
                                type="number"
                                placeholder="Montant"
                                value={montant}
                                onChange={(e)=>setMontant(e.target.value)}
                            />

                        </div>

                        <div className="input-box">

                            <span>%</span>

                            <input
                                type="number"
                                placeholder="Taux"
                                value={taux}
                                onChange={(e)=>setTaux(e.target.value)}
                            />

                        </div>

                        <div className="input-box full">

                            <span>📅</span>

                            <input
                                type="number"
                                placeholder="Durée (mois)"
                                value={duree}
                                onChange={(e)=>setDuree(e.target.value)}
                            />

                        </div>

                    </div>

                    <button>
                        Enregistrer
                    </button>

                </form>

            </div>

        </div>

         </>

    );

}

export default Ajout;