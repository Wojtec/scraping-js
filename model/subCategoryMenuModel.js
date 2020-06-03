const mongoose = require('mongoose');

// Setup subCategory schema
let subCategoryMenu = mongoose.Schema({

    subCategoryName: {
        type: String,
        required: true,
    },

    categories: {
        type: [mongoose.Schema.ObjectId],
        ref: 'categoryMenu'
    },

    date: {
        type: Date,
        default: Date.now,
    }


})

// Export subCategories model
let SubCategoriesMenu = module.exports = mongoose.model('subCategoryMenu', subCategoryMenu);

module.exports.get = (callback, limit) =>{
    SubCategoriesMenu.find(callback).limit(limit);
}