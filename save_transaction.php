<?php
$dbname = __DIR__ . '/finance.db'; 

try {
    $pdo = new PDO("sqlite:$dbname");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $type = $_POST['type'];
    $category = $_POST['category'];
    $amount = $_POST['amount'];
    $description = $_POST['description'];
    $date = $_POST['date'];

    // 插入数据
    $stmt = $pdo->prepare("INSERT INTO Transactions (user_id, type, amount, category, description, date) 
                        VALUES (1, :type, :amount, :category, :description, :date)");

    $stmt->execute([
        'type' => $type,
        'amount' => $amount, 
        'category' => $category, 
        'description' => $description, 
        'date' => $date 
    ]);

    echo "记录已成功保存";
} catch (PDOException $e) {
    echo '数据库连接失败: ' . $e->getMessage();
}
?>