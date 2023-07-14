const express = require("express");
const router = express.Router();
const { requestHandler } = require("../services/request.handler");
const { User } = require("../database/models/user");
const { AppError } = require("../utils/types");


router.get("/", async (req, res, next) => {
    if (!!req.session.user) {
        console.log(req.session.user)
    }
    const users = await User.findAll()
    res.status(200).json(users)
})

router.post("/", async (req, res, next) => {
    const { username, password } = req.body
    const user = await User.findOne({where : { username: username}})

    if (!user) {
        return next(new AppError("Invalid username or password", 403))
    }

    if (user.password !== password) {
        return next(new AppError("Invalid username or password", 403))
    }

    req.session.user = username

    return res.status(200).json({message: "successfully signed in"})
})

module.exports = router;