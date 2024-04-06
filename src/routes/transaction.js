const Router = require("express").Router();
const controller = require("../controller/transaction");

Router.post("/", controller.createTransaction);

module.exports = Router;
