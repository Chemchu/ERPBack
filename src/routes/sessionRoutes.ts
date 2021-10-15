const express = require('express');
const sessionRouter = express.Router();
const SessionController = require('../controllers/sessionController');

sessionRouter.post('/authenticate', SessionController.authenticate);
sessionRouter.post('/logout', SessionController.logout);
sessionRouter.post('/restoreSession', SessionController.restoreSession);

export default sessionRouter;