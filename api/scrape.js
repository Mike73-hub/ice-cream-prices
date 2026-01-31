import * as cheerio from "cheerio";

export default async function handler(req, res) {
  try {
    const response = await fetch("https://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept": "text/html,application/xhtml+xml"
      }
    });

    const html = await response.text();

    const $ = cheerio.load(html);

    const title = $("h1").text().trim();

    res.status(200).json({
      success: true,
      title: title
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
