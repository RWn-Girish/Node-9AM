const express = require("express");

const server = express();

server.set("view engine", "ejs");
server.use(express.urlencoded());


// middleware

const middleware = (req, res, next) => {
  if(req.query.age >=18){
    next();
  }else{
    res.end("Your Age is not found or below 18")
  }
}

// server.use(middleware); // application
let students = [
  {
    id: "101",
    name: "John Peter",
    email: "john@test.in",
    mobileNo: "9879879898",
  },
  {
    id: "102",
    name: "Virat Kohli",
    email: "virat@test.in",
    mobileNo: "9879879797",
  },
  {
    id: "103",
    name: "Rohit Sharma",
    email: "rohit@test.in",
    mobileNo: "7777888999",
  },
];

server.get("/", middleware, (req, res) => {
  res.render("index", { students });
});

server.get("/add-student", (req, res) => {
  res.render("addStudent");
});

server.post("/new-student", (req, res) => {
  // console.log("Body Data : ",req.body)
  let newStudent = req.body;
  students.push(newStudent);
  res.redirect("/");
});

server.get("/delete-student/:id", (req, res) => {
  let id = req.params.id;
  students = students.filter(stu => stu.id != id)
  console.log("Student Delete Success");
  res.redirect("/")
})

server.get("/edit-student/:id", (req, res) => {
  let id = req.params.id;
  let singleRec = students.find(stu => stu.id == id);
  // console.log(singleRec);
  res.render("editStudent", {student: singleRec})
})

server.post("/update-student/:id", (req, res) => {
  let id = req.params.id;
  let updateData = students.map(stu => {
    if(stu.id == id){
      return {...req.body, id:id}
    }else{
      return stu;
    }
  })

  students = updateData;
  console.log('Update Success');
  res.redirect("/");
})

server.listen(8080, () => {
  console.log(`server Start at http://localhost:8080`);
});
