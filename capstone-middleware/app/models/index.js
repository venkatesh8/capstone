const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require('./user.model');
db.role = require('./role.model');
db.dropdown = require('./dropdown.model');
db.candidates = require('./candidate.model');

// db.ROLES = ['user', 'admin', 'moderator'];

module.exports = db;
