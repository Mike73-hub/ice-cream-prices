export default async function handler(req, res) {
  try {
    const response = await fetch("https://www.walmart.com/ip/154450819", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept": "text/html,application/xhtml+xml"
      }
    });

    const html = await response.text();

    // Extract Walmart JSON
    const regex = /window\.__WML_REDUX_INITIAL_STATE__\s*=\s*(\{.*?\});/s;
    const match = html.match(regex);

    if (!match) {
      return res.status(500).json({ success: false, error: "JSON not found" });
    }

    const jsonString = match[1];
    const data = JSON.parse(jsonString);

    // Extract fields
    const product = data.product.primaryProduct;

    const title = product.name;
    const price = product.price.currentPrice;
    const image = product.imageInfo?.thumbnailUrl;

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
