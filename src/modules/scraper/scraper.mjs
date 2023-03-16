import { JSDOM } from "jsdom";

async function getDocumentFromURL(url) {
    const htmlText = await getWebsiteTextContent(url);
    const htmlDoc = parseTextContent(htmlText);

    return htmlDoc;
}

async function getWebsiteTextContent(url) {

    const response = await fetch(url);
    const html = await response.text();

    return html;
}

function parseTextContent(html) {
    const DomParser = new JSDOM().window.DOMParser
    const parser = new DomParser();
    return parser.parseFromString(html, "text/html");
}

export default getDocumentFromURL