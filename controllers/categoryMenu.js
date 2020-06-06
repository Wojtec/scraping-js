const CategoryMenuModel = require('../model/categoryMenuModel');
const SubCategoryMenuModel = require('../model/subCategoryMenuModel');

module.exports = {

    storyCategoryMenu: async (categoryMenuName, id, cb) => {

        let categoryMenu = new CategoryMenuModel();
        categoryMenu.name = categoryMenuName.name;

        await CategoryMenuModel.create(categoryMenu)
        .then( async (categoryMenu) => {
            for(_id of id){
            await SubCategoryMenuModel.findByIdAndUpdate(
                {_id: _id},
                {$push: {categoryMenu: categoryMenu._id}},
                {new: true});

            await CategoryMenuModel.findByIdAndUpdate(
                {_id: categoryMenu._id},
                {$push: {subCategoryMenuId: _id}},
                {new: true});

            }
            
            console.log("Category menu stored in MongoDB");
            cb(categoryMenu);
        }).catch((err)=>{
            console.log(err);
        });
        
    }


}