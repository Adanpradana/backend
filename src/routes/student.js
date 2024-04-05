const Router = require("express").Router();
const controller = require("../controller/student");

Router.post("/", controller.createStudent);
Router.get("/", controller.getStudent);
Router.get("/:id", controller.getStudentById);
Router.put("/:id", controller.updateStudent);
Router.delete("/:id", controller.removeStudent);

module.exports = Router;
