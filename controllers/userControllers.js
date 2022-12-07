

const User = require("../models/User");
const Product = require("../models/Product");
const bcrypt = require("bcrypt");
const auth = require("../auth");



//Check if the email already exists

module.exports.checkEmailExists = (reqBody) =>{
	return User.find({email:reqBody.email}).then(result=>{
		if(result.length>0){
			return true;
		}else{
			return false;
		};
	});
};


// User Registration


module.exports.registerUser = (data) => {

	return User.find({email:data.email.toLowerCase()}).then(result=>{

		if (result.length>0) {
			const output = {
				'error!' : `Registration failed. Email ${data.email} has already been used`
			}

			return output;

		} else {
			
			let newUser = new User ({

				firstName : data.firstName,
				lastName : data.lastName,
				password : bcrypt.hashSync(data.password,10),
				email : data.email.toLowerCase(),
				mobileNo : data.mobileNo
		
			});

			return newUser.save().then((user,error)=>{
				if (error) {
					return false;
				} else {
					const output = {
							'alert!' : 'Registration successful with the following details:',
							'>' : user
					}
					// return output ;
					return true
				};
			});

		};
	});
};



// User Login


module.exports.loginUser = (reqBody) =>{
	return User.findOne({email:reqBody.email}).then(result=>{
		if (result == null) {
			const output = {
					'error!' : 'No user with this email can be found.',
				}
				// return output;
				return false;
		} else {
			const isPasswordCorrect = bcrypt.compareSync(reqBody.password,result.password);

			if (isPasswordCorrect) {
				
				const output = {
					'alert!' : `Now logged in as ${result.firstName} ${result.lastName}. Your access token is:`,
					'>' : `${auth.createAccessToken(result)}`
				}
				// return output;
				return {access:auth.createAccessToken(result), id:result._id, isAdmin:result.isAdmin, email:result.email, firstName:result.firstName, lastName:result.lastName}
			} else {
				const output = {
					'error!' : 'Password is incorrect'
				}
				// return output;
				return false;
			};
		};
	});
};


// Update user as admin

module.exports.updateToAdmin = async (data) => {

    const userToUpdate = await User.findById(data.params.id)
        .then((result, error) => {
            if (error) {
                return 'Error'
            }

            if (result == null) {	
                return null;
            }
            return result
    });

    if (userToUpdate == null) {
        const output  = {
        	'error!': 'User not found.'
        }
        return output
    }	

    if (userToUpdate.isAdmin) {
    	const output = {
    		'error!' : `${userToUpdate.firstName} ${userToUpdate.lastName} is already an admin.`
    	}
        return output
    }

    return User.findByIdAndUpdate(data.params.id).then((result, error) => {
    
        if (error) {
            return 'Update Error'
        }
        result.isAdmin = true;
        return result.save().then((nowAdmin,error)=>{
        	if (error) {
            	return 'Error'
       		} else {
       			const output = {
       				'alert!' : `${result.firstName} ${result.lastName} is now an admin.`,
       				'>' : nowAdmin 
       			}

        		return output;
        	}
        })
    });
}



// Update admin to user

module.exports.updateToUser = async (data) => {

    const userToUpdate = await User.findById(data.params.id)
        .then((result, error) => {
            if (error) {
                return 'Error'
            }

            if (result == null) {	
                return null;
            }
            return result
    });

    if (userToUpdate == null) {
        const output  = {
        	'error!': 'User not found.'
        }
        return output
    }	

    if (!userToUpdate.isAdmin) {
    	const output = {
    		'error!' : `${userToUpdate.firstName} ${userToUpdate.lastName} is already a regular user.`
    	}
        return output
    }

    return User.findByIdAndUpdate(data.params.id).then((result, error) => {
    
        if (error) {
            return 'Update Error'
        }
        result.isAdmin = false;
        return result.save().then((nowUser,error)=>{
        	if (error) {
            	return 'Error'
       		} else {
       			const output = {
       				'alert!' : `${result.firstName} ${result.lastName} is now a regular user.`,
       				'>' : nowUser 
       			}

        		return output;
        	}
        })
    });
}


// Retrieve user details

module.exports.getProfile = (data) =>{
	return User.findById(data.userId).then(result=>{
			// result.password = "";
			// console.log(result)
			return result;

	});
};


// Add to cart

