const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    firstname: String,
    lastname: {
        type: String,
    },
    email: {
        type: String
    },
    age: {
        type: Number
    },
    contactNo: {
        type: String
    },
    gender: {
        type: String,
        enum: ['Male', 'Female']
    },
    image:{
        type: String
    }
});

module.exports = mongoose.model("students", studentSchema);