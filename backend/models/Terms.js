const mongoose = require("mongoose");

const { Schema } = mongoose;

const TermSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
});

const Terms = mongoose.model("terms", TermSchema);

module.exports = Terms;
