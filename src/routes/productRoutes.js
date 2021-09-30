"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const ProductosController = require('../controllers/productoController');
router.get('/', ProductosController.findAll);
router.get('/:id', ProductosController.findOne);
router.put('/add/:id', ProductosController.create);
router.put('/update/:id', ProductosController.update);
router.delete('/remove/:id', ProductosController.delete);
exports.default = router;