<?php
require_once '../config/database.php';

$stmt = $pdo->query("
    SELECT 
        SUM(montant * (1 + taux_de_pret)) AS total,
        MIN(montant * (1 + taux_de_pret)) AS minimal,
        MAX(montant * (1 + taux_de_pret)) AS maximal,
        nom_client,
        montant * (1 + taux_de_pret) AS montant_a_payer
    FROM Pret_bancaire
    GROUP BY id, nom_client, montant, taux_de_pret
");
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

$totaux = $pdo->query("
    SELECT 
        SUM(montant * (1 + taux_de_pret)) AS total,
        MIN(montant * (1 + taux_de_pret)) AS minimal,
        MAX(montant * (1 + taux_de_pret)) AS maximal
    FROM Pret_bancaire
")->fetch(PDO::FETCH_ASSOC);

echo json_encode([
    "total"   => round($totaux['total'], 2),
    "minimal" => round($totaux['minimal'], 2),
    "maximal" => round($totaux['maximal'], 2),
    "details" => $rows
]);
