

const User = require("../models/User");
const Product = require("../models/Product");
const bcrypt = require("bcrypt");
const auth = require("../auth");



// Create Product - Admin Only

module.exports.addProduct = (data) => {

	return Product.findOne({name:data.product.name}).then(result=>{
		//  console.log(result);
		if (result !== null){
			const output = {
				'error!': 'Registration failed. Product with similar name already registered.'
			}
			return output;	
		} else {

			if (data.isAdmin) {

				let newProduct = new Product({
					name : data.product.name,
					description : data.product.description,
					price : data.product.price,
					stocks : data.product.stocks
				});

				// console.log(newProduct);
				return newProduct.save().then((product,error)=>{
					if (error) {
						return false;
					} else {
						const output = {
							'alert!' : 'Product has been added susccesfully.',
							'>' : product
						}
						return output;
					};
				});
			} else {
				return 'Access failed. This function is limited to admin users.';
			};

		};
	});

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
	return Product.findById(reqParams.productId).then((result, err) => {

		// if (reqParams.productId.length !== 24) {
		// 	const output {
		// 		'error!': 'Please use a valid product id with length of 24 characters'
		// 	}
		// 	return output;

		if (err) {
			return 'Error'
		}

		if (result == null) {
			const output = {
				'error!': 'Product does not exist.'
			}
			return output;

		} else {
			const output = {
				'alert!': 'These are the product details:',
				'>': result
			}

			return output;
		}
		
	});
};



// Update a product

module.exports.updateProduct = (data) => {

	if (data.isAdmin) {

		let updateInfo = {
			name: data.product.name,
			description: data.product.description,
			price: data.product.price,
			stocks : data.product.stocks
		};


		return Product.findByIdAndUpdate(data.params.productId, updateInfo).then((product,error)=>{
			
			if (error) {
				return 'Error';
			} else {
				
				return product.save().then((updatedProduct) => {

					const output = {
						'alert!' : `Product ${product.name} has been updated with the following detail/s:`,
						'>' : updateInfo,
						// '<' : updatedProduct
					};

					return output;
				});				
			};
			
		});
	} else {
		return 'Error';
	}
};



// Archive a product

module.exports.archiveProduct = (data) => {
	if (data.isAdmin) {
	
			return Product.findByIdAndUpdate(data.params.productId,{isActive:false}).then((product,error)=>{
				if (error){
					return 'Error';
				} else {
					const output = {
						'alert!': `Product ${product.name} has been delisted.`
					}

					return output;
				}
			})
	}
};



// Activate a product

module.exports.activateProduct = (data) => {
	if (data.isAdmin) {
	
			return Product.findByIdAndUpdate(data.params.productId,{isActive:true}).then((product,error)=>{
				if (error){
					return 'Error';
				} else {
					const output = {
						'alert!': `Product ${product.name} been listed again.`,
					}

					return output;
				}
			})
	}
};
