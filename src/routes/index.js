"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dbConfig = require("../config/db.config.js");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var db = {
    url: String
};
db.url = dbConfig.url;
module.exports = db;
