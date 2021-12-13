const express = require('express');
const clientRouter = express.Router();
const ClientController = require('../controllers/clientController');

clientRouter.get('/', ClientController.findAll);
clientRouter.get('/:id', ClientController.find);
clientRouter.get('/estado', ClientController.getState);
clientRouter.put('/add/', ClientController.create);
clientRouter.put('/update/:id', ClientController.update);
clientRouter.delete('/remove/:id', ClientController.delete);

export default clientRouter;