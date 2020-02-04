const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require('./models/users');
const cors = require("cors");


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
app.use(cors());
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

console.log(process.env);

app.listen(3000, (err) => {
  if(err) console.log(err);
  else console.log("Listening on port: ", 3000);
});