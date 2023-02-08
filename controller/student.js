// student model
const student = require("../model/student");
const { sendMail } = require("../utility/nodemailer");

// Register
const register = (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;

  //validation
  req.checkBody("name", "name is required").notEmpty();
  req.checkBody("email", "email is required").notEmpty();
  req.checkBody("password", "Password is required").notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    return res.json({ status: false, error: errors });
  } else {
    let userObj = {
      name: name,
      email: email,
      password: password,
    };

    sendMail("signup", userObj);

    student.createUser(userObj, (err, result) => {
      if (err) return res.json({ status: false, error: err });
      else return res.json({ status: true, response: result });
    });
  }
};

// login
// const login = (req, res) => {
//   let email = req.body.email;
//   let password = req.body.password;

//   student.getSingleUser({ email: email }, function (err, user) {
//     if (err) return res.json({ status: false, error: err });
//     if (user) {
//       console.log(user);

//       student.comparePassword(password, user.password, function (err, isMatch) {
//         if (err) return res.json({message:"error"},err);
//         if (isMatch) {
//           const data = {
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             userType: "user",
//           };

//           // jwt.sign(data, "secret", (err, token) => {
//           //   return res.json({
//           //     status: true,
//           //     token: "JWT " + token,
//           //     response: data,
//             // });
//           // });
//         } else {
//           return res.json({ status: false, message: "Invalid Password" });
//         }
//       });
//     } else {
//       return res.json({ status: false, message: "User not found" });
//     }
//   });
// };

// getall users
const getAllUser = (req, res) => {
  let query = req.body.query;
  student.getUsers(query, (err, result) => {
    res.json({ status: true, response: result, totaluser: result.length });
  });
};

// get user by id
const getUserById = (req, res) => {
  let user_id = req.body.user_id;
  student.userById({ _id: user_id }, function (err, user) {
    if (err) return res.json({ status: false, error: err });
    if (user) {
      return res.json({
        response: user,
        message: "User By Id is",
      });
    } else {
      return res.json({ status: false, message: "User not found" });
    }
  });
};

// update user
const update = (req, res) => {
  let name = req.body.name;
  let email = req.body.email;

  student.updateUser(
    { email: email },
    { name: name },
    { new: true },
    function (err, user) {
      console.log("error", err);
      console.log("user", user);
      if (err) return res.json({ error: err });
      if (user) {
        return res.status(200).send({
          message: user,
        });
      } else {
        return res.json({ status: false, message: "user detail not found" });
      }
    }
  );
};

// delete
const remove = (req, res) => {
  let name = req.body.name;

  student.removeUser({ name }, function (err, user) {
    if (err) return res.json({ status: false, error: err });
    if (user) {
      return res.json({
        status: true,
        response: user,
        message: "removed success",
      });
    } else {
      return res.json({ status: false, message: "User not found" });
    }
  });
};


module.exports = { register, getAllUser, getUserById, update, remove , /*login*/ };
