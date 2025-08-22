const express = require('express');

const port = 8005;
const app = express();
const dbConnect = require('./config/dbConnection');
const cookieParser = require('cookie-parser');

app.set('view engine', 'ejs');
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static("public"));
app.use("/uploads", express.static('uploads'));


app.use("/", require("./routes/index"));

app.listen(port, () => {
    console.log(`Server Start at http://localhost:${port}`)
})