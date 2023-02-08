// City model
const City = require("../model/city");

const addCity = (req, res) => {
  var name = req.body.name;
  var state = req.body.state;
  var description = req.body.description;

  //validation
  req.checkBody("name", "Name is required").notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    return res.json({ status: false, error: errors });
  } else {
    let cityObj = {
      name: name,
      state: state,
      description: description,
    };

    City.createCity(cityObj, (err, result) => {
      if (err) return res.json({ status: false, error: err });
      else return res.json({ status: true, response: result });
    });
  }
};

//update city
const updateCity = (req, res) => {
  var city_id = req.body.city_id;
  var name = req.body.name;

  City.updateCity(
    { _id: city_id },
    { name: name },
    { new: true },
    function (err, city) {
      if (city) {
        return res.json({ status: true, message: city });
      } else {
        return res.json({ status: false, message: "can't able to update" });
      }
    }
  );
};

//getallcity
const getcity = (req, res) => {
  let query = req.body.query;
  City.getAllCity(query, (err, city) => {
    if (err) return res.json({ status: false, response: err });
    if (city) {
      return res.json({ status: true, response: city });
    } else {
      returnres.json({ status: false, message: "Error occured!" });
    }
  });
};

//getcitybyid
const getCityById = (req, res) => {
  let city_id = req.body.city_id;
  City.citybyid({ _id: city_id }, (err, city) => {
    if (err) return res.json({ status: false, message: "id is wrong" });
    else return res.json({ status: true, response: city });
  });
};

//removecity
const removecity = (req, res) => {
  let city_id = req.body.city_id;
  //validation
  req.checkBody("city_id", "city_id is required").notEmpty();
  var errors = req.validationErrors();
  if (errors) return res.json({ status: false, message: "validation error" });
  else {
    City.deletecity({ _id: city_id }, (err, city) => {
      if (city)
        return res.json({ status: true, message: "removed successfully" });
      else
        return res.json({
          status: false,
          message: "error occured while removing",
        });
    });
  }
};

module.exports = { addCity, updateCity, getcity, getCityById, removecity };
