const puppe = require('puppeteer');
// import category menu controller
const categoryMenu = require('../controllers/categoryMenu');
// import subCateogry menu controller
const subCategoryMenu = require('../controllers/subCategoryMenu');
// import products categories
const productsCategory = require('../controllers/productsCategory');
// import products 
const item = require('../controllers/product');
// import cloud
const cloud = require('./cloud');

module.exports = {

    browser: null,
    page:  null,

    initialize: async (TARGET_URL) =>{
 
        browser = await puppe.launch({
            headless: true,
            args: [`--no-sandbox`,`--disable-background-networking` ]
        });
        page = await browser.newPage();
        await page.setViewport({width: 1920, height: 1080, deviceScaleFactor: 1});
        await page.goto(TARGET_URL, { waitUntil: ["networkidle0",'domcontentloaded']});
 

    },

    getResults: async () =>{
     // Store all products
    let data = [];
    let clickMenu = 0;


    // Records id
    let categoryMenuId = [];
    let subcategoryId = [];
    let productCategoryId = [];
    let productId = [];

    // Write post code 
    await page.waitFor('#root');
    await page.click('input[name="postalCode"]');
    await page.type('input[name="postalCode"]','08015', {delay: 50});
    await page.click('button[class="button button-primary button-big"]');
    await page.waitForNavigation({ waitUntil: ['domcontentloaded','networkidle0']});


    let categories = await page.$$('ul[class="category-menu"] > li');
    for(let category of categories){
    // Click category menu
     await category.click('li[class="category-menu__item"]', {delay: 100})

    // Get category name
     let categoryName = await category.$eval(('span[class="category-menu__header category-menu__header"] > label'), node => node.innerText);

     let categoryObj = {

        "name": categoryName,
    }

    // Click sub category menu
     let subCategories = await category.$$('div > ul > li');
     for( subCategory of subCategories){
    // SELECTORS
        let categoryNameSelector = 'section > h3';
        let sectionSelector = '.category-detail__content > section';
        let productsSelector = '.product-cell > button';
        let productNameSelector = ".product-cell__info > h4";
        let productQuantityNameSelector = 'div[class="product-format product-format__size--cell"] > span[class="footnote1-r"]:first-child';
        let productQuantityLotSelector ='div[class="product-format product-format__size--cell"] > span[class="footnote1-r"]:last-child';
        let productPriceSelector = 'div[class="product-price"] > p[class="product-price__unit-price subhead1-b"]';
        let poductPriceUnitSelector = 'div[class="product-price"] > p[class="product-price__extra-price subhead1-r"]';
        let imageSelector = 'button > div.product-cell__image-wrapper > img';
    // Check what menu item was clicked and change selector
        if(clickMenu == 122){
            categoryNameSelector = '.category-section__content > h3';
            sectionSelector = '.category-detail__content > div[class="category-section"]';
            productsSelector = ".category-section > section";
            productNameSelector = "button > div.product-cell__info > h4";
   
        }

        await subCategory.click('a[class="category-item__link"]', {delay:2000})
        clickMenu++;
        let subCategoryName =  await subCategory.$eval(('a[class="category-item__link"]'), node => node.innerText);
             let subCategoryObj = {

                 "subCategoryName" : subCategoryName,
             }

             // SECTION
             await page.waitFor(sectionSelector);
             let sections = await page.$$(sectionSelector);
             for await ( section of sections) {
                await page.waitFor(categoryNameSelector);
                let categoryName = await section.$eval((categoryNameSelector), node => node.innerText);
                let elements = {
                    "categoryName": categoryName,
                }
                // PRODUCTS
                await page.waitFor(productsSelector);
                let products = await section.$$(productsSelector);
                for(product of products){
                    await page.waitFor(imageSelector);
                    let productImage = await product.$eval(imageSelector, node => node.getAttribute('src'));
                    await page.waitFor(productNameSelector);
                    let productName = await product.$eval(productNameSelector, node => node.innerText);
                    await page.waitFor(productQuantityNameSelector);
                    let quantityName = await product.$eval(productQuantityNameSelector, node => node.innerText);
                    await page.waitFor(productQuantityLotSelector);
                    let quantityLot = await product.$eval(productQuantityLotSelector, node => node.innerText);
                    await page.waitFor(productPriceSelector);
                    let productPrice = await product.$eval(productPriceSelector, node => node.innerText);
                    await page.waitFor(poductPriceUnitSelector);
                    let productUnit = await product.$eval(poductPriceUnitSelector, node => node.innerText);

                    let items = {
                        "image": null,
                        "productName": productName,
                        "quantityName": quantityName,
                        "quantityLot": quantityLot,
                        "productPrice": productPrice,
                        "productUnit": productUnit,
                    }
                    await cloud.uploadImage(productImage,async (imgURL) =>{
                        items.image = imgURL;
                    });
                    console.log(items);

                    await item.storyProduct(items, (obj)=>{
                        productId.push(obj._id);
                    });
           

                }
                // subCategoryObj.categories.push(elements);
                await productsCategory.storyProductsCategory(elements, productId,(obj)=>{
                    productId = [];
                    productCategoryId.push(obj._id);

                });


          }
        // categoryObj.subCategory.push(subCategoryObj);
        await subCategoryMenu.storySubCategoryMenu(subCategoryObj, productCategoryId, (obj)=>{
            productCategoryId = [];
            subcategoryId.push(obj._id);
        });


        }
        // data.push(categoryObj);

        await categoryMenu.storyCategoryMenu(categoryObj, subcategoryId,(obj)=>{
            subcategoryId = [];
            categoryMenuId.push(obj._id);
        });


      }
      return data;
    }
}

