const Router = require("express").Router();
const controller = require("../controller/transaction");

Router.post("/", controller.createTransaction);
Router.get("/", controller.getTransaction);

module.exports = Router;
