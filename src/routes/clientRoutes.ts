const express = require('express');
const clientRouter = express.Router();
const ClientController = require('../controllers/clientController');

clientRouter.get('/', ClientController.findAll);
clientRouter.get('/estado', ClientController.getState);
clientRouter.get('/:id', ClientController.find);
clientRouter.post('/add/', ClientController.create);
clientRouter.post('/update/:id', ClientController.update);
clientRouter.delete('/remove/:id', ClientController.delete);

export default clientRouter;