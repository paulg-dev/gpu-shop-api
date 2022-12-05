

const mongoose = require ("mongoose");

const orderSchema = new mongoose.Schema({
        userId: {
            type: String
        },
        orderSubtotal: {
            type: Number
        },
        orderedOn: {
            type: Date,
            default: new Date().toLocaleString()
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
                },
                productSubtotal: {
                    type: Number
                }
            }
        ]
});

module.exports = mongoose.model("Order", orderSchema);