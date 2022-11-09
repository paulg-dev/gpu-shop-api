

const mongoose = require ("mongoose");

const orderSchema = new mongoose.Schema({
        userId: {
            type: String
        },
        productSubtotal: {
            type: Number
        },
        purchasedOn: {
            type: Date,
            default: new Date()
        },
        products: [
            {
                productId: {
                   type: String,
                }, 
                 productName: {
                   type: String,
                }, 
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ]
});

module.exports = mongoose.model("Order", orderSchema);