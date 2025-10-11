export const handler = async () => {
  try {
    const token = process.env.FACEBOOK_TOKEN;
    const pageId = process.env.FACEBOOK_PAGE_ID;
    if (!token || !pageId) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Missing FACEBOOK_TOKEN or FACEBOOK_PAGE_ID' }) };
    }
    if (!token) {
      return { statusCode: 500, body: JSON.stringify({ error: 'FACEBOOK_TOKEN not configured' }) };
    }

    const fields = 'posts.limit(20){message,created_time,full_picture,permalink_url}';
    const url = `https://graph.facebook.com/v17.0/${encodeURIComponent(pageId)}?fields=${encodeURIComponent(fields)}&access_token=${encodeURIComponent(token)}`;

    const r = await fetch(url, { headers: { 'User-Agent': 'TabukoSite/1.0' } });
    if (!r.ok) {
      return { statusCode: r.status, body: JSON.stringify({ error: 'Facebook API error' }) };
    }
    const data = await r.json();

    const items = (data.posts?.data || []).map(p => {
      const message = p.message || '';
      const excerpt = message.length > 180 ? message.slice(0, 180) + '…' : message;
      return {
        title: excerpt || 'Facebook Update',
        date: p.created_time,
        excerpt,
        image: p.full_picture || null,
        sourceUrl: p.permalink_url || null
      };
    });

    return {
      statusCode: 200,
      headers: { 'Cache-Control': 's-maxage=300, stale-while-revalidate=600' },
      body: JSON.stringify({ items })
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Serverless error' }) };
  }
};


