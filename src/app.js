const express = require("express");
const routes = require("./routes");
require("dotenv").config();
const app = express();
const { PORT } = process.env;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "api running !!" });
});

app.use("/", routes); // localhost:<PORT>

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
