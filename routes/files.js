const express = require("express");
const router = express.Router();
const { requestHandler } = require("../services/request.handler");
const { upload } = require("../utils/multer")
const { isAdmin } = require("../middlewares/auth");
const { createFileValidator, downloadFileValidator, fileExistanceValidator } = require("../validators/fileValidator");
const { uploadFile, downloadFile, deleteFile, getAllFiles, updateFile } = require("../controllers/fileController");


router.get("/", requestHandler(getAllFiles))

router.post("/", upload.single('file'), createFileValidator, requestHandler(uploadFile));

router.get("/:id", fileExistanceValidator, downloadFileValidator, requestHandler(downloadFile))

router.patch("/:id", isAdmin, fileExistanceValidator, upload.single('file'), createFileValidator, requestHandler(updateFile))

router.delete("/:id", isAdmin, fileExistanceValidator, requestHandler(deleteFile))

module.exports = router;