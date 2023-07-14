const express = require("express");
const router = express.Router();
const { requestHandler } = require("../services/request.handler");
const { upload } = require("../utils/multer")
const { isAdmin } = require("../middlewares/auth");
const { createFileValidator, downloadFileValidator, fileExistanceValidator } = require("../validators/fileValidator");
const { uploadFile, downloadFile, deleteFile, getAllFiles, updateFile } = require("../controllers/fileController");


router.get("/", getAllFiles)

router.post("/", createFileValidator, upload.single('file'), uploadFile);

router.get("/:id", fileExistanceValidator, downloadFileValidator, downloadFile)

router.patch("/:id", isAdmin, fileExistanceValidator, createFileValidator, upload.single('file'), updateFile)

router.delete("/:id", isAdmin, fileExistanceValidator, deleteFile)


module.exports = router;