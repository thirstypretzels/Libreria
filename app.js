const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();

const bookRoutes = require("./routes/api/books");
// const cartRoutes = require("./routes/api/carts");
const userRoutes = require("./routes/api/user");
// const orderRoutes = require("./routes/api/orders");
const commentRoutes = require("./routes/api/comment");

app.get("/", (req, res) => res.send("API Running"));

app.use(cors());
app.use(express.json());

app.use("/book", bookRoutes);
app.use("/user", userRoutes);
app.use("/comment", commentRoutes);
// app.use("/cart", cartRoutes);
// app.use("/order", orderRoutes);
app.use((req, res, next) => {
  res.status(404).json({
    message: "Not Found"
  });
});

module.exports = app;
