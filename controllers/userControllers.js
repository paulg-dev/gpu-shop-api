

const User = require("../models/User");
const Product = require("../models/Product");
const bcrypt = require("bcrypt");
const auth = require("../auth");




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
					return output ;
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
				return output;
		} else {
			const isPasswordCorrect = bcrypt.compareSync(reqBody.password,result.password);
			if (isPasswordCorrect) {
				
				const output = {
					'alert!' : `Now logged in as ${result.firstName} ${result.lastName}. Your access token is:`,
					'>' : `${auth.createAccessToken(result)}`
				}
				return output;

			} else {
				const output = {
					'error!' : 'Password is incorrect',
				}
				return output;
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


// Retrieve user details

module.exports.getProfile = (reqBody) =>{
	return User.findById(reqBody.id).then(result=>{
			result.password = "";
			return result;
	});
};


// Add to cart

module.exports.addToCart = async (req, res) => {
    const userId = auth.decode(request.headers.authorization).id;

    let subTotal = req.body.price * req.body.quantity;

    let data = {
        productId: req.body.productId,
        productName: req.body.productName,
        quantity: req.body.quantity,
        price: req.body.price,
        subTotal: subTotal
    };

    const isUserCartUpdated = await User.findById(userId).then(user => {
        user.userCart.push(data);

        return user.save().then((result, error) => {
            if (error) {
                return false;
            }

            return true;
        });
    });

    const isProductUpdated = await Product.findById(req.body.productId).then(product => {

        let dbProdStocks = product.stocks;
        let bodyProdQty = request.body.quantity;

        let isOutOfStock =
        (dbProdStocks - bodyProdQty) <= 0
        ? true : false;

        if (isOutOfStock) {
            product.isActive = false;
        }

        product.stocks = product.stocks - request.body.quantity;

        return product.save().then((result, error) => {
            if (error) {
                return false;
            }

            return true;
        });
    });

    if (!(isUserCartUpdated && isProductUpdated)) {
        return response.send(false);
    }

    return response.send(true);
}