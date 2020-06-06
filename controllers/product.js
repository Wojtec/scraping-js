const ProductModel = require('../model/productModel');

module.exports = {

    storyProduct: async (item, cb) => {


        let product = new ProductModel();
        product.productImage = item.image;
        product.productName = item.productName;
        product.quantityName = item.quantityName;
        product.quantityLot = item.quantityLot;
        product.productPrice = item.productPrice;
        product.productUnit = item.productUnit;

        await ProductModel.create(product)
        .then(async (product)=>{
            console.log("Product stored in MongoDB");

            cb(product);
        }).catch((err)=>{
            console.log(err);
        })
        
    }


}