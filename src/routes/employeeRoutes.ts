const express = require('express');
const employeeRouter = express.Router();
const ProductController = require('../controllers/productoController');

employeeRouter.get('/', ProductController.findAll);
employeeRouter.get('/:id', ProductController.find);
employeeRouter.put('/add/:id', ProductController.create);
employeeRouter.put('/update/:id', ProductController.update);
employeeRouter.delete('/remove/:id', ProductController.delete);

export default employeeRouter;