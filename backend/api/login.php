<?php
require_once '../config/database.php';

$data = json_decode(file_get_contents("php://input"), true);
$username = $data['username'] ?? '';
$password = $data['password'] ?? '';

$stmt = $pdo->prepare("SELECT * FROM utilisateurs WHERE username = ?");
$stmt->execute([$username]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($password, $user['password'])) {
    echo json_encode([
        "success" => true,
        "message" => "Connexion réussie",
        "user" => ["id" => $user['id'], "username" => $user['username']]
    ]);
} else {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Identifiants incorrects"]);
}
