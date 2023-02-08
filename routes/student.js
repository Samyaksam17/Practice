const express = require('express');
const router = express.Router();

const { sendMail } = require('../utility/nodemailer')


// import controller
const student = require('../controller/student');


router.post('/register',student.register)
router.post('/getAllUser', student.getAllUser)
router.post('/getUserById', student.getUserById)
router.post('/update', student.update)
router.post('/remove', student.remove)
// router.post('/login', student.login)


module.exports =  router;