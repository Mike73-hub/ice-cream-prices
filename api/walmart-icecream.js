export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();

    res.status(200).json({
      quote: data.content,
      author: data.author
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quote" });
  }
}
