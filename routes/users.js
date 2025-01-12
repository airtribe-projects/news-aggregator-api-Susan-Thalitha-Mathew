const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");


router.post("/api/v1/user/register", async (req, res) => {
    const user = req.body;
    user.password = await bcrypt.hash(user.password, 10);
    const dbUser = await User.create(user);
    return res.status(201).json(dbUser);
});

router.post("/api/v1/user/login", async (req, res) => {
    const {
        email,
        password
    } = req.body;
    const dbUser = await User.findOne({
        email
    });
    if (!dbUser)
        return res.status(400).json({
            message: "Invalid user credentials"
        });
    const isPwdValid = await bcrypt.compare(password, dbUser.password);
    if (!isPwdValid)
        return res.status(400).json({
            message: "Invalid user credentials"
        });
        var token = jwt.sign(
        {email:dbUser.email},
        process.env.JWT_SECRET);
        res.send({token});

});

module.exports = router;