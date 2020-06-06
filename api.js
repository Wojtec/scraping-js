const fs = require('fs').promises;
const merca = require('./service/mercadona');
require('dotenv').config();
//import mongoose
const mongoose = require('mongoose');
// import url db config
const dbUrl = require('./config/dbconfig');


let TARGET_URL = "https://tienda.mercadona.es/categories/112";

(async () =>{
      // CONNTECT TO MONGODB
await mongoose.connect(dbUrl.url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    family: 4,
});

let db =  mongoose.connection;
if(!db){
    console.log("Error connection to database");
}
else{
    console.log("Connected successfully to server MongoDB");
}
    



    await merca.initialize(TARGET_URL);
    let results = await merca.getResults();

    // let data = JSON.stringify(results, null, 2);

    // await fs.writeFile('mercadonaDB.json', data,(err)=>{

    //     if(err) throw err;
    //     console.log('Data written to file');

    // });


  


// let prod_id = [];
// let categ = [];
// let subcat = [];
// let secto = [];

//     // Mongodb tester
//     let category  = ['cat1','cat2','cat3'];
//     for await (cate of category){
//         //CATEGORY
//         let categoryObj = {
//             "name": cate
//         }
   
//         let subcate = ['subcat1', 'subcat2'];
//         for await ( sub of subcate){
//             // SUBCATEGORY
//             let subCategoryObj = {

//                 "subCategoryName" : sub
//             }
          
//             let sections = ['section1', 'section2', 'section3']
//             for await (sect of sections){
//                 // SECTION
//                 let elements = {

//                     "categoryName": sect
//                 }
              
//                 let produ = ['prod1', 'prod2', 'prod3'];
//                 for await (prod of produ){
//                     //PRODUCTS

//                    await products.storyProduct(prod, (obj)=>{
//                        prod_id.push(obj._id);
//                    });
          

//                 }
//                 await productsCategory.storyProductsCategory(elements, prod_id,(obj)=>{
//                     prod_id = [];
//                     secto.push(obj._id);

//                 });
               

//             }
//             await subCategoryMenu.storySubCategoryMenu(subCategoryObj, secto, (obj)=>{
//                 secto = [];
//                 subcat.push(obj._id);
//             });
       
       
       
//         }

//         await categoryMenu.storyCategoryMenu(categoryObj, subcat,(obj)=>{
//             subcat = [];
//             categ.push(obj._id);
//         });

//     }




debugger;
})();