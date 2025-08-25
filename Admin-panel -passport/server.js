const express = require('express');

const port = 8005;
const app = express();
const dbConnect = require('./config/dbConnection');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const localStrategy = require("./middleware/localStrategy");

app.set('view engine', 'ejs');
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static("public"));
app.use("/uploads", express.static('uploads'));

app.use(session({
    name : "testing",
    secret: "hello",
    saveUninitialized: false,
    resave: true,
    cookie: {
        maxAge: 1000*60*60
    }
}))

app.use(passport.session());
app.use(passport.initialize());

app.use("/", require("./routes/index"));

app.listen(port, () => {
    console.log(`Server Start at http://localhost:${port}`)
})