const router = require("express").Router();
const Address = require("../models/address");
const User = require("../models/users");
const verifyToken = require("../middlewares/verify-token");
const axios = require("axios");

// Create an address
router.post("/address", verifyToken, async(req, res) => {
  try{
    let address = new Address();
    address.user = req.decoded._id;
    address.country = req.body.country;
    address.fullName = req.body.fullName;
    address.streetAddress = req.body.streetAddress;
    address.city = req.body.city;
    address.county = req.body.county;
    address.postCode = req.body.postCode;
    address.phoneNumber = req.body.phoneNumber;
    address.deliverInstruction = req.body.deliverInstruction;
    address.securityCode = req.body.securityCode;

    await address.save();
    res.json({
      success: true,
      message: "Successfully added an address"
    });

  }catch(err){
    res.status(500).json({
      success: false,
      message: err.message
    });
    console.log(err);
  }

});

// Get all addresses
router.get("/addresses", verifyToken, async(req, res) => {
  try{
    let address = await Address.find( {user: req.decoded._id});

    console.log(address);
    res.json({
      success: true,
      addresses: address
    });

  }catch(err){
    res.status(500).json({
      success: false,
      message: err.message
    });
    console.log(err);
  }
});

// Get single address
router.get("/addresses/:id", verifyToken, async(req, res) => {
  try{
    let address = await Address.findOne({ _id: req.params.id });

    res.json({
      success: true,
      address: address
    });
  
  }catch(err){
    res.status(500).json({
      success: false,
      message: err.message
    });
    console.log(err);
  }
});

// Get list of countries
router.get("/countries", async(req, res) =>{
  try{
    let responce = await axios.get("https://restcountries.eu/rest/v2/all");
    res.json(responce.data);

  }catch(err){
    res.status(500).json({
      success: false,
      message: err.message
    });
  }

});

// Create an address
router.put("/address/:id", verifyToken, async(req, res) => {
  console.log(req.body);
  try{
    let foundAddress = await Address.findOne({_id: req.params.id});

    if (foundAddress){

      if(req.body.country) foundAddress.country = req.body.country;
      if(req.body.fullName) foundAddress.fullName = req.body.fullName;
      if(req.body.streetAddress) foundAddress.streetAddress = req.body.streetAddress;
      if(req.body.city) foundAddress.city = req.body.city;
      if(req.body.county) foundAddress.county = req.body.county;
      if(req.body.postCode) foundAddress.postCode = req.body.postCode;
      if(req.body.phoneNumber) foundAddress.phoneNumber = req.body.phoneNumber;
      if(req.body.deliverInstruction) foundAddress.deliverInstruction = req.body.deliverInstruction;
      if(req.body.securityCode) foundAddress.securityCode = req.body.securityCode;
      
      await foundAddress.save();
  
      res.json({
        success: true,
        message: "Successfully updated the address"
      });
    }

  }catch(err){
    console.log(err.message);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }

});

// Delete an address
router.delete("/addresses/:id", verifyToken, async(req, res) =>{
  try{
    let  deletedAddress = await Address.remove({ user: req.decoded, _id: req.params.id });

    if (deletedAddress){
      res.json({
        success: true,
        message: "Address has been deleted."
      });
    }

  }catch(err){
    res.status(500).json({
      success: false,
      message: err.message
    });
  }

});

// Set as address as default
router.put("/address/set/default", verifyToken, async(req, res) => {
  console.log(req);
  try{
    const doc = await User.findOneAndUpdate({_id: req.decoded._id},{$set: {address: req.body.id}});
    if (doc) {
      res.json({
        success: true,
        message: "Successfully set this address as default"
      });
    }
  }catch(err){
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});


module.exports = router;