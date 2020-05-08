const puppeteer = require("puppeteer");

exports.handler = async (event, context) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://google.com", { waitUntil: "networkidle2" });
  const screenshot = await page.screenshot({ encoding: "binary" });

  return {
    statusCode: 200,
    body: JSON.stringify({ screenshot }),
  };
};
