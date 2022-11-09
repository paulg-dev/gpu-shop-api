

const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");
const bcrypt = require("bcrypt");
const auth = require("../auth");


// Create Order - Non-admin Only

module.exports.createOrder = (data) => {

	if (data.isAdmin) {

		const output = {
			'error!' : "Admins are not allowed to create an order."
		}

		return Promise.reject(output)

	} else {

		return Product.findById(data.order.products[0].productId).then(toOrder=>{


			const userId = data.authId;
			let productSubtotal = data.order.products[0].quantity * toOrder.price;

			let newOrder = new Order ({
				userId : userId,
				productSubtotal : productSubtotal,
				products : [
					{
						productId : data.order.products[0].productId,
						productName : toOrder.name,
						quantity: data.order.products[0].quantity
					},
				]
		});

			return newOrder.save().then((order,error)=>{
			
				if (error) {
					return 'Error';
				} else {
				
					const output = {
						'alert!' : `New order has been made with the following details:`,
						'>' : order,
					};

					return output;				
			};
			
		});

		})
		
	}		

};


// Retrieve All Orders - Admin Only


module.exports.getAllOrders = (data) => {

	// console.log(data.isAdmin);

	if (data.isAdmin) {
		return Order.find({}).then(allOrders=>{
		return allOrders;
	});

	} else {

		const output = {
			'error!' : 'This feature is limited to admin users'
		}
		return Promise.reject(output);
	}
};



// Retrieve User Orders


module.exports.getUserOrders = (data) => {

	// console.log(data.isAdmin);

	if (data.isAdmin) {
		const output = {
			'error!' : 'This feature is for the authenticated user only.'
		}
		return Promise.reject(output);
	} else {

		return Order.find({userId:data.authId}).then(allUSerOrders=>{
		
		const output = {
			'alert!': `Hi, these are your orders`,
			'>' : allUserOrders
		}

		return output;
	});

	}
};