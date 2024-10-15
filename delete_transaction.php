<?php
$dbname = __DIR__ . '/finance.db';

try {
    $pdo = new PDO("sqlite:$dbname");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $data = json_decode(file_get_contents("php://input"), true);

    if ($data === null) {
        echo "没有接收到任何数据";
    } else {
        print_r($data);
    }

    // 获取ID
    $transaction_id = $data['id'] ?? null;

    if ($transaction_id) {
        $stmt = $pdo->prepare("DELETE FROM Transactions WHERE transaction_id = :id");
        $stmt->execute(['id' => $transaction_id]);

        echo "记录已删除";
    } else {
        echo "未找到要删除的记录";
    }
} catch (PDOException $e) {
    echo '删除失败: ' . $e->getMessage();
}
?>
