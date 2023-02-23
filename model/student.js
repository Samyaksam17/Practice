const { query } = require("express");
const mongoose = require("mongoose");
const emailValidator = require("email-validator");

// student schema

const studentSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    validate: function () {
      return emailValidator.validate(this.email);
    },
  },
  password: {
    type: String,
  },
});

// student model
const student = mongoose.model("student", studentSchema);

// create user
const createUser = (newUser, callback) => {
  student.create(newUser, callback);
};



// get single user
const getSingleUser = (query, callback) => {
  student.findOne(query, callback)
}

// Compare Password
const comparePassword = function (password, callback) {
    compare(password,function (err, isMatch) {
      console.log(password);
      // console.log(hash)
      if (err) throw err;
      callback(null, isMatch);
  });
}


// get all users
const getUsers = (query, callback) => {
  student.find(query, callback);
};

// get user by id
const userById = (query, callback) => {
  student.findById(query, callback);
};

// update user
const updateUser = (query, update, options, callback) => {
  student.findOneAndUpdate(query, update, options, callback);
};

// delete user
const removeUser = (query, callback) => {
  student.deleteOne(query, callback);
};



module.exports = { createUser, getUsers, userById, updateUser, removeUser , /*comparePassword , getSingleUser*/};
