"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const saleRouter = express.Router();
const SaleController = require('../controllers/saleController');
saleRouter.get('/', SaleController.findAll);
saleRouter.get('/:id', SaleController.find);
saleRouter.post('/add', SaleController.create);
saleRouter.post('/update/:id', SaleController.update);
saleRouter.delete('/remove/:id', SaleController.delete);
exports.default = saleRouter;
