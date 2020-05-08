const chromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");
exports.handler = async (event, context) => {
  const body = event.body
    ? JSON.parse(event.body)
    : { url: "https://github.com/joshatoutthink/" };

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
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    statusCode: 200,
    body: JSON.stringify({ screenshot }),
  };
};
