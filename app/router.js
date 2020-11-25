var express = require("express");
const app = new express.Router();
const Auth = require('./middlewares/Auth');
const UserRoutes = require('./routes/user');

app.use('/',Auth.clientAuth,UserRoutes)

module.exports = app