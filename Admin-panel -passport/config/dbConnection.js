const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect("mongodb+srv://rw3girishgk:Decode%40123@cluster0.c1whb.mongodb.net/admin-panel-9am")
    .then(()=> console.log('DB is Connected'))
    .catch((err)=> console.log(err));
};

module.exports = dbConnect();