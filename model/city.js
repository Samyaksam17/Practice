var mongoose=require('mongoose');


//city schema

var CitySchema=mongoose.Schema({
    name:{
        type:String,
        unique:true
    },
    state:{
        type:String
    },
    description:{
        type:String
    },
    created_at:{
        type:Date
    }
});


var City =mongoose.model('city',CitySchema);


//Add city
const createCity= function(newCity,callback){
    City.create(newCity,callback);
}
//update
const updateCity=function(query,data,options,callback){
    City.findOneAndUpdate(query,data,options,callback);
}

//getallcity
const getAllCity=function(query,callback){
    City.find(query,callback);
}

//getcitybyid
const citybyid=function(query,callback){
    City.findById(query,callback);
}

//removecity
    const deletecity =function(query,callback){
    City.remove(query,callback);
}


module.exports = { createCity ,updateCity,  getAllCity , citybyid , deletecity }