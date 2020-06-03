const CategoryMenuModel = require('../model/categoryMenuModel');

module.exports = {

    storyCategoryMenu: async (name) => {

        let categoryMenu = new CategoryMenuModel();
        categoryMenu.name = name;

        CategoryMenuModel.create(categoryMenu)
        .then((categoryMenu)=>{
            
        })
        
    }


}