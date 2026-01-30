export default async function handler(req, res) {
  try {
    const productId = "154450819"; // Ben & Jerry’s Peanut Butter Half Baked Pint
    const storeId = "2892"; // Walmart Gurnee, IL

    const url = `https://www.walmart.com/product-page/v3/price-offer?productId=${productId}&storeId=${storeId}`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

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
    res.status(500).json({ error: "Failed to fetch Walmart price" });
  }
}
