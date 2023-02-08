
const nodemailer = require("nodemailer");

module.exports.sendMail = async function sendMail(str,data) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "jsamyak407@gmail.com", // generated ethereal user
      pass: "ijjlhwzolqyzjpgb", // generated ethereal password
    },
  });

var Osubject , Ohtml;
if(str=="signup"){
    Osubject=`Thankyou for signing up ${data.name} `;
    Ohtml=` <h1>Welcome to practice app</h1>
            Hope you have a good time!
            here are your details -
            Name - ${data.name}
            Email - ${data.email} `
}
else if (str == "resetpassword"){
    Osubject= `Reset Password`;
    Ohtml= `<h1>practice app</h1>
    Here is your link to reset password!
    ${data.resetPasswordLink} `
}



  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <jsamyak407@gmail.com>', // sender address
    to: data.email, // list of receivers
    subject: Osubject, // Subject line
    html: Ohtml, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}
