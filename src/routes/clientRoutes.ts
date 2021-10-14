const express = require('express');
const clientRouter = express.Router();
const ClientController = require('../controllers/clientController');

clientRouter.get('/', ClientController.findAll);
clientRouter.get('/cliente/:id', ClientController.findOne);
clientRouter.put('/cliente/add/:id', ClientController.create);
clientRouter.put('/cliente/update/:id', ClientController.update);
clientRouter.delete('/cliente/remove/:id', ClientController.delete);

export default clientRouter;