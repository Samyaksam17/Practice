const express=require('express');
const router= express.Router();

// import controller
var City=require('../controller/city');

router.post('/add',City.addCity);
router.post('/update',City.updateCity);
router.post('/getcity',City.getcity);
router.post('/getCityById',City.getCityById);
router.post('/removecity',City.removecity);

module.exports=router;
