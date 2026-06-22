import Navbar from "../components/Navbar";
import "../styles/liste.css";

function Liste() {

    const prets = [
        {
            id:1,
            nom:"Jean Dupont",
            banque:"BOA",
            montant:5000000,
            taux:5,
            duree:24
        },
        {
            id:2,
            nom:"Marie Claire",
            banque:"BNI",
            montant:12000000,
            taux:6,
            duree:60
        },
        {
            id:3,
            nom:"Rakoto",
            banque:"BFV",
            montant:3500000,
            taux:4,
            duree:12
        }
    ];

    return(

        <>

            <Navbar/>

            <div className="liste-container">

                <div className="liste-card">

                    <h1>Liste des prêts</h1>

                    <p>
                        Consultez tous les prêts enregistrés.
                    </p>

                    <input
                        className="recherche"
                        type="text"
                        placeholder="Rechercher un client..."
                    />

                    <table>

                        <thead>

                            <tr>

                                <th>Client</th>
                                <th>Banque</th>
                                <th>Montant</th>
                                <th>Taux</th>
                                <th>Durée</th>
                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                prets.map((pret)=>(

                                    <tr key={pret.id}>

                                        <td>{pret.nom}</td>

                                        <td>{pret.banque}</td>

                                        <td>{pret.montant.toLocaleString()} Ar</td>

                                        <td>{pret.taux}%</td>

                                        <td>{pret.duree} mois</td>

                                        <td>

                                            <button className="edit">
                                                Modifier
                                            </button>

                                            <button className="delete">
                                                Supprimer
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </>

    );

}

export default Liste;