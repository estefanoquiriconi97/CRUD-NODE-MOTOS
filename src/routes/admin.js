const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');


const controllersAdmin = require('../controllers/controllersAdmin');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../../public/images/motos')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, 'moto' + Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({ storage: storage })

router.get('/administrar', controllersAdmin.index);
router.get('/administrar/create', controllersAdmin.create);




module.exports  = router;
