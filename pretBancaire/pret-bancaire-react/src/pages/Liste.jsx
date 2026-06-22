import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import Toast from "../components/Toast";
import ModalConfirm from "../components/ModalConfirm";
import ModalModifier from "../components/ModalModifier";
import "../styles/liste.css";

const API = "http://localhost:8000/api/prets.php";

function Liste() {

    const [prets, setPrets]                   = useState([]);
    const [recherche, setRecherche]           = useState("");
    const [toast, setToast]                   = useState(null);
    const [pretASupprimer, setPretASupprimer] = useState(null);
    const [pretAModifier, setPretAModifier]   = useState(null);

    const fermerToast = useCallback(() => setToast(null), []);

    useEffect(() => {
        chargerPrets();
    }, []);

    async function chargerPrets() {
        try {
            const res  = await fetch(API);
            const data = await res.json();
            setPrets(data);
        } catch {
            setToast({ texte: "Impossible de charger les prêts.", type: "erreur" });
        }
    }

    async function confirmerSuppression() {
        try {
            const res  = await fetch(`${API}?id=${pretASupprimer.id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) {
                setToast({ texte: `Prêt de ${pretASupprimer.nom_client} supprimé.`, type: "succes" });
                chargerPrets();
            }
        } catch {
            setToast({ texte: "Erreur lors de la suppression.", type: "erreur" });
        } finally {
            setPretASupprimer(null);
        }
    }

    async function sauvegarderModification(form) {
        try {
            const res  = await fetch(API, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (data.success) {
                setToast({ texte: "Prêt modifié avec succès.", type: "succes" });
                chargerPrets();
            }
        } catch {
            setToast({ texte: "Erreur lors de la modification.", type: "erreur" });
        } finally {
            setPretAModifier(null);
        }
    }

    const pretsFiltres = prets.filter((p) =>
        p.nom_client.toLowerCase().includes(recherche.toLowerCase())
    );

    return (
        <>
            <Navbar />

            <Toast message={toast} onClose={fermerToast} />

            <ModalConfirm
                visible={!!pretASupprimer}
                texte={`Voulez-vous vraiment supprimer le prêt de ${pretASupprimer?.nom_client} ?`}
                onConfirmer={confirmerSuppression}
                onAnnuler={() => setPretASupprimer(null)}
            />

            <ModalModifier
                pret={pretAModifier}
                onSauvegarder={sauvegarderModification}
                onAnnuler={() => setPretAModifier(null)}
            />

            <div className="liste-container">
                <div className="liste-card">

                    <h1>Liste des prêts</h1>
                    <p>Consultez tous les prêts enregistrés.</p>

                    <input
                        className="recherche"
                        type="text"
                        placeholder="Rechercher un client..."
                        value={recherche}
                        onChange={(e) => setRecherche(e.target.value)}
                    />

                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>N° compte</th>
                                    <th>Client</th>
                                    <th>Banque</th>
                                    <th>Montant</th>
                                    <th>Taux</th>
                                    <th>À payer</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pretsFiltres.map((pret) => (
                                    <tr key={pret.id}>
                                        <td className="td-compte">{pret.n_compte}</td>
                                        <td>{pret.nom_client}</td>
                                        <td>{pret.nom_banque}</td>
                                        <td className="td-montant">
                                            {parseFloat(pret.montant).toLocaleString()} Ar
                                        </td>
                                        <td className="td-taux">
                                            {(pret.taux_de_pret * 100).toFixed(1)}%
                                        </td>
                                        <td className="td-montant">
                                            {parseFloat(pret.montant_a_payer).toLocaleString()} Ar
                                        </td>
                                        <td className="td-date">{pret.date_pret}</td>
                                        <td className="td-actions">
                                            <button
                                                className="btn-edit"
                                                onClick={() => setPretAModifier(pret)}
                                            >
                                                Modifier
                                            </button>
                                            <button
                                                className="btn-delete"
                                                onClick={() => setPretASupprimer(pret)}
                                            >
                                                Supprimer
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Liste;