const mongoose = require('mongoose');

const dbConnect = () => {
    
// DB Connection
mongoose.connect("mongodb://127.0.0.1:27017/node9AM")
.then(() => console.log("DB Connection Success"))
.catch((err) => console.log(err));

}

module.exports = dbConnect;