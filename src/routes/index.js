const app = require("express");
const router = app.Router();
const categoryRouter = require("./category");
const bookRouter = require("./book");
const studentRouter = require("./student");
const transactionRouter = require("./transaction");

router.use("/category", categoryRouter);
router.use("/book", bookRouter);
router.use("/student", studentRouter);
router.use("/transaction", transactionRouter);

module.exports = router;
