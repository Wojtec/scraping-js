const mongoose = require('mongoose');

// Setup categories schema
let productCategoriesSchema = mongoose.Schema({

    categoryName: {
        type: String,
        required: true,
    },
    productsId:{
        type: [mongoose.Schema.ObjectId],
        ref: 'Product',
    },
    subCategoryMenuId: {
        type: [mongoose.Schema.ObjectId],
        ref: 'subCategoryMenu',
    },
    date:{
        type: Date,
        default: Date.now,
    }


})

//Export categories model
let productCategories = module.exports = mongoose.model('productCategories', productCategoriesSchema);

module.exports.get = (callback, limit) => {
    productCategories.find(callback).limit(limit);
}