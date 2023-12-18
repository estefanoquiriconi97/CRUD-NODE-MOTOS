const multer = require('multer');
const path = require('path');

const controllersAdmin = require('../controllers/controllersAdmin');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../../public/images/motos'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, 'moto-' + Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({ storage: storage })

module.exports = upload;