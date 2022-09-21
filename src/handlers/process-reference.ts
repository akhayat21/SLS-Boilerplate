// import chromium from "chrome-aws-lambda";
import puppeteer from "puppeteer";
import { Browser, Page } from "puppeteer";
import { ResultData } from "../entities";
import ResultService from "../services/result";

let browser: Browser;
let page: Page;

module.exports.handler = async (event, context, callback) => {
  try {
    const { reference } = JSON.parse(event.Records[0].body);

    if (!reference?.id || !reference?.url) {
      // ideally log to a logging service such as datadog w/ messageId, awsRequestId
      throw new Error("Refence not provided");
    }

    // We're reusing the browser instance to speed up lambda cold start up
    if (!browser) {
      browser = await puppeteer.launch({
        headless: true
      })
    }

    if (!page) {
      page = await browser.newPage();
    }

    await page.goto(reference.url, { waitUntil: "networkidle0" });

    const title = await page.title();

    const metaTags = await page.$$eval("meta", (options) =>
      options.map((option) => {
        // Only adding keys that exist so we don't end up with null fields in the saved object
        const metaTag = {};

        option.getAttribute("name")
          ? (metaTag["name"] = option.getAttribute("name"))
          : null;
        option.getAttribute("content")
          ? (metaTag["content"] = option.getAttribute("content"))
          : null;
        option.getAttribute("charset")
          ? (metaTag["charset"] = option.getAttribute("charset"))
          : null;
        option.getAttribute("http-equiv")
          ? (metaTag["http-equiv"] = option.getAttribute("http-equiv"))
          : null;
        return { ...metaTag };
      })
    );

    const resultData: ResultData = {
      title,
      metaTags,
    };

    const result = await ResultService.insertResult(reference.id, resultData);

    return callback(null, result);
  } catch (error) {
    // also, ideally, add a log to logging service
    return callback(error, null);
  }
};
