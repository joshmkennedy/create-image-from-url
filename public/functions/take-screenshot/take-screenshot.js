const chromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");
exports.handler = async (event, context) => {
  console.log(process.env);
  const pageToScreenshot = JSON.parse(event.body).pageToScreenshot;

  if (!pageToScreenshot)
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Page URL not defined" }),
    };
  const path = await chromium.executablePath;
  console.log(path);
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
  });

  const page = await browser.newPage();

  await page.goto(pageToScreenshot, { waitUntil: "networkidle2" });

  //const screenshot = await page.screenshot({ encoding: "binary" });

  await browser.close();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Complete screenshot of ${pageToScreenshot}`,
      /* buffer: screenshot, */
    }),
  };
};
