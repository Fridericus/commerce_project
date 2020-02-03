const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require('./models/users');


dotenv.config();

const app = express();

mongoose.connect(
  process.env.DATABASE, 
  {useNewUrlParser: true, useUnifiedTopology: true},
  err => {
    if(err) console.log(err);
    else console.log("Connected to the database");
  }
);

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// APIs
const productRoutes = require("./routes/products");
const categoryRoutes = require("./routes/categorys");
const ownerRoutes = require("./routes/owners");
app.use("/api", productRoutes);
app.use("/api", categoryRoutes);
app.use("/api", ownerRoutes);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
});
console.log(process.env);

app.listen(3000, (err) => {
  if(err) console.log(err);
  else console.log("Listening on port: ", 3000);
});