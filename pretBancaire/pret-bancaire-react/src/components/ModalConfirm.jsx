import "../styles/modal.css";

function ModalConfirm({ visible, texte, onConfirmer, onAnnuler }) {

    if (!visible) return null;

    return (
        <div className="modal-overlay" onClick={onAnnuler}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                <div className="modal-icon">🗑️</div>
                <h3>Confirmer la suppression</h3>
                <p>{texte}</p>
                <div className="modal-actions">
                    <button className="btn-annuler" onClick={onAnnuler}>
                        Annuler
                    </button>
                    <button className="btn-confirmer" onClick={onConfirmer}>
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalConfirm;