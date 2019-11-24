const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductSchema = new Schema({
    number: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    inStock: Number,
    totalShipped: Number,
    // category: Category,
    // material,
    // model,
    // size,
});

const Product = mongoose.model("products", ProductSchema);

module.exports = Product;
