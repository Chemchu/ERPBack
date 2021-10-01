const express = require('express');
const prodRouter = express.Router();
const ProductController = require('../controllers/productoController');

prodRouter.get('/', ProductController.findAll);
prodRouter.get('/producto/:id', ProductController.findOne);
prodRouter.put('/producto/add/:id', ProductController.create);
prodRouter.put('/producto/update/:id', ProductController.update);
prodRouter.delete('/producto/remove/:id', ProductController.delete);

export default prodRouter;