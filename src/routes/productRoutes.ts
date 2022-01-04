const express = require('express');
const prodRouter = express.Router();
const ProductController = require('../controllers/productoController');

prodRouter.get('/', ProductController.findAll);
prodRouter.get('/estado', ProductController.getState);
prodRouter.get('/:id', ProductController.find);
prodRouter.post('/:id', ProductController.createMany);
prodRouter.post('/add/', ProductController.create);
prodRouter.post('/update/:id', ProductController.update);
prodRouter.delete('/remove/:id', ProductController.delete);

export default prodRouter;