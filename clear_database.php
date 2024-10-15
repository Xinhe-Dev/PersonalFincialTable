<?php
$dbname = __DIR__ . '/finance.db'; // SQLite 数据库文件路径

try {
    // 使用PDO连接SQLite数据库
    $pdo = new PDO("sqlite:$dbname");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // 清空 Transactions 表中的所有记录
    $sql = "DELETE FROM Transactions";
    $pdo->exec($sql);

    echo "所有记录已清空！";
} catch (PDOException $e) {
    echo '数据库操作失败: ' . $e->getMessage();
}
?>
