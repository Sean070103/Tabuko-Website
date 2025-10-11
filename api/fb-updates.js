export default async function handler(req, res) {
  const pageId = process.env.FB_PAGE_ID;
  const accessToken = process.env.FB_ACCESS_TOKEN;

  try {
    const response = await fetch(
      `https://graph.facebook.com/v20.0/${pageId}/feed?fields=message,created_time,full_picture,permalink_url&access_token=${accessToken}&limit=6`
    );
    const data = await response.json();

    // Respond to frontend
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching Facebook data:", error);
    res.status(500).json({ error: "Failed to fetch updates" });
  }
}