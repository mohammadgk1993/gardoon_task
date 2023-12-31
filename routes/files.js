const express = require("express");
const router = express.Router();
const { requestHandler } = require("../services/request.handler");
const { upload } = require("../utils/multer")
const { isAdmin } = require("../middlewares/auth");
const { createFileValidator, downloadFileValidator, fileExistanceValidator } = require("../validators/fileValidator");
const { uploadFile, downloadFile, deleteFile, getAllFiles, updateFile } = require("../controllers/fileController");


router.get("/", requestHandler(getAllFiles))

router.post("/", createFileValidator, upload.single('file'), requestHandler(uploadFile));

router.get("/:id", fileExistanceValidator, downloadFileValidator, requestHandler(downloadFile))

router.patch("/:id", isAdmin, fileExistanceValidator, createFileValidator, upload.single('file'), requestHandler(updateFile))

router.delete("/:id", isAdmin, fileExistanceValidator, requestHandler(deleteFile))

module.exports = router;