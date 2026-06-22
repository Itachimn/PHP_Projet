import { useState, useEffect } from "react";
import "../styles/modal.css";

function ModalModifier({ pret, onSauvegarder, onAnnuler }) {

    const [form, setForm] = useState(null);

    useEffect(() => {
        if (pret) setForm({ ...pret });
    }, [pret]);

    if (!pret || !form) return null;

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSauvegarder(form);
    }

    return (
        <div className="modal-overlay" onClick={onAnnuler}>
            <div className="modal-box modal-large" onClick={(e) => e.stopPropagation()}>

                <h3>✏️ Modifier le prêt</h3>
                <p className="modal-subtitle">
                    Client : <strong>{pret.nom_client}</strong>
                </p>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="modal-grid">

                        <div className="modal-field">
                            <label>N° de compte</label>
                            <input
                                name="n_compte"
                                value={form.n_compte}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="modal-field">
                            <label>Nom du client</label>
                            <input
                                name="nom_client"
                                value={form.nom_client}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="modal-field">
                            <label>Banque</label>
                            <input
                                name="nom_banque"
                                value={form.nom_banque}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="modal-field">
                            <label>Montant (Ar)</label>
                            <input
                                type="number"
                                name="montant"
                                value={form.montant}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="modal-field">
                            <label>Taux (ex: 0.05)</label>
                            <input
                                type="number"
                                step="0.01"
                                name="taux_de_pret"
                                value={form.taux_de_pret}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="modal-field">
                            <label>Date du prêt</label>
                            <input
                                type="date"
                                name="date_pret"
                                value={form.date_pret}
                                onChange={handleChange}
                            />
                        </div>

                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn-annuler" onClick={onAnnuler}>
                            Annuler
                        </button>
                        <button type="submit" className="btn-sauvegarder">
                            Sauvegarder
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
}

export default ModalModifier;