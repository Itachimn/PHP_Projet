import { useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import Toast from "../components/Toast";
import "../styles/ajout.css";

function Ajout() {

    const [nCompte, setNCompte]   = useState("");
    const [nom, setNom]           = useState("");
    const [banque, setBanque]     = useState("");
    const [montant, setMontant]   = useState("");
    const [taux, setTaux]         = useState("");
    const [datePret, setDatePret] = useState("");
    const [toast, setToast]       = useState(null);

    const fermerToast = useCallback(() => setToast(null), []);

    async function enregistrer(e) {

        e.preventDefault();

        try {

            const response = await fetch("http://localhost:8000/api/prets.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    n_compte:     nCompte,
                    nom_client:   nom,
                    nom_banque:   banque,
                    montant:      parseFloat(montant),
                    date_pret:    datePret,
                    taux_de_pret: parseFloat(taux)
                })
            });

            const data = await response.json();

            if (data.success) {
                setToast({ texte: "Prêt enregistré avec succès !", type: "succes" });
                setNCompte("");
                setNom("");
                setBanque("");
                setMontant("");
                setTaux("");
                setDatePret("");
            } else {
                setToast({ texte: "Erreur lors de l'enregistrement.", type: "erreur" });
            }

        } catch {
            setToast({ texte: "Impossible de joindre le serveur.", type: "erreur" });
        }
    }

    return (

        <>
            <Navbar />

            <Toast message={toast} onClose={fermerToast} />

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
                                <span>#</span>
                                <input
                                    type="text"
                                    placeholder="N° de compte"
                                    value={nCompte}
                                    onChange={(e) => setNCompte(e.target.value)}
                                />
                            </div>

                            <div className="input-box">
                                <span>👤</span>
                                <input
                                    type="text"
                                    placeholder="Nom du client"
                                    value={nom}
                                    onChange={(e) => setNom(e.target.value)}
                                />
                            </div>

                            <div className="input-box">
                                <span>🏛️</span>
                                <input
                                    type="text"
                                    placeholder="Banque"
                                    value={banque}
                                    onChange={(e) => setBanque(e.target.value)}
                                />
                            </div>

                            <div className="input-box">
                                <span>💰</span>
                                <input
                                    type="number"
                                    placeholder="Montant"
                                    value={montant}
                                    onChange={(e) => setMontant(e.target.value)}
                                />
                            </div>

                            <div className="input-box">
                                <span>%</span>
                                <input
                                    type="number"
                                    step="0.01"
                                    placeholder="Taux (ex: 0.05 pour 5%)"
                                    value={taux}
                                    onChange={(e) => setTaux(e.target.value)}
                                />
                            </div>

                            <div className="input-box full">
                                <span>📅</span>
                                <input
                                    type="date"
                                    placeholder="Date du prêt"
                                    value={datePret}
                                    onChange={(e) => setDatePret(e.target.value)}
                                />
                            </div>

                        </div>

                        <button type="submit">
                            Enregistrer
                        </button>

                    </form>

                </div>

            </div>
        </>
    );
}

export default Ajout;