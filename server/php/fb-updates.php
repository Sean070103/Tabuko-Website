<?php
header('Content-Type: application/json');
header('Cache-Control: s-maxage=300, max-age=60, stale-while-revalidate=600');

// Read secrets from environment (recommended)
$token = getenv('FACEBOOK_TOKEN');
$pageId = getenv('FACEBOOK_PAGE_ID');

if (!$token || !$pageId) {
    http_response_code(500);
    echo json_encode(['error' => 'Missing FACEBOOK_TOKEN or FACEBOOK_PAGE_ID']);
    exit;
}

$fields = 'posts.limit(20){message,created_time,full_picture,permalink_url}';
$url = 'https://graph.facebook.com/v17.0/' . rawurlencode($pageId) . '?fields=' . urlencode($fields) . '&access_token=' . urlencode($token);

$context = stream_context_create([
    'http' => [
        'method' => 'GET',
        'timeout' => 8,
        'ignore_errors' => true,
        'header' => [
            'User-Agent: TabukoSite/1.0'
        ]
    ]
]);

$resp = @file_get_contents($url, false, $context);
if ($resp === false) {
    http_response_code(502);
    echo json_encode(['error' => 'Facebook API unreachable']);
    exit;
}

$data = json_decode($resp, true);
if (!$data) {
    http_response_code(502);
    echo json_encode(['error' => 'Invalid response from Facebook']);
    exit;
}

$items = [];
if (isset($data['posts']['data']) && is_array($data['posts']['data'])) {
    foreach ($data['posts']['data'] as $post) {
        $message = isset($post['message']) ? $post['message'] : '';
        $excerpt = mb_substr($message, 0, 180) . (mb_strlen($message) > 180 ? '…' : '');
        $items[] = [
            'title' => $excerpt ?: 'Facebook Update',
            'date' => $post['created_time'] ?? null,
            'excerpt' => $excerpt,
            'image' => $post['full_picture'] ?? null,
            'sourceUrl' => $post['permalink_url'] ?? null
        ];
    }
}

echo json_encode(['items' => $items]);
?>


