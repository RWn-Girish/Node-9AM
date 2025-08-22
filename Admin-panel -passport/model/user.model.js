const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    gender: {
        type: String,
        enum: ['Male', 'Female']
    },
    contactNo: {
        type: String
    },
    hobbies: {
        type: Array
    },
    image: {
        type:String
    }
});


module.exports = mongoose.model('users', userSchema)