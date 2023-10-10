const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
})

const upload = multer({
    storage: multerConfig,
    fileFilter: function (req, file, cbk) {
      if (file.mimetype.startsWith('image/')) {
        cbk(null, true);
      } else {
        throw HttpError(400, "Please upload images only");
      }
    }
})

module.exports = upload;