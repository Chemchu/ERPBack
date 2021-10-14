const express = require('express');
const prodRouter = express.Router();
const ProductController = require('../controllers/productoController');

prodRouter.get('/', ProductController.findAll);
prodRouter.get('/:id', ProductController.find);
prodRouter.put('/add/:id', ProductController.create);
prodRouter.put('/update/:id', ProductController.update);
prodRouter.delete('/remove/:id', ProductController.delete);

export default prodRouter;