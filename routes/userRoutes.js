

const express = require("express");
const router = express.Router();

const userController = require("../controllers/userControllers");
const auth = require("../auth");



// Route for checking if the user's email already exists in the database
router.post("/checkEmail",(req,res)=>{
	userController.checkEmailExists(req.body).then(resultFromController=>res.send(resultFromController));
})


// Route for user registration

router.post("/register",(req,res)=>{
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
		user: req.body,
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	userController.updateToAdmin(data).then(resultFromController=>res.send(resultFromController)).catch(errorFromController=>res.send(errorFromController));
});


// Route for updating admin to user

router.put("/updateUser/:id", auth.verify, (req,res)=>{

	const data = {
		params: req.params,
		user: req.body,
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	userController.updateToUser(data).then(resultFromController=>res.send(resultFromController)).catch(errorFromController=>res.send(errorFromController));
});




// Route for retreiving user details

router.get("/details", auth.verify,(req,res)=>{

	const userData = auth.decode(req.headers.authorization);

	userController.getProfile({userId:userData.id}).then(resultFromController=>res.send(resultFromController)).catch(errorFromController=>res.send(errorFromController));
});


// Route for retreiving all users


router.get("/",(req,res)=>{
	userController.getAllUsers().then(resultFromController=>res.send(resultFromController)).catch(errorFromController=>res.send(errorFromController));
});



// Route for adding product to Cart

router.put("/addToCart", auth.verify, (req,res)=>{

	const data = {
		product: req.body,
		authId: auth.decode(req.headers.authorization).id,
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	userController.addToCart(data).then(resultFromController=>res.send(resultFromController)).catch(errorFromController=>res.send(errorFromController));
});


// Route for viewing Cart

router.get("/viewCart", auth.verify, (req,res)=>{

	const data = {
		product: req.body,
		authId: auth.decode(req.headers.authorization).id,
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	userController.viewCart(data).then(resultFromController=>res.send(resultFromController)).catch(errorFromController=>res.send(errorFromController));
});




// Route for updating quantity of item in Cart

router.patch("/viewCart/:productId", auth.verify, (req,res)=>{

	const data = {
		product: req.body,
		params: req.params,
		authId: auth.decode(req.headers.authorization).id,
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	userController.updateCart(data).then(resultFromController=>res.send(resultFromController)).catch(errorFromController=>res.send(errorFromController));
});


// Route for removing item from Cart

router.patch("/removeFromCart", auth.verify, (req,res)=>{

	const data = {
		product: req.body,
		authId: auth.decode(req.headers.authorization).id,
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	userController.removeFromCart(data).then(resultFromController=>res.send(resultFromController)).catch(errorFromController=>res.send(errorFromController));
});


module.exports = router;