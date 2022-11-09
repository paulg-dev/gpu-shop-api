

const mongoose = require ("mongoose");

const productSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, "Please enter the product name."]
        },
        description: {
            type: String,
            required: [true, "Please enter description."]
        },
        price: {
            type: Number,
            required: [true, "Please enter the price."]
        },
        stock: {
            type: Number,
            default: 1
        },
        isActive: {
            type: Boolean,
            default: true
        },
        createdOn: {
            type: Date,
            default: new Date()
        },
        orders: [
            {
                orderId: {
                   type: String,
                   // required: [true, "OrderId is required."]
                }, 
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ]
});

module.exports = mongoose.model("Product", productSchema);