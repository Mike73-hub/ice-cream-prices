export default async function handler(req, res) {
  try {
    const response = await fetch("https://example.com");
    const html = await response.text();

    res.status(200).json({
      success: true,
      length: html.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
