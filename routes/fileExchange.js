const { body } = require("express-validator");
const { multerUploads } = require("../middleware/multer");
const mediumUploader = require("../controllers/MediumUpload");

const { Router } = require("express");

const router = Router();

router.post("/upload", multerUploads, mediumUploader.uploadMedium);

module.exports = router;
