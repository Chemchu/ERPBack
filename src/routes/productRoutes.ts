const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productoController');

router.get('/', ProductController.findAll);
router.get('/producto/:id', ProductController.findOne);
router.put('/producto/add/:id', ProductController.create);
router.put('/producto/update/:id', ProductController.update);
router.delete('/producto/remove/:id', ProductController.delete);

export default router;