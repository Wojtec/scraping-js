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


await page.goto(URL, { waitUntil: ["domcontentloaded", "networkidle0"]});
await page.waitFor('#root');
await page.click('input[name="postalCode"]');
await page.type('input[name="postalCode"]','08015', {delay: 50});
await page.click('button[class="button button-primary button-big"]');
await page.waitForNavigation({
    waitUntil: ['load','networkidle0'],
  });



// Store all products
let el = [];

// Click category menu
const categories = await page.$$('ul[class="category-menu"] > li');

for  await (let category of categories){

        await category.click('li[class="category-menu__item"]', {delay: 100});
    
    


    
    // Get category name
    let categoryName = await category.$eval(('span[class="category-menu__header category-menu__header"] > label'), node => node.innerText);

    let categoryObj = {
        "name": categoryName,
        "subcategory": {
                "products":[],

            

        },
    }



    // Click sub category menu
    let subCategories = await category.$$(' ul > li');
      for await (let subCategory of subCategories){

        await subCategory.click('li[class="category-item"]');

        let subCategoryName =  await subCategory.$eval(('li[class="category-item category-item--selected subhead1-r"] > a'), node => node.innerText);
        

 // Get all sections of products
 const sections =  await page.$$('div[class="category-detail__content"] > section');
        
    sections.forEach(async (section)=>{
        let title = await section.$eval(('section[class="section"] > h3'), node => node.innerText);

        
   
     

  
     let products =  await section.$$(('div[class="product-container"] > div '));
        products.forEach(async (product) => {
             let name = await product.$eval(('div[class="product-cell__info"] > h4'),  node =>  node.innerText);
             let quantity = await product.$eval(('div[class="product-format product-format__size--cell"] > span[class="footnote1-r"]:first-child'), node=>  node.innerText);
             let lot = await product.$eval(('div[class="product-format product-format__size--cell"] > span[class="footnote1-r"]:last-child'), node =>  node.innerText);
             let price = await product.$eval(('div[class="product-price"] > p[class="product-price__unit-price subhead1-b"]'), node =>  node.innerText);
             let ud = await product.$eval(('div[class="product-price"] > p[class="product-price__extra-price subhead1-r"]'), node =>  node.innerText);
           

             let produ = {
                "nameSubCategory" :  subCategoryName,
                "title":  title,
                "subCategoryproduct": {
                    "name": name,
                    "quantity": quantity,
                    "lot": lot,
                    "price": price,
                    "ud": ud
                },
                
             };

             categoryObj.subcategory.products.push(produ);
        

          });


           

     
        })



    
    }
          

  el.push(categoryObj);

}





console.log(el);
   

debugger;

await browser.close();
})();