const express = require('express');
const router = express.Router();

const controllersAdmin = require('../controllers/controllersAdmin');
const upload = require('../middlewares/multerMoto');


router.get('/administrar', controllersAdmin.index);

router.get('/administrar/create', controllersAdmin.create);
router.post('/administrar/create',upload.single('imagen'), controllersAdmin.store);

router.get('/administrar/detail/:id', controllersAdmin.detail);

router.get('/administrar/edit/:id', controllersAdmin.edit);
router.put('/administrar/edit/:id', upload.single('imagen'), controllersAdmin.update);

router.get('/administrar/delete/:id', controllersAdmin.destroy);

module.exports  = router;
