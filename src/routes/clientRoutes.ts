const express = require('express');
const clientRouter = express.Router();
const ClientController = require('../controllers/clientController');

clientRouter.get('/', ClientController.findAll);
clientRouter.get('/:id', ClientController.findOne);
clientRouter.put('/add/:id', ClientController.create);
clientRouter.put('/update/:id', ClientController.update);
clientRouter.delete('/remove/:id', ClientController.delete);

export default clientRouter;