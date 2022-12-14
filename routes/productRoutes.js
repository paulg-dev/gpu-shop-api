

const express = require("express");
const router = express.Router();

const productController = require("../controllers/productControllers");
const auth = require("../auth");


// Route for creating a product

router.post("/", auth.verify,(req,res)=>{

	if (req.body.name == ''||null || req.body.description == ''||null || req.body.price == ''||null) {
		res.send('Registration failed. \n \n Please input all required fields.')
	} else {

		const data = {
		product: req.body,
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}
	
	// console.log(data);

	productController.addProduct(data).then(resultFromController=>res.send(resultFromController)).catch(errorFromController=>res.send(errorFromController));

	}
});


// Route for retrieving all products

router.get("/",(req,res)=>{
	productController.getAllProducts().then(resultFromController=>res.send(resultFromController)).catch(errorFromController=>res.send(errorFromController));
});


// Route for retrieving all active products

router.get("/active",(req,res)=>{
	productController.getAllActive().then(resultFromController=>res.send(resultFromController)).catch(errorFromController=>res.send(errorFromController));

});


// Route for retrieving a specific product

router.get("/:productId",(req,res)=>{
	productController.getProduct(req.params).then(resultFromController=>res.send(resultFromController)).catch(errorFromController=>res.send(errorFromController));
});


// Route for updating a product

router.put("/:productId", auth.verify, (req,res)=>{

	const data = {
		params: req.params,
		product: req.body,
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	productController.updateProduct(data).then(resultFromController=>res.send(resultFromController)).catch(errorFromController=>res.send(errorFromController));
});


// Route for archiving a product

router.put("/archive/:productId", auth.verify, (req,res)=>{

	const data = {
		params: req.params,
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	productController.archiveProduct(data).then(resultFromController=>res.send(resultFromController)).catch(errorFromController=>res.send(errorFromController));
});


// Route for activating a product

router.put("/activate/:productId", auth.verify, (req,res)=>{

	const data = {
		params: req.params,
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	productController.activateProduct(data).then(resultFromController=>res.send(resultFromController)).catch(errorFromController=>res.send(errorFromController));
});


module.exports = router;