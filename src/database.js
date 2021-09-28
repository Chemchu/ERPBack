"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongooseConnect = void 0;
var mongoose = require("mongoose");
var mongooseConnect = function () {
    mongoose.Promise = global.Promise;
    var options = {
        minPoolSize: 1,
        maxPoolSize: 20,
        socketTimeoutMS: 60000,
        serverSelectionTimeoutMS: 60000,
        loggerLevel: 'error'
    };
    mongoose.connect(process.env.MONGO_URI, options);
    mongoose.connection.on('connecting', function () { return console.info('database connecting'); });
    mongoose.connection.on('connected', function () { return console.info('database connected'); });
    mongoose.connection.on('disconnecting', function () { return console.info('database disconnecting'); });
    mongoose.connection.on('disconnected', function () { return console.info('database disconnected'); });
    mongoose.connection.on('error', function () { return console.error('database error'); });
};
exports.mongooseConnect = mongooseConnect;
