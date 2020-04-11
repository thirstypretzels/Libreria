const express = require("express");
const connectDB = require("./config/db");

const app = express();

//Connect Database
connectDB();

// Init Middleware
app.use(express.json());

app.get("/", (req, res) => res.send("API Running"));

// Define routes
app.use("/api/books", require("./routes/api/books"));
app.use("/api/users", require("./routes/api/user"));
app.use("/api/comment", require("./routes/api/comment"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
