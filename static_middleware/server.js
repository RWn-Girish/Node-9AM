const express = require("express");

const server = express();

server.set("view engine", "ejs");
server.use(express.urlencoded());
server.use(express.static("public"));


// middleware
// const middleware = (req, res, next) => {
//   if(req.query.age >=18){
//     next();
//   }else{
//     res.end("Your Age is not found or below 18")
//   }
// }

// server.use(middleware); // application


server.get("/", (req, res) => {
  res.render("index");
});
server.get("/form-basic", (req, res) => {
  res.render("form-basic");
});



server.listen(8080, () => {
  console.log(`server Start at http://localhost:8080`);
});
