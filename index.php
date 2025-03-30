<?php include 'config.php'; ?>
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
    <meta charset="UTF-8">
    <title>玄淵閣</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="static/css/style.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@500&display=swap" rel="stylesheet">
</head>
<body class="dark-bg">
    <div class="container py-5">
        <h1 class="text-center calligraphy-title mb-5">玄淵閣</h1>
        
        <?php
        // 获取所有文章
        $stmt = $db->query("SELECT * FROM articles ORDER BY created_at DESC");
        while ($article = $stmt->fetch(PDO::FETCH_ASSOC)):
        ?>
        <div class="article-card shadow-lg mb-4">
            <div class="card-body">
                <h2 class="card-title"><?= htmlspecialchars($article['title']) ?></h2>
                <small class="text-muted"><?= format_date($article['created_at']) ?></small>
                <p class="card-content mt-3"><?= nl2br(htmlspecialchars($article['content'])) ?></p>
                <a href="article.php?id=<?= $article['id'] ?>" class="btn btn-dark">閱評</a>
            </div>
        </div>
        <?php endwhile; ?>
        
        <!-- 管理员入口 -->
        <div class="text-center mt-4">
            <a href="admin/login.php" class="text-muted small">閣主通道</a>
        </div>
    </div>
</body>
</html>