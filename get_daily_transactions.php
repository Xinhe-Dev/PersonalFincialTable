<?php
$dbname = __DIR__ . '/finance.db';
$date = $_GET['date'];

try {

    $pdo = new PDO("sqlite:$dbname");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("SELECT transaction_id, type, category, amount, description, date FROM Transactions WHERE date = :date");
    $stmt->execute(['date' => $date]);

    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($results);
} catch (PDOException $e) {
    echo json_encode(['error' => '数据库查询失败: ' . $e->getMessage()]);
}
?>
