"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongooseConnection = void 0;
var mongoose = require("mongoose");
var mongooseConnection = function () {
    mongoose.Promise = global.Promise;
    var mongoURI = process.env.MONGO_URI;
    var options = {
        minPoolSize: 1,
        maxPoolSize: 20,
        socketTimeoutMS: 60000,
        serverSelectionTimeoutMS: 60000,
        loggerLevel: 'error'
    };
    mongoose.connect(mongoURI, options);
    mongoose.connection.on('connecting', function () { return console.info('database connecting'); });
    mongoose.connection.on('connected', function () { return console.info('database connected'); });
    mongoose.connection.on('disconnecting', function () { return console.info('database disconnecting'); });
    mongoose.connection.on('disconnected', function () { return console.info('database disconnected'); });
    mongoose.connection.on('error', function () { return console.error('database error'); });
};
exports.mongooseConnection = mongooseConnection;
