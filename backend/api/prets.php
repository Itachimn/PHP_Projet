<?php
require_once '../config/database.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    case 'GET':
        $stmt = $pdo->query("SELECT * FROM Pret_bancaire ORDER BY id DESC");
        $prets = $stmt->fetchAll(PDO::FETCH_ASSOC);
        // Calculer montant à payer pour chaque prêt
        foreach ($prets as &$p) {
            $p['montant_a_payer'] = $p['montant'] * (1 + $p['taux_de_pret']);
        }
        echo json_encode($prets);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        $stmt = $pdo->prepare("INSERT INTO Pret_bancaire 
            (n_compte, nom_client, nom_banque, montant, date_pret, taux_de_pret) 
            VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $data['n_compte'],
            $data['nom_client'],
            $data['nom_banque'],
            $data['montant'],
            $data['date_pret'],
            $data['taux_de_pret']
        ]);
        echo json_encode(["success" => true, "message" => "Insertion réussie"]);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        $stmt = $pdo->prepare("UPDATE Pret_bancaire SET 
            n_compte=?, nom_client=?, nom_banque=?, montant=?, date_pret=?, taux_de_pret=?
            WHERE id=?");
        $stmt->execute([
            $data['n_compte'],
            $data['nom_client'],
            $data['nom_banque'],
            $data['montant'],
            $data['date_pret'],
            $data['taux_de_pret'],
            $data['id']
        ]);
        echo json_encode(["success" => true, "message" => "Modification réussie"]);
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if ($id) {
            $stmt = $pdo->prepare("DELETE FROM Pret_bancaire WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(["success" => true, "message" => "Suppression réussie"]);
        } else {
            echo json_encode(["success" => false, "message" => "Suppression échouée"]);
        }
        break;
}

