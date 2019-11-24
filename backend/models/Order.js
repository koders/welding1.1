const mongoose = require("mongoose");
const Terms = require("./Terms");
const Product = require("./Product");

const { Schema } = mongoose;

const OrderSchema = new Schema({
    status: String,
    number: String,
    company: String,
    marking: String,
    currency: String,
    specification: String,
    date: Date,
    delivery: {
        date: String,
        address: String,
    },
    terms: Terms,
    contact: {
        person: String,
        phone: String,
        fax: String,
        email: String,
    },
    products: [{
        product: Product,
        amount: Number,
        price: Number,
    }],
    totalPrice: Number,
    dateCreated: {
        type: Date,
        default: Date.now(),
    },
});

const Order = mongoose.model("orders", OrderSchema);

module.exports = Order;
