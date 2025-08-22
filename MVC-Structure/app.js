const express = require('express');
const app = express();
const port = 8000;
const dbConnect = require('./config/dbConnection');

app.set('view engine', 'ejs');
app.use(express.urlencoded());
app.use("/uploads", express.static("uploads"));


app.use("/product", require('./routes/product.routes'));

app.listen(port, ()=> {
    console.log(`Server Start at http://localhost:${port}`);
});