const multer = require('multer');
const path = require('path');
const { randomUUID } = require('crypto');
// Set storage engine
const storage = multer.diskStorage({
  destination: './src/static/photos',
  filename: function(req, file, cb) {
    
    const filename = randomUUID() + '_'+Date.now()
    cb(null, filename+path.extname(file.originalname))
  }
});

// Init upload

// Check file type
function checkFileType(file, cb) {
  // Allowed ext
  if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
    cb(null, true);
} else {
    cb(null, false);
    const err = new Error('Only .png, .jpg and .jpeg format allowed!');
    err.code = 'LIMIT_FILE_TYPES';
    return cb(err);
}
}
const multerMiddleware = multer({
    storage: storage,
    limits: {fileSize: 1000000}, // limit file size if needed
    fileFilter: function(req, file, cb) {
      checkFileType(file, cb);
    }
  }).array('file', 10);

  
module.exports = multerMiddleware