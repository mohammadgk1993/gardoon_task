const multer = require("multer");


const uploadStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
});

const upload = multer({ 
    storage: uploadStorage,
 });

 module.exports = { upload }