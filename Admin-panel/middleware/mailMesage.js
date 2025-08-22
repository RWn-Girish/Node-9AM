const nodemailer = require("nodemailer");

const sendEmail = async(data) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false, // true for 465, false for other ports mjfwxsoqeqmybvuw
    auth: {
      user: "rw3.girish.gk@gmail.com",
      pass: "abcabcadbcadabcd",
    },
  });

  let res = await transporter.sendMail(data);
  if(res){
    console.log("Email Response: ", res);
    return res;
  }else{
    console.log("Email is not Send");
  }

};

module.exports = sendEmail;
