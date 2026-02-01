export default async function handler(req, res) {
  try {
    const response = await fetch("https://www.walmart.com/ip/154450819", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Referer": "https://www.walmart.com/"
      }
    });

    const html = await response.text();

    // Flexible Walmart JSON regex
    const regex = /window\.__WML_[A-Z0-9_]+\s*=\s*(\{.*?\});/s;
    const match = html.match(regex);

    if (!match) {
      return res.status(500).json({
        success: false,
        error: "JSON not found",
        walmartStatus: response.status
      });
    }

    const jsonString = match[1];
    const data = JSON.parse(jsonString);

    // Walmart product data lives here
    const product = data.product?.primaryProduct;

    const title = product?.name;
    const price = product?.price?.currentPrice;
    const image = product?.imageInfo?.thumbnailUrl;

    res.status(200).json({
      success: true,
      title,
      price,
      image
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
