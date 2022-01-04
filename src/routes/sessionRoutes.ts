const express = require('express');
const sessionRouter = express.Router();
const SessionController = require('../controllers/sessionController');

sessionRouter.post('/authenticate', SessionController.authenticate);

export default sessionRouter;