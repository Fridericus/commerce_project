const router = require("express").Router();
const Owner = require("../models/owners");
const upload = require("../middlewares/upload-photo");

router.post("/owners", upload.single("photo"), async (req, res) => {
  try{
    let owner = new Owner();
    owner.name = req.body.name;
    owner.about = req.body.about;
    owner.photo = req.file.location;

    await owner.save();

    res.json({
      status: true,
      message: "Successully saved"
    })

  }catch(err){
    res.status(500).json({
      status: false,
      message: err.message
    })
  }
});

router.get("/owners", async (req, res) => {
  try{
    let owners = await Owner.find();
    res.json({
      success: true,
      owners: owners
    })
  }catch(err){
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
});

module.exports = router;