"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const sessionRouter = express.Router();
const SessionController = require('../controllers/sessionController');
sessionRouter.post('/authenticate', SessionController.authenticate);
exports.default = sessionRouter;
