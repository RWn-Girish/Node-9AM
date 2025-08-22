const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: {
        type: String,
        unique: true
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number
    },
    image: {
        type: String
    },
    category: {
        type: String
    }
});


module.exports = mongoose.model('products', productSchema);
