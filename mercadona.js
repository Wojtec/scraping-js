const puppe = require('puppeteer');
const $ = require('jquery');


module.exports = {

    browser: null,
    page:  null,

    initialize: async (TARGET_URL) =>{
 
        browser = await puppe.launch({
            headless: false,
            args: [`--no-sandbox`,`--disable-background-networking` ]
        });

        page = await browser.newPage();
    
        await page.setViewport({width: 1920, height: 1080, deviceScaleFactor: 1});

        await page.goto(TARGET_URL, { waitUntil: ["networkidle0",'domcontentloaded']});
 

    },

    getResults: async (nr) =>{
        await page.waitFor('#root');
        await page.click('input[name="postalCode"]');
        await page.type('input[name="postalCode"]','08015', {delay: 50});
        await page.click('button[class="button button-primary button-big"]');
        await page.waitForNavigation({ waitUntil: ['domcontentloaded','networkidle0']});
        // Store all products
let el = [];
let test = [];
let prod = 0;
let click = 0;

// Click category menu
let categories = await page.$$('ul[class="category-menu"] > li');

for(let category of categories){

        await category.click('li[class="category-menu__item"]', {delay: 100})

            // Get category name
    let categoryName = await category.$eval(('span[class="category-menu__header category-menu__header"] > label'), node => node.innerText);

    let categoryObj = {
        "name": categoryName,
        "subCategory": [],
    }



    // Click sub category menu
    let subCategories = await category.$$('div > ul > li');
     for( subCategory of subCategories){
        await subCategory.click('a[class="category-item__link"]', {delay:2000})
        
            let selector = 'section > h3';
            let selectorCategoryName = '.section';
            let prodSelector = ".product-cell__info > h4";
            let produQuantity = "button > div.product-cell__info > div.product-format.product-format__size--cell > span:nth-child(1)";
            let seleSection = '.category-detail__content > section';
            let seleProducts = '.product-cell > button';

            if(click == 122){
                selectorCategoryName = '.category-detail';
                seleSection = '.category-detail__content > div[class="category-section"]';
                selector = '.category-section__content > h3';
                seleProducts = ".category-section > section";
                prodSelector = "button > div.product-cell__info > h4";
                produQuantity = "button > div.product-cell__info > div.product-format.product-format__size--cell > span:nth-child(1)";
            }

            let subCategoryName =  await subCategory.$eval(('a[class="category-item__link"]'), node => node.innerText);
     
         
            click++;
            subCategoryObj = {
                "subCategoryName" : subCategoryName,
                "products": [],
            }


            await page.waitFor(seleSection);
             let sections = await page.$$(seleSection);

            for await ( section of sections) {
                await page.waitFor(selector);
                let categoryName = await section.$eval((selector), node => node.innerText);

                let prod = {
                    "name": null,
                    "item": [],
                }
            // SECTION



                    // PRODUCTS
                    await page.waitFor(seleProducts);
                    let products = await section.$$(seleProducts);

                    for(product of products){

                        await page.waitFor(prodSelector);

                        let produ = await product.$eval(prodSelector, node => node.innerText);
                        let quantity = await product.$eval(produQuantity, node => node.innerText);
                        test.push({produ, quantity});
                        prod.item.push({produ, quantity});

                    }
    
                    prod.name = categoryName;

                    subCategoryObj.products.push(prod);
           
               
            
            }


            categoryObj.subCategory.push(subCategoryObj);

            let items = {
                "nameSubCategory" :  subCategoryName,
                "title":  null,
                "pro":[],
            }

    }
          

  el.push(categoryObj);
    
  console.log(categoryObj);


}


return {el, test, prod};

}




// test: async () =>{
//     let test = [];
//      // Get all sections of products
//   let items = {
//       "title": null,
//       "pro": []
//   }
//      let sections =  await page.$$('div > div > section');
//      if (typeof sections == 'undefined') {

//         sections = await page.$$('div[class="category-detail__content"] > div');
//     }
//         for await ( section of sections) {
//             let title = await section.$eval(('h3'), node => node.innerText);
          

//                 items.title = title;

            
    
    
//          let products =  await section.$$(('div[class="product-container"]'));
//         for await ( product of products){
//                  let name = await product.$eval(('h4'),  node =>  node.innerText);
//                  let quantity = await product.$eval(('div[class="product-format product-format__size--cell"] > span[class="footnote1-r"]:first-child'), node =>  node.innerText);
//                  let lot = await product.$eval(('div[class="product-format product-format__size--cell"] > span[class="footnote1-r"]:last-child'), node =>  node.innerText);
//                  let price = await product.$eval(('div[class="product-price"] > p[class="product-price__unit-price subhead1-b"]'), node =>  node.innerText);
//                  let ud = await product.$eval(('div[class="product-price"] > p[class="product-price__extra-price subhead1-r"]'), node =>  node.innerText);
               
    
//              if ( name !== null && quantity !== null && lot !== null && price  !== null && ud !== null){
//                     test.push({
//                         name,
//                         quantity,
//                         lot,
//                         price,
//                         ud
//                     });
//                  items.pro.push({
//                     name,
//                     quantity,
//                     lot,
//                     price,
//                     ud
        
//                 });
    
//                 }
    
//               }           
    
    
//             }

//             console.log(items);
//             console.log(test);


// }
}

