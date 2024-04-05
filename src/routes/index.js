const app = require("express");
const router = app.Router();
const categoryRouter = require("./category");
const bookRouter = require("./book");
const studentRouter = require("./student");

router.use("/category", categoryRouter);
router.use("/book", bookRouter);
router.use("/student", studentRouter);

module.exports = router;
