const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const productRouter = require("./routes/product.route.js");

app.use(express.json());
app.use(cors());

app.use("/api/v1/product", productRouter);

module.exports = app;
