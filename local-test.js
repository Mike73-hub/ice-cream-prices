import fetch from "node-fetch";

async function test() {
  const response = await fetch("https://www.walmart.com/ip/193361645", {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
      "Referer": "https://www.walmart.com/"
    }
  });

  const html = await response.text();

  const regex = /window\.__WML_[A-Z0-9_]+\s*=\s*(\{.*?\});/s;
  const match = html.match(regex);

  if (!match) {
    console.log("JSON not found");
    return;
  }

  const data = JSON.parse(match[1]);
  console.log("SUCCESS — JSON FOUND!");
  console.log(Object.keys(data));
}

test();
