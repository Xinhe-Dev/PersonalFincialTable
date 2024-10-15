<?php
$dbname = __DIR__ . '/finance.db'; // SQLite 数据库文件路径

try {
    // 使用PDO连接SQLite数据库
    $pdo = new PDO("sqlite:$dbname");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // 创建表
    $pdo->exec("CREATE TABLE IF NOT EXISTS Transactions (
        transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        type TEXT,
        amount DECIMAL(10, 2),
        category TEXT,
        description TEXT,
        date TEXT
    )");

    echo "数据库和表已创建！";
} catch (PDOException $e) {
    echo '数据库初始化失败: ' . $e->getMessage();
}
?>