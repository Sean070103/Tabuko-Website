export default async function handler(req, res) {
  try {
    const token = process.env.FACEBOOK_TOKEN; // no fallback in code
    const pageId = process.env.FACEBOOK_PAGE_ID; // no fallback in code
    if (!token || !pageId) {
      return res.status(500).json({ error: 'Missing FACEBOOK_TOKEN or FACEBOOK_PAGE_ID' });
    }
    if (!token) {
      return res.status(500).json({ error: 'FACEBOOK_TOKEN not configured' });
    }

    const fields = 'posts.limit(20){message,created_time,full_picture,permalink_url}';
    const url = `https://graph.facebook.com/v17.0/${encodeURIComponent(pageId)}?fields=${encodeURIComponent(fields)}&access_token=${encodeURIComponent(token)}`;

    const r = await fetch(url, { headers: { 'User-Agent': 'TabukoSite/1.0' } });
    if (!r.ok) return res.status(r.status).json({ error: 'Facebook API error' });
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

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    return res.status(200).json({ items });
  } catch (e) {
    return res.status(500).json({ error: 'Serverless error' });
  }
}


