

const User = require("../models/User");
const Product = require("../models/Product");
const bcrypt = require("bcrypt");
const auth = require("../auth");




// User Registration


module.exports.registerUser = (reqBody) => {

	return User.find({email:reqBody.email.toLowerCase()}).then(result=>{

		if (result.length>0) {

			return 'Registration failed. \n \n Email address has already been used.';

		} else {
			
			let newUser = new User ({

				firstName : reqBody.firstName,
				lastName : reqBody.lastName,
				password : bcrypt.hashSync(reqBody.password,10),
				email : reqBody.email.toLowerCase(),
				mobileNo : reqBody.mobileNo
		
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
			return 'User with this email is not registered.';
		} else {
			const isPasswordCorrect = bcrypt.compareSync(reqBody.password,result.password);
			if (isPasswordCorrect) {
				
				const output = {
					'alert' : `Now logged in as ${result.firstName} ${result.lastName}. Your access token is:`,
					'>' : `${auth.createAccessToken(result)}`
				}
				return output;

			} else {
				return 'Password is incorrect.';
			};
		};
	});
};


// Update user as admin

module.exports.updateToAdmin = async (userId, res) => {

    // const userId = req.params.id

    const userToUpdate = await User.findById(userId)
        .then((result, error) => {
            if (error) {
                return 'Server error'
            }

            if (result == null) {
                return null;
            }
            return result
    });

    if (userToUpdate == null) {
        return 'User not Found'
    }

    if (userToUpdate.isAdmin) {
        return 'User is already admin'
    }

    return User.findByIdAndUpdate(userId).then((result, error) => {
    
        if (error) {
            return 'Update Error'
        }
        result.isAdmin = true;
        return result.save().then((isAdmin,error)=>{
        	if (error) {
            	return 'Update Error'
       		} else {
        		return isAdmin;
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