

const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderControllers");
const auth = require("../auth");


// Route for creating an order

router.post("/", auth.verify, (req,res)=>{

	const data = {
		order: req.body,
		authId: auth.decode(req.headers.authorization).id,
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	// console.log(auth.decode(req.headers.authorization));
	// console.log('test')
	// console.log(data)

	orderController.createOrder(data).then(resultFromController=>res.send(
		resultFromController)).catch(errorFromController=>res.send(errorFromController));
})



// Route for retrieving all orders - Admin Only

router.get("/", auth.verify, (req,res)=>{

	const data = {
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}


	orderController.getAllOrders(data).then(resultFromController=>res.send(resultFromController)).catch(errorFromController=>res.send(errorFromController));
});


// Route for retrieving oders of a user

router.get("/getUserOrders", auth.verify, (req,res)=>{

	const data = {
		authId: auth.decode(req.headers.authorization).id,
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	orderController.getUserOrders(data).then(resultFromController=>res.send(resultFromController)).catch(errorFromController=>res.send(errorFromController));
});


module.exports = router;


