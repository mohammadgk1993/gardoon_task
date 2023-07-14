const express = require("express");
const fileRouter = require("./files")
const userRouter = require("./users")
const router = express.Router();

router.get("/", (req,res,next) => res.send("hello").status(200))

router.use("/file", fileRouter)
router.use("/user", userRouter)

module.exports = router;
