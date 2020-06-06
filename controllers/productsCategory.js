const ProductsCategoryModel = require('../model/productCategoriesModel');
const ProductModel = require('../model/productModel');

module.exports = {

    storyProductsCategory: async (productCategoryName, id, cb) => {



        let productCategory = new ProductsCategoryModel();
        productCategory.categoryName = productCategoryName.categoryName;

        await ProductsCategoryModel.create(productCategory)
        .then( async (productCategory)=>{
            for(_id of id){
                await ProductModel.findByIdAndUpdate(
                    {_id: _id},
                    {$push: {productCategoriesId: productCategory._id}},
                    {new: true});

                    await ProductsCategoryModel.findByIdAndUpdate(
                        {_id: productCategory._id},
                        {$push: {productsId: _id}},
                        {new: true});
            }    
            console.log("Product Category stored in MongoDB");

            cb(productCategory);
        }).catch((err)=>{
            console.log(err);
        })
        
    }


}