module.exports.addToCart = (data, res) => {

	const userId = data.authId;

	if (data.isAdmin) {

		const output = {
			'error!' : "Admins are not allowed to add items to cart."
		}
		return Promise.reject(output);

	} else {

		return Product.findOne({name:data.product.name}).then((product, err) => {

   			if (product == null) {
   				const output = {
   					"error!" : 'No product with this name is available.'
   				}

   				return output;


   			} else {

   				if (data.product.quantity > product.stocks) {
   					const output = {
   						"error!" : 'Not enough stocks.',
   						">" : `Maximum order as of the moment is limited to ${product.stocks} pieces.`
   					}

   					return output;	

   				} else {

   					let subTotal = product.price * data.product.quantity;

    				let toCart = {
        				productId: product._id,
        				productName: data.product.name,
        				quantity:data.product.quantity,
	        			price: product.price,
	        			subTotal: subTotal

    				};

    				// console.log(toCart)

    				let cartUpdate = User.findById(userId).then(user => {
        					user.cart.push(toCart);

        				let addedtoCart = user.save().then(result =>{

        				// console.log(result)		 		

        				})
        			});		

    				const output = {
    					'alert!' : 'Item/s successfully added to cart.',
    					'>' : toCart
    				}
        			// return output;		 
        			return true;
    				
   				}
   			}	

   		});
   	}
}   

	
// View Cart

module.exports.viewCart = (data) =>{

	return User.findOne({_id:data.authId}).then(result=>{

			// console.log(result.cart)

			let totalAmount = 0;

			result.cart.forEach(item => {

				totalAmount += item.subTotal
			})

			// console.log(totalAmount)

			// const output = {
			// 	'alert!' : `Here is what's currently in your cart ${result.firstName}`,
			// 	'>' : result.cart,
			// 	'totalAmount' : totalAmount
			// }

			return result.cart;	
			
	});
};



// updating quantity in Cart

module.exports.updateCart = async (data) =>{

	const userToUpdate = await User.findOne({_id:data.authId}).then((result, error) => {
        
        	// console.log(data.authId)
        	// console.log(result)   

            if (error) {
                return 'Error'
            }

            if (result == null) {	
                return null;
            }
            return result
    });

    if (userToUpdate == null) {
        const output  = {
        	'error!': 'User not found.'
        }
        return output
    }	

    return User.findByIdAndUpdate(data.authId).then((result, error) => {
    
        if (error) {
            return 'Update Error'
        }

        let toUpdate = {
        			// productId: product._id,
        			// productName: data.product.name,
        			quantity: data.product.quantity,
	        		// price: result.product.price,
	     } 

	     // console.log(toUpdate)
	     // console.log(result.cart.length)

	        for (let i = 0; i < result.cart.length; i++)

	        if (data.params.productId == result.cart[i].productId) {

	        	result.cart[i].quantity = data.product.quantity

	        	result.cart[i].subTotal = data.product.quantity * result.cart[i].price
	        }

        return result.save().then((nowUpdated,error)=>{

        	console.log(result)
        	console.log(nowUpdated)

        	if (error) {
            	return 'Error'
       		} else {
       			const output = {
       				'alert!' : `Quantity has been succesfully updated`,
       				'>' : nowUpdated.cart 
       			}

        		return output;
        	}
        })
    });

};


// remove From Cart

module.exports.removeFromCart = (data) =>{

	return User.findOne({_id:data.authId}).then(result=>{

			
			let toRemove = {
				product: ''
			}

			let totalAmount = 0;

			result.cart.forEach(item => {

				totalAmount += item.subTotal
			})
				
			const output = {
				'alert!' : `Has been successfully removed from your cart`,
				'>' : result.cart,
				'totalAmount' : totalAmount
			}

			return output;	
			
	});
};



// app.delete('/delete-users', (request, response) => {
// 	// users = [];
// 	for (let i = 0; i < users.length; i++) {
		
// 		if (request.body.username == users[i].username) {
			
// 			 users[i] = {}
			
// 			 message = `User ${request.body.username}'s has been deleted`
			 
// 			 break;
		 
// 		} else {
			
// 			message = "Users does not exist"
// 		}
// 		response.send(mesage);
// };


// function deleteFriend (friend){

//         if (friendsList.indexOf(friend) === -1){
//             alert("Friend not found");
//         } else {
//             let index = friendsList.indexOf(friend);
//             friendsList.splice(index, 1);
//             alert("You have deleted " + friend + " as a friend!");
//         }
//     }


// Retrieve all users

module.exports.getAllUsers = () => {
	return User.find({}).then(allUsers=>{
		return allUsers;
	});
};