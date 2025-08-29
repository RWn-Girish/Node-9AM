const express = require('express');

const port = 8005;
const app = express();
const dbConnect = require('./config/dbConnection');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const localStrategy = require("./middleware/localStrategy");
const flash = require('connect-flash');
const flashMessage = require("./middleware/flashMessage");

app.set('view engine', 'ejs');
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static("public"));
app.use("/uploads", express.static('uploads'));
app.use(flash());

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
app.use(passport.setAutheticatUser);
app.use(flashMessage.setFlashMessage);

app.use("/", require("./routes/index"));
app.use("/website", require("./routes/webPage.routes"));

app.listen(port, () => {
    console.log(`Server Start at http://localhost:${port}`)
})