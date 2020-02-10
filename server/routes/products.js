const router = require("express").Router();
const Product = require("../models/products");
const upload = require("../middlewares/upload-photo");

// POST a new product
router.post('/products', upload.single("photo"), async(req, res) => {
  console.log(req.body);
  try{
    let product = new Product();
    product.owner = req.body.ownerID;
    product.category = req.body.categoryID;
    product.title = req.body.title;
    product.description = req.body.description;
    product.photo = req.file.location;
    product.price = req.body.price;
    product.stockQuantity = req.body.stockQuantity;

    await product.save();

    res.json({
      status: true,
      message: "Sucessfully saved"
    });
  
  }catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// GET all products
router.get("/products", async (req, res) =>{
  try{
    let products = await Product.find()
    .populate("owner category")
    .exec();
    res.json({
      success: true,
      products: products
    });
  }catch(err){
    res.status(500).json({
      success: false,
      products: err.message
    });
  }
});

// GET a single product
router.get("/products/:id", async (req, res) =>{
  try{
    let products = await Product.findOne({_id: req.params.id})
    .populate("owner category")
    .exec();
    res.json({
      success: true,
      products: products
    });
  }catch(err){
    res.status(500).json({
      success: false,
      products: err.message
    });
  }
});

// PUT a single product
router.put("/products/:id", upload.single("photo"), async (req, res) =>{
  console.log(req);
  try{
    let product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      { $set: {
          title: req.body.title,
          description: req.body.description,
          photo: req.file.location,
          price: req.body.price,
          owner: req.body.ownerID,
          category: req.body.categoryID
        }
      },
      { upsert: true }
    );
    res.json({
      success: true,
      responce: "Updated!"
    });
  }catch(err){
    res.status(500).json({
      success: false,
      products: err.message
    });
  }
});

router.delete("/products/:id", async (req, res) => {
  try{
    let deletedProduct = await Product.findOneAndDelete({_id: req.params.id});
    if(deletedProduct){
      res.json({
        status: true,
        message: "Successfully deleted"
      });
    }
  }catch(err){
    res.status(500).json({
      success: false,
      products: err.message
    });
  }
});

module.exports = router;