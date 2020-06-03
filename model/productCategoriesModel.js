const mongoose = require('mongoose');

// Setup categories schema
let productCategoriesSchema = mongoose.Schema({

    categoryName: {
        type: String,
        required: true,
    },

    subCategoryMenuId: {
        type: [mongoose.Schema.ObjectId],
        ref: 'subCategoryMenu',
    },

    products:{
        type: [mongoose.Schema.ObjectId],
        ref: 'Product',
    },

    date:{
        type: Date,
        default: Date.now,
    }


})

//Export categories model
let productCategories = module.exports.model('productCategories', productCategoriesSchema);

module.exports.get = (callback, limit) => {
    productCategories.find(callback).limit(limit);
}