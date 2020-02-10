const router = require('express').Router();
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const verifyToken = require("../middlewares/verify-token");

// Signup route..
router.post("/auth/signup", async (req, res) => {
  if(!req.body.email || !req.body.password) {
    console.log(req.body);
    res.json({success: false, message: "Please enter your email and password"});
  }else{
    try{
      let newUser = new User();
      newUser.name = req.body.name;
      newUser.email = req.body.email;
      newUser.password = req.body.password;
      await newUser.save();
      let token = jwt.sign(newUser.toJSON(), process.env.SECRET, {
        expiresIn: 604800 // 1 week
      });

      res.json({
        success: true,
        message: "Successfully created a new user",
        token: token
      });

    }catch(err){
      res.status(500).json({
        success: false,
        message: err.message
      });
      console.log(err);
    }
  }
});

// Profile Route
router.get("/auth/user", verifyToken, async (req, res) => {
  try{
    let foundUser = await User.findOne({_id: req.decoded._id});
    if (foundUser){
      res.json({
        success: true,
        user: foundUser
      });
    }
  }catch(err){
    res.statud(500).json({
      success: false,
      message: err.message
    });
  }
});

// Login Route
router.post("/auth/login", async (req, res) => {
  try{
    let foundUser = await User.findOne({email: req.body.email});
    if (!foundUser){
      res.status(403).json({
        success: false,
        message: "Authentication failed, user not found"
      })
    }else{
      if (foundUser.comparePassword(req.body.password)){
        let token = jwt.sign(foundUser.toJSON(), process.env.SECRET, {
          expiresIn: 604800 // 1 week
        })

        res.json({success: true, token: token});
      }else{
        res.status(403).json({
          success: false,
          message: "Authentication failed, wrong password!"
        });
      }
    }
  }catch(err){
    res.statud(500).json({
      success: false,
      message: err.message
    });
  }
});


module.exports = router;