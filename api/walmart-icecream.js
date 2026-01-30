export default async function handler(req, res) {
  try {
    const productId = "154450819"; 
    const storeId = "2892"; 

    const url = `https://www.walmart.com/product-page/v3/price-offer?productId=${productId}&storeId=${storeId}`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.9",
        "Origin": "https://www.walmart.com",
        "Referer": "https://www.walmart.com/"
      }
    });

    if (!response.ok) {
      throw new Error("Walmart blocked the request");
    }

    const data = await response.json();

    const offer = data?.offers?.[0];
    const price = offer?.price?.priceDisplay || "Unavailable";
    const availability = offer?.availabilityStatus || "Unknown";

    res.status(200).json({
      store: "Walmart",
      product: "Ben & Jerry’s Peanut Butter Half Baked Pint",
      price,
      availability
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
