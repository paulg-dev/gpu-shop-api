

const express = require("express");
const router = express.Router();

const userController = require("../controllers/userControllers");
const auth = require("../auth");



// Route for user registration

router.post("/",(req,res)=>{
	userController.registerUser(req.body).then(resultFromController=>res.send(
		resultFromController)).catch(errorFromController=>res.send(errorFromController));
})

// Route for user login

router.post("/login",(req,res)=>{
	userController.loginUser(req.body).then(resultFromController=>res.send(resultFromController)).catch(errorFromController=>res.send(errorFromController));
});



// Route for updating user as admin


router.put("/updateAdmin/:id", auth.verify, (req,res)=>{

	const data = {
		params: req.params,
		product: req.body,
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	userController.updateToAdmin(data).then(resultFromController=>res.send(resultFromController)).catch(errorFromController=>res.send(errorFromController));
});


// Route for retreiving user details

router.get("/profile",(req,res)=>{

	userController.getProfile(req.body).then(resultFromController=>res.send(resultFromController)).catch(errorFromController=>res.send(errorFromController));
});


// Route for adding product to Cart

router.get("/addToCart",(req,res)=>{

	userController.addToCart(req.body).then(resultFromController=>res.send(resultFromController)).catch(errorFromController=>res.send(errorFromController));
});



module.exports = router;