import wappRestConfig from "./src/configs/wapp-rest.config.mjs";
import getDocumentFromURL from "./src/modules/scraper/scraper.mjs"
import wappRest from "./src/modules/wapp/app.mjs";

wappRest.listen(wappRestConfig.port, () => {
    console.log(
        "Server *** WAPP *** listening on port %d, in %s mode Version",
        wappRestConfig.port,
        wappRestConfig.env || "production",
        "23.03.16"
    );
}).on("error", err => {
    console.log(err);
});

// async function run() {
//     const doc = await getDocumentFromURL("https://www.amazon.com.br/Fralda-Pampers-Confort-Sec-Unidades/dp/B09FFRMKNQ/ref=sr_1_4?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=1MC6GQCGTZOWR&keywords=pampers+supersec+m&qid=1678976718&refinements=p_85%3A19171728011%2Cp_89%3APampers&rnid=18120432011&rps=1&s=baby-products&sprefix=pampers+supersec+m%2Caps%2C231&sr=1-4&ufe=app_do%3Aamzn1.fos.6a09f7ec-d911-4889-ad70-de8dd83c8a74")

//     const elements = doc.querySelector("h1#title")
//     const productTitle = elements?.textContent
//     if (!productTitle || !productTitle.includes("Fralda Pampers Confort Sec 4 Unidades")) {
//         console.log("No product found")
//         return
//     }

//     const priceElement = doc.querySelector("span.a-price-whole")
//     const price = priceElement?.textContent

//     console.log(price)



//     return doc

// }

// run().then()