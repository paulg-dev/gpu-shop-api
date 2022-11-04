

const mongoose = require ("mongoose");

const userSchema = new mongoose.Schema({
        firstName: {
            type: String,
            required: [true, "Please enter your first name."]
        },
        lastName: {
            type: String,
            required: [true, "Please enter your last name."]
        },
        email: {
            type: String,
            required: [true, "Please enter your email address."]
        },
        password: {
            type: String,
            required: [true, "Please enter your passowrd."]
        },
        mobileNo: {
            type: String,
            required: [true, "Please enter your mobile number."]
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
        // orders: [
        //     {
        //         totalAmount: {
        //            type: Number
        //         }, 
        //         purchasedOn: {
        //             type: Date,
        //             default: new Date()
        //         },
        //         products: [
        //         	{
        //         		productId: String,
        //         		quantity: Number
        //         	}

        //         ] 
        //     }
        // ]
});

module.exports = mongoose.model("User", userSchema);