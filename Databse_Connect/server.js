const express = require("express");
const dbConnect = require("./config/dbConnection");
const path = require('path');
const fs = require('fs');
const Student = require("./model/student.model");
const server = express();
const uploadImage = require('./middleware/uploadImage');

server.set("view engine", "ejs");
server.use(express.urlencoded());
server.use("/uploads",express.static("uploads"))

server.get("/", async (req, res) => {
  let allStudents = await Student.find();
  res.render("index", { students: allStudents });
});

server.post("/add-student",uploadImage.single('image'), async (req, res) => {
  let imagePath = "";
  if(req.file){
    imagePath = `/uploads/${req.file.filename}`;
  }
  await Student.create({...req.body, image: imagePath});
  console.log("Create Success");
  res.redirect("/");
});

server.get("/delete-student/:id", async (req, res) => {
  let id = req.params.id;
  let record = await Student.findById(id)
  if(record.image != ""){
    let imagePath = path.join(__dirname, record.image);
    await fs.unlinkSync(imagePath)
    console.log("File Delete Success");
  }
  // let record = await Student.findOne({_id: id})
  record = await Student.findByIdAndDelete(id);
  console.log("Delete Sucess", record);
  res.redirect("/");
});

server.get("/edit-student/:id", async (req, res) => {
  let id = req.params.id;
  let student = await Student.findById(id);
  res.render("editStudent", { student });
});

server.post("/update-student/:id",uploadImage.single('image'), async (req, res) => {
  let id = req.params.id;
  let student = await Student.findById(id);
  if (!student) {
    res.redirect("back");
  } else {
    let imagePath = "";
    if(req.file){
      console.log("File: ",req.file)
      if(student.image != ""){
        imagePath = path.join(__dirname, student.image);
        await fs.unlinkSync(imagePath);
        imagePath = `/uploads/${req.file.filename}`
      } else{
      imagePath = `/uploads/${req.file.filename}`
      }
    }else{
      imagePath = student.image
    }
    
    await Student.findByIdAndUpdate(id, {...req.body, image: imagePath}, { new: true });
    console.log("Update Sucess");
    res.redirect("/");
  }
});

server.listen(8080, () => {
  dbConnect();
  console.log(`Server start at http://localhost:8080`);
});
