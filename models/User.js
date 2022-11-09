

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
        },
        cart: [
            {
                productId: {
                   type: String
                }, 
                productName: {
                    type: String
                },
                price: {
                    type: Number
                },
                quantity: {
                	type: Number,
                	default: 1
                },
                subTotal: {
                    type: Number
                },
                addedOn: {
                    type: Date,
                    default: new Date()
                }
            }
        ]
});

module.exports = mongoose.model("User", userSchema);