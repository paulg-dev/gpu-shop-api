

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
				'err': 'Similar Product Name'
			}
			return output;	
		} else {

			if (data.isAdmin) {

				let newProduct = new Product({
					name : data.product.name,
					description : data.product.description,
					imageUrl : data.product.imageUrl,
					brand : data.product.brand,
					isListed : data.product.isListed,
					isFeatured : data.product.isFeatured,
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
						// return output;
						return true;
					};
				});
			} else {
				const output = {
					'err': 'Not an admin'
				}
				return output;
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
	return Product.find({isListed:true}).then(activeProducts=>{
		return activeProducts;
	});
};


// Retrieve all Featured Products

module.exports.getAllFeatured = () => {
	return Product.find({isFeatured:true}).then(featuredProducts=>{
		return featuredProducts;
	});
};

// Retrieve all Nvidia Products

module.exports.getAllNvidia = () => {
	return Product.find({isListed:true, brand:"nvidia"}).then(nvidiaProducts=>{
		return nvidiaProducts;
	});
};

// Retrieve all Amd Products

module.exports.getAllAmd = () => {
	return Product.find({isListed:true, brand:"amd"}).then(amdProducts=>{
		return amdProducts;
	});
};

// Retrieve all Intel Products

module.exports.getAllIntel = () => {
	return Product.find({isListed:true, brand:"intel"}).then(intelProducts=>{
		return intelProducts;
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

			// return output;
			return result
		}
		
	});
};



// Update a product

module.exports.updateProduct = (data) => {

	if (data.isAdmin) {

		let updateInfo = {
			name : data.product.name,
			description : data.product.description,
			imageUrl : data.product.imageUrl,
			brand : data.product.brand,
			isListed : data.product.isListed,
			isFeatured : data.product.isFeatured,
			price : data.product.price,
			stocks : data.product.stocks

		};

		// console.log("test")
		// console.log(updateInfo)
		// console.log("test")

		if (data.product.stocks == 0) {
			updateInfo.isListed = false
		}
		else {
			updateInfo.isListed = true
		}

		// console.log("test")
		// console.log(data.product.isListed)
		// console.log(updateInfo.isListed)
		// console.log("test")

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
					// return output;
					return true;
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
	
			return Product.findByIdAndUpdate(data.params.productId,{isListed:false}).then((product,error)=>{
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
	
			return Product.findByIdAndUpdate(data.params.productId,{isListed:true}).then((product,error)=>{
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


// Un-Feature a product

module.exports.removeFeaturedProduct = (data) => {
	if (data.isAdmin) {
	
			return Product.findByIdAndUpdate(data.params.productId,{isFeatured:false}).then((product,error)=>{
				if (error){
					return 'Error';
				} else {
					const output = {
						'alert!': `Product ${product.name} has been un-featured.`
					}

					return output;
				}
			})
	}
};



// Activate a product

module.exports.addFeaturedProduct = (data) => {
	if (data.isAdmin) {
	
			return Product.findByIdAndUpdate(data.params.productId,{isFeatured:true}).then((product,error)=>{
				if (error){
					return 'Error';
				} else {
					const output = {
						'alert!': `Product ${product.name} been featured.`,
					}

					return output;
				}
			})
	}
};
