

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
		
			})

			return newUser.save().then((user,error)=>{
				if (error) {
					return 'Registration failed.'
				} else {
					return 'Registration successful with the following details: \n \n'  + user;
				};
			});

		};
	});
};



// User Login


module.exports.loginUser = (reqBody) =>{
	return User.findOne({email:reqBody.email}).then(result=>{
		if (result==null) {
			return false;
		} else {
			const isPasswordCorrect = bcrypt.compareSync(reqBody.password,result.password);
			if (isPasswordCorrect) {
				return {access: auth.createAccessToken(result)}
			} else {
				return false
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