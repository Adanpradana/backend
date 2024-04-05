const Router = require("express").Router();
const controller = require("../controller/book");

Router.post("/", controller.createBook);
Router.get("/", controller.getBook);
Router.get("/:id", controller.getBookById);
Router.put("/:id", controller.getBook);
Router.delete("/:id", controller.getBook);

module.exports = Router;
