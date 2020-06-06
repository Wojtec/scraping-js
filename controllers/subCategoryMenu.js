const SubCategoryMenuModel = require('../model/subCategoryMenuModel');
const ProductsCategoryModel = require('../model/productCategoriesModel');
module.exports = {

    storySubCategoryMenu: async (subCategoryName, id, cb) => {


        let subCategoryMenu = new SubCategoryMenuModel();
        subCategoryMenu.subCategoryName = subCategoryName.subCategoryName;

        await SubCategoryMenuModel.create(subCategoryMenu)
        .then(async (subCategoryMenu)=>{
            for(_id of id){
            await ProductsCategoryModel.findByIdAndUpdate(
                {_id: _id},
                {$push: {subCategoryMenuId: subCategoryMenu._id}},
                {new: true});
            }
            await SubCategoryMenuModel.findByIdAndUpdate(
                {_id: subCategoryMenu._id},
                {$push: {productCategoriesId: _id}},
                {new: true});
            console.log("Subcategory stored in MongoDB");

        cb(subCategoryMenu);
        }).catch((err)=>{
            console.log(err);
        })
        
    }


}