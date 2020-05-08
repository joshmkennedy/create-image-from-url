const chromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");
exports.handler = async (event, context) => {
  const body = JSON.parse(event.body) || {
    body: { url: "https://github.com/joshatoutthink/" },
  };
  const { url } = body;

  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });
  const screenshot = await page.screenshot({ encoding: "binary" });

  return {
    statusCode: 200,
    body: JSON.stringify({ screenshot }),
  };
};
