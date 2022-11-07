

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


// Route for retrieving a specific product

router.get("/:productId",(req,res)=>{
	productController.getProduct(req.params).then(resultFromController=>res.send(resultFromController));
});


// Route for updating a product

router.put("/:productId", auth.verify, (req,res)=>{
	productController.updateProduct(req.params, req.body).then(resultFromController=>res.send(resultFromController));
});


// Route for archiving a product

router.put("/:productId/archive", auth.verify, (req,res)=>{
	productController.archiveProduct(req.params, req.body).then(resultFromController=>res.send(resultFromController));
});


// Route for activating a product

router.put("/:productId/activate", auth.verify, (req,res)=>{
	productController.activateProduct(req.params, req.body).then(resultFromController=>res.send(resultFromController));
});


module.exports = router;