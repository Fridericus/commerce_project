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
const authRoutes = require("./routes/auth");
const reviewRoutes = require("./routes/review");
const addressRoutes = require("./routes/address");
const paymentRoutes = require("./routes/payment");
const orderRoutes = require("./routes/order");
const searchRoutes = require("./routes/search");

app.use("/api", productRoutes);
app.use("/api", categoryRoutes);
app.use("/api", ownerRoutes);
app.use("/api", authRoutes);
app.use("/api", reviewRoutes);
app.use("/api", addressRoutes);
app.use("/api", paymentRoutes);
app.use("/api", orderRoutes);
app.use("/api", searchRoutes);

console.log(process.env);

app.listen(3000, (err) => {
  if(err) console.log(err);
  else console.log("Listening on port: ", 3000);
});