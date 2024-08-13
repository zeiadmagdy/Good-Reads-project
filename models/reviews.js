const express = require("express");
const router = express.Router();
const { reviews } = require("../models/reviews");


const reviewsSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    Rating: {
        type: Number,
        required: true,
    },

    User: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const reviews = mongoose.model("reviews", reviewsSchema);
module.exports = {
    reviews
}