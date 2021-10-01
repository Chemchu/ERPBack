const express = require('express');
const saleRouter = express.Router();
const SaleController = require('../controllers/saleController');

saleRouter.get('/', SaleController.findAll);
saleRouter.get('/venta/:id', SaleController.findOne);
saleRouter.put('/venta/add/:id', SaleController.create);
saleRouter.put('/venta/update/:id', SaleController.update);
saleRouter.delete('/venta/remove/:id', SaleController.delete);

export default saleRouter;