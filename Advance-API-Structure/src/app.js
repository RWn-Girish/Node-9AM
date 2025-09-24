require("dotenv").config();
const express = require("express");
const port = process.env.PORT;
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const dbConnect = require('./config/dbConnect');

//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded());
app.use(express.json());

app.use("/api", require('./routes/index.route'))

app.listen(port, () => {
  console.log(`Server start at http://localhost:${port}`);
});
