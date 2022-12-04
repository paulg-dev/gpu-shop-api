

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
        imageUrl: {
            type: String,
            default: "https://st3.depositphotos.com/1020091/12649/v/600/depositphotos_126491530-stock-illustration-gpu-icon-illustration.jpg"
        },
        brand: {
            type: String,
            required: [true, "Please enter brand."]
        },
        isListed: {
            type: Boolean,
            default: true
        },
        isFeatured: {
            type: Boolean,
            default: false
        },
        price: {
            type: Number,
            required: [true, "Please enter the price."]
        },
        stocks: {
            type: Number,
            default: 0
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
                userId: {
                   type: String
                },
                quantity: {
                    type: Number,
                    default: 1
                },
                orderedOn: {
                    type: Date,
                    default: new Date()
                }
            }
        ]
});

module.exports = mongoose.model("Product", productSchema);