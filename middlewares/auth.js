const { User } = require("../database/models/user")
const { AppError } = require("../utils/types")

const isAdmin = async (req, res, next) => {
    if (!!req.session.user && req.session.user == "admin") {
        return next()
    } else {
        return next(new AppError("access denied", 403))
    }
}

module.exports = { isAdmin }