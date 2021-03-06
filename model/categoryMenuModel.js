const mongoose = require('mongoose');



// Setup category schema
let categoryMenuSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    subCategoryMenuId: {
        type: [mongoose.Schema.ObjectId],
        ref: 'subCategoryMenu',
    },
    date: {
        type: Date,
        default: Date.now,
    }


})

// Export category model 
let CatergoryMenu = module.exports = mongoose.model('categoryMenu', categoryMenuSchema);

module.exports.get = (callback, limit) =>{
    CatergoryMenu.find(callback).limit(limit);
}