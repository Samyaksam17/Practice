const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const expressValidator = require("express-validator");
const session = require("express-session");
const mongoose = require("mongoose");
const config = require("./config/db");
const multer = require("multer");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// connect to database
mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// on connection
mongoose.connection.on("connected", () => {
  console.log("connected to database " + config.database);
});

// on error
mongoose.connection.on("error", (err) => {
  console.log("database connection error " + err);
});

// initialize express
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));

// Express Session
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true,
  })
);

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,enctype,Authorization"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

// Express Validator
app.use(
  expressValidator({
    errorFormatter: function (param, msg, value) {
      var namespace = param.split("."),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }
      return {
        param: formParam,
        msg: msg,
        value: value,
      };
    },
  })
);

// app.post('/api/login',function(req,res){
// const user={id:3};
// const token=jwt.sign({user},'mysecret');
// console.log(token);
// res.json({token:token,message:"run hgya"});
// const verific=jwt.verify(token,'mysecret');
// console.log(verific);

// });

// routes
const index = require("./routes/index");
const student = require("./routes/student");
const city = require("./routes/city")

// entry points
app.use("/", index);
app.use("/student", student);
app.use("/city", city)



// Set Port
app.set("port", 3001);

// server listen
app.listen(app.get("port"), () => {
  console.log("Server started on port " + app.get("port"));
});














// / multer for fileupload
// upload -> storage , filter

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, `user-${Date.now()}.jpeg`);
  },
});

const filter = function (req, file, cb) {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("not an Image! Please upload an image"), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: filter,
});
student.post("/ProfileImage", upload.single("photo"), (req, res) => {
  res.json({ message: "milgya" });
});

student.get("/ProfileImage", (req, res) => {
  res.sendFile("/Users/apple/Downloads/FOX/Practice/multer.html");
});


