

const mongoose = require ("mongoose");

const userSchema = new mongoose.Schema({
        firstName: {
            type: String,
            required: [true, "First name has not been entered."]
        },
        lastName: {
            type: String,
            required: [true, "Last name has not been entered."]
        },
        email: {
            type: String,
            required: [true, "Email has not been entered."]
        },
        password: {
            type: String,
            required: [true, "Password has not been entered."]
        },
        mobileNo: {
            type: String,
            required: [true, "Mobile number has not been entered."]
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