"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import chromium from "chrome-aws-lambda";
const puppeteer_1 = __importDefault(require("puppeteer"));
const result_1 = __importDefault(require("../services/result"));
let browser;
let page;
module.exports.handler = (event, context, callback) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { reference } = JSON.parse(event.Records[0].body);
        if (!(reference === null || reference === void 0 ? void 0 : reference.id) || !(reference === null || reference === void 0 ? void 0 : reference.url)) {
            // ideally log to a logging service such as datadog w/ messageId, awsRequestId
            throw new Error("Refence not provided");
        }
        // We're reusing the browser instance to speed up lambda cold start up
        if (!browser) {
            browser = yield puppeteer_1.default.launch({
                headless: true
            });
        }
        if (!page) {
            page = yield browser.newPage();
        }
        yield page.goto(reference.url, { waitUntil: "networkidle0" });
        const title = yield page.title();
        const metaTags = yield page.$$eval("meta", (options) => options.map((option) => {
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
            return Object.assign({}, metaTag);
        }));
        const resultData = {
            title,
            metaTags,
        };
        const result = yield result_1.default.insertResult(reference.id, resultData);
        return callback(null, result);
    }
    catch (error) {
        // also, ideally, add a log to logging service
        return callback(error, null);
    }
});
//# sourceMappingURL=process-reference.js.map