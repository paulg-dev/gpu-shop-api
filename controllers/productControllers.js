

const User = require("../models/User");
const Product = require("../models/Product");
const bcrypt = require("bcrypt");
const auth = require("../auth");


// Create Product - Admin Only

module.exports.addProduct = (reqBody) => {

	if (reqBody.isAdmin) {

		let newProduct = new Product({
			name : reqBody.product.name,
			description : reqBody.product.description,
			price : reqBody.product.price
		});

		// console.log(newProduct);
		return newProduct.save().then((product,error)=>{
			if (error) {
				return false;
			} else {
				return 'Product added susccesfully. \n Please check product details below: \n \n' + product;
			};
		});
	} else {
		return 'Access failed. This function is limited to admin users.';
	};

};


// Retrieve all products


module.exports.getAllProducts = () => {
	return Product.find({}).then(allProducts=>{
		return allProducts;
	});
};


// Retrieve all Active Products


module.exports.getAllActive = () => {
	return Product.find({isActive:true}).then(activeProducts=>{
		return activeProducts;
	});
};