const dbConfig = require("../config/db.config.js");
import mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = 
{
    url : String
};
//db.mongoose = mongoose;
db.url = dbConfig.url;
//db.productos = require("./producto.model.js")(mongoose);

module.exports = db;