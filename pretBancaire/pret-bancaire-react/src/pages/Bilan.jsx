import Navbar from "../components/Navbar";
import "../styles/bilan.css";

function Bilan() {

    return (

        <>

            <Navbar />

            <div className="bilan-container">

                <h1>Tableau de bord</h1>

                <div className="cards">

                    <div className="card">
                        <h2>📄 Total des prêts</h2>
                        <span>15</span>
                    </div>

                    <div className="card">
                        <h2>💰 Montant total</h2>
                        <span>35 000 000 Ar</span>
                    </div>

                    <div className="card">
                        <h2>📈 Taux moyen</h2>
                        <span>6.2 %</span>
                    </div>

                    <div className="card">
                        <h2>📅 Durée moyenne</h2>
                        <span>36 mois</span>
                    </div>

                </div>

                <div className="graph">

                    <h2>Répartition des prêts</h2>

                    <div className="graph-placeholder">

                        Le graphique apparaîtra ici.

                    </div>

                </div>

            </div>

        </>

    );

}

export default Bilan;