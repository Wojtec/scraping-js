const pup = require('puppeteer');

const $ = require( "jquery" );

(async () => {

let URL = "https://tienda.mercadona.es/categories/112";

let browser = await pup.launch({
    headless: false,
    args: [`--window-size=${1920},${1080}`,`--no-sandbox` ]
});
let page = await browser.newPage();
await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  });


await page.goto(URL, { waitUntil:"networkidle0"});
await page.waitFor('#root');
await page.click('input[name="postalCode"]');
await page.type('input[name="postalCode"]','08015', {delay: 50});
await page.click('button[class="button button-primary button-big"]');
await page.waitForNavigation()

// Store all products
let el = [];

// Get all sections 
const sections = await page.$$('div[class="category-detail__content"] > section');

for(let section of sections){
    let title = await section.$eval(('section[class="section"] > h3'), node => node.innerText);
    let products = await section.$$(('div[class="product-container"] > div '));
    let obj = {
        "title": title,
        "product": {
            "name": [],
            "quantity":{
                "name": [],
                "lot": []
            }
        },

    }
    for(let product of products){
        let name = await product.$eval(('div[class="product-cell__info"] > h4'), node => node.innerText);
        let quantityName = await product.$eval(('span[class="footnote1-r"].childNodes[1]'), node=> node.innerText);
        let lot = await product.$eval(('div[class="product-format product-format__size--cell"].childNodes')[1], node => node.innerText);

        obj.product.name.push(name);
        obj.product.quantity.name.push(quantityName);
        obj.product.quantity.lot.push(lot);

    }
    el.push(obj);
}

console.log(el);

   

debugger;

await browser.close();
})();