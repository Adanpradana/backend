const Router = require("express").Router();
const controller = require("../controller/category");

Router.post("/", controller.createCategory);
Router.get("/", controller.getRefCategory);
Router.get("/:id", controller.getRefCategoryId);
Router.get("/reference", controller.getCategory);

module.exports = Router;
