

const express = require("express");
const router = express.Router();

const productController = require("../controllers/productControllers");
const auth = require("../auth");


// Route for creating a product

router.post("/", auth.verify,(req,res)=>{

	const data = {
		product: req.body,
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}
	
	// console.log(data);

	productController.addProduct(data).then(resultFromController=>res.send(resultFromController))

	
});


// Route for retrieving all products

router.get("/",(req,res)=>{
	productController.getAllProducts().then(resultFromController=>res.send(resultFromController));
});



// Route for retrieving all active products

router.get("/active",(req,res)=>{
	productController.getAllActive().then(resultFromController=>res.send(resultFromController));

});

module.exports = router;