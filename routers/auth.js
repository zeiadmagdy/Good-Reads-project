const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const { User, validateRegisterUser, validateLoginUser } = require("../models/User");

/** 
@desc: Reister New User
@route /api/auth/register
@method POST
@access public
*/

router.post("/register", asyncHandler(async (req, res) => {
    const { error } = validateRegisterUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ message: "User already registered" });
    }

    const salt = await bcrypt.genSalt(10);

    // const token = null;
    req.body.password = await bcrypt.hash(req.body.password, salt);


    user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
    });


    const result = await user.save();
    res.status(201).json(result);
}));


/** 
@desc: Login User
@route /api/auth/login
@method POST
@access public
*/

router.post("/login", asyncHandler(async (req, res) => {
    const { error } = validateLoginUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({ message: "Invalid email " });
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isPasswordMatch) {
        return res.status(400).json({ message: "Invalid password " });
    }
    // const token = null;
    res.status(200).json(user);
}));



module.exports = router;