const EmployeeController = require('../controllers/employeeController');
const express = require('express');
const employeeRouter = express.Router();

employeeRouter.get('/', EmployeeController.findAll);
employeeRouter.get('/:id', EmployeeController.find);
employeeRouter.put('/add/:id', EmployeeController.create);
employeeRouter.put('/update/:id', EmployeeController.update);
employeeRouter.delete('/remove/:id', EmployeeController.delete);

export default employeeRouter;