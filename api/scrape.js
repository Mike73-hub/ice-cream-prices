export default async function handler(req, res) {
  try {
    const response = await fetch("https://httpbin.org/headers", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept": "text/html,application/xhtml+xml"
      }
    });

    const data = await response.json();

    res.status(200).json({
      success: true,
      sentHeaders: data.headers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
