const express = require('express');
const saleRouter = express.Router();
const SaleController = require('../controllers/saleController');

saleRouter.get('/', SaleController.findAll);
saleRouter.get('/estado', SaleController.getState);
saleRouter.get('/:id', SaleController.find);
saleRouter.put('/add', SaleController.create);
saleRouter.put('/update/:id', SaleController.update);
saleRouter.delete('/remove/:id', SaleController.delete);

export default saleRouter;