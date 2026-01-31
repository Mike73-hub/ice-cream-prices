export default async function handler(req, res) {
  try {
    const response = await fetch("https://example.com", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept": "text/html,application/xhtml+xml"
      }
    });

    const html = await response.text();

    res.status(200).json({
      success: true,
      preview: html.slice(0, 200)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
