

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



// Retrieving a specific product

module.exports.getProduct = (reqParams) => {
	return Product.findById(reqParams.productId).then(result=>{
		return result;
	});
};



// Update a product

module.exports.updateProduct = (reqParams, reqBody) => {
	let updatedProduct= {
		name: reqBody.name,
		description: reqBody.description,
		price: reqBody.price
	};
	return Product.findByIdAndUpdate(reqParams.productId, updatedProduct).then((product,error)=>{
		if (error){
			return false;
		} else {
			return "Product with id:" + reqParams.productId + " has been updated.";
		}
	})
};



// Archive a product

module.exports.archiveProduct = (reqParams) => {
	
	return Product.findByIdAndUpdate(reqParams.productId,{isActive:false}).then((product,error)=>{
		if (error){
			return false;
		} else {
			return "Product with id:" + reqParams.productId + " has been delisted.";
		}
	})
};



// Activate a product

module.exports.activateProduct = (reqParams) => {
	
	return Product.findByIdAndUpdate(reqParams.productId,{isActive:true}).then((product,error)=>{
		if (error){
			return false;
		} else {
			return "Product with id:" + reqParams.productId + " has been listed again.";
		}
	})
};

