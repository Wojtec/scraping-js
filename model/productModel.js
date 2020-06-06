const mongoose = require('mongoose');


// Setup product schema 
let productSchema = mongoose.Schema({

    productCategoriesId:{
        type: [mongoose.Schema.ObjectId],
        ref: 'productCategories',
    },
    productImage: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    quantityName: {

        type: String,
        required: true,
    }, 
    quantityLot: {

        type: String,
        required: true,
    }, 
    productPrice: {

        type: String,
        required: true,
    }, 
    productUnit: {

        type: String,
        required: true,
    },
    date: {

        type: Date,
        default: Date.now
    }

})

// Export product model
let product = module.exports = mongoose.model('product', productSchema);

module.exports.get = (callback, limit) =>{
    product.find(callback).limit(limit);
}