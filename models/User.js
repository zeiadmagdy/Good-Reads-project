const mongoose = require("mongoose");
const Joi = require("joi");


// Define the User schema with validations
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        minlength: [5, "Username must be at least 5 characters long"],
        maxlength: 100,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
        ],
    },
    firstName: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        // unique: true,
        minlength: [2, "Username must be at least 2 characters long"],
        maxlength: 100,
    },
    lastName: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        // unique: true,
        minlength: [2, "Username must be at least 2 characters long"],
        maxlength: 100,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
        minlength: [6, "Password must be at least 6 characters long"],
    },
    role: {
        type: String,
        enum: {
            values: ["admin", "user"],
            message: "{VALUE} is not a valid role",
        },
        default: "user",
    },
    image: { type: String, default: "default-image.png" },

});

// Create the User model using the schema
const User = mongoose.model("User", userSchema);

function validateRegisterUser(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).required(),
        firstName: Joi.string().trim().min(2).max(100).required(),
        lastName: Joi.string().trim().min(2).max(100).required(),
        password: Joi.string().trim().min(6).max(100).required(),
        role: Joi.string().trim().valid("admin", "user"),
        image: Joi.string(),
    });
    return schema.validate(obj);
}

function validateLoginUser(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).required(),
        password: Joi.string().trim().min(6).max(100).required(),
        role: Joi.string().trim().valid("admin", "user"),
    });
    return schema.validate(obj);
}

module.exports = { User, validateRegisterUser, validateLoginUser };
