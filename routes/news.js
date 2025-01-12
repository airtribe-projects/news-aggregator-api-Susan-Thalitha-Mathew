const express = require('express');
const router = express.Router();
const News = require("../models/news");
const Preference = require("../models/preference");
const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const token = req.headers["authorization"];
    if (token) {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        console.log(decodedToken);
        next();
    } else res.status(403).send({
        message: "Invalid token"
    })
};

router.use(verifyJWT);

router.get("/api/v1/news", async (req, res) => {
    if (req.user) {
        const news = await News.find();
        res.send(news);
    } else {
        res.status(403).send({
            message: "Unauthorized user"
        });
    }
});

router.post("/users/preferences", async (req, res) => {
    if (req.user) {
        const preference = req.body;
        preference.email = req.user.email;
        const dbPreference = await Preference.create(preference);
        return res.status(201).json(dbPreference);
    } else
        res.status(403).send({
            message: "Unauthorized user"
        });
});
router.get("/users/preferences", async (req, res) => {
    if (req.user) {
        const email = req.user.email;
        const dbPreference = await Preference.findOne({email});
        return res.status(201).json(dbPreference);
    } else
        res.status(403).send({
            message: "Unauthorized user"
        });
})

module.exports = router;