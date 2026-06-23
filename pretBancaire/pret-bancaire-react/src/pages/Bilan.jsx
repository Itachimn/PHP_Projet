import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Cell
} from "recharts";
import "../styles/bilan.css";

const API = "http://localhost:8000/api/bilan.php";

function Bilan() {

    const [bilan, setBilan]           = useState(null);
    const [chargement, setChargement] = useState(true);
    const [erreur, setErreur]         = useState(null);

    useEffect(() => {
        fetch(API)
            .then((res) => res.json())
            .then((data) => { setBilan(data); setChargement(false); })
            .catch(() => { setErreur("Impossible de charger les données."); setChargement(false); });
    }, []);

    function formaterAxe(val) {
        if (val >= 1_000_000) return (val / 1_000_000).toFixed(1) + "M";
        if (val >= 1_000)     return (val / 1_000).toFixed(0) + "k";
        return val;
    }

    if (chargement) return <><Navbar /><div className="bilan-container"><p className="bilan-info">Chargement...</p></div></>;
    if (erreur)     return <><Navbar /><div className="bilan-container"><p className="bilan-erreur">{erreur}</p></div></>;

    // Données histogramme résumé global
    const dataGlobal = [
        { label: "Total",   montant: parseFloat(bilan.total),   couleur: "#378ADD" },
        { label: "Maximal", montant: parseFloat(bilan.maximal), couleur: "#1D9E75" },
        { label: "Minimal", montant: parseFloat(bilan.minimal), couleur: "#EF9F27" }
    ];

    // Données histogramme par client — triés par montant décroissant
    const dataClients = [...bilan.details]
        .sort((a, b) => parseFloat(b.montant_a_payer) - parseFloat(a.montant_a_payer))
        .map((d) => ({
            label:   d.nom_client,
            montant: parseFloat(d.montant_a_payer)
        }));

    // Tooltip personnalisé
    function TooltipCustom({ active, payload, label }) {
        if (!active || !payload?.length) return null;
        return (
            <div className="bilan-tooltip">
                <p className="bilan-tooltip-label">{label}</p>
                <p className="bilan-tooltip-value">
                    {parseFloat(payload[0].value).toLocaleString()} Ar
                </p>
            </div>
        );
    }

    return (
        <>
            <Navbar />

            <div className="bilan-container">

                <div className="bilan-header">
                    <h1>Tableau de bord</h1>
                    <p>Vue d'ensemble de tous les prêts enregistrés</p>
                </div>

                {/* Cartes statistiques */}
                <div className="bilan-cards">

                    <div className="bilan-card">
                        <span className="bilan-card-label">Total des prêts</span>
                        <span className="bilan-card-value">{bilan.details.length}</span>
                    </div>

                    <div className="bilan-card">
                        <span className="bilan-card-label">Montant total à payer</span>
                        <span className="bilan-card-value">
                            {parseFloat(bilan.total).toLocaleString()}
                            <small> Ar</small>
                        </span>
                    </div>

                    <div className="bilan-card">
                        <span className="bilan-card-label">Montant minimal</span>
                        <span className="bilan-card-value bilan-card-min">
                            {parseFloat(bilan.minimal).toLocaleString()}
                            <small> Ar</small>
                        </span>
                    </div>

                    <div className="bilan-card">
                        <span className="bilan-card-label">Montant maximal</span>
                        <span className="bilan-card-value bilan-card-max">
                            {parseFloat(bilan.maximal).toLocaleString()}
                            <small> Ar</small>
                        </span>
                    </div>

                </div>

                {/* Graphiques */}
                <div className="bilan-graphiques">

                    {/* Histogramme résumé global */}
                    <div className="bilan-graph-card">
                        <h2>Résumé global (Ar)</h2>
                        <ResponsiveContainer width="100%" height={260}>
                            <BarChart
                                data={dataGlobal}
                                margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
                                barSize={54}
                            >
                                <CartesianGrid vertical={false} stroke="#f0f0f0" />
                                <XAxis
                                    dataKey="label"
                                    tick={{ fontSize: 13, fill: "#888" }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    tickFormatter={formaterAxe}
                                    tick={{ fontSize: 12, fill: "#aaa" }}
                                    axisLine={false}
                                    tickLine={false}
                                    width={50}
                                />
                                <Tooltip content={<TooltipCustom />} cursor={{ fill: "#f5f5f5" }} />
                                <Bar dataKey="montant" radius={[6, 6, 0, 0]}>
                                    {dataGlobal.map((entry, index) => (
                                        <Cell key={index} fill={entry.couleur} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Histogramme répartition par client */}
                    <div className="bilan-graph-card">
                        <h2>Répartition par client (Ar)</h2>
                        <ResponsiveContainer width="100%" height={260}>
                            <BarChart
                                data={dataClients}
                                margin={{ top: 10, right: 10, left: 0, bottom: 40 }}
                                barSize={28}
                            >
                                <CartesianGrid vertical={false} stroke="#f0f0f0" />
                                <XAxis
                                    dataKey="label"
                                    tick={{ fontSize: 11, fill: "#888" }}
                                    axisLine={false}
                                    tickLine={false}
                                    angle={-30}
                                    textAnchor="end"
                                    interval={0}
                                />
                                <YAxis
                                    tickFormatter={formaterAxe}
                                    tick={{ fontSize: 12, fill: "#aaa" }}
                                    axisLine={false}
                                    tickLine={false}
                                    width={50}
                                />
                                <Tooltip content={<TooltipCustom />} cursor={{ fill: "#f5f5f5" }} />
                                <Bar dataKey="montant" fill="#378ADD" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                </div>

            </div>
        </>
    );
}

export default Bilan;