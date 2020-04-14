const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//mongoose.connect('mongodb+srv://mllanes19:mllanes19@cluster0-tehc9.mongodb.net/test?retryWrites=true&w=majority');

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect("mongodb+srv://mllanes19:mllanes19@cluster0-tehc9.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const bookRoutes = require('./routes/api/books');
const cartRoutes = require('./routes/api/carts');
const userRoutes = require('./routes/api/users');
const orderRoutes = require('./routes/api/orders');

app.use('/books', bookRoutes);
app.use('/users', userRoutes); 
app.use('/carts', cartRoutes);
app.use('/orders', orderRoutes);
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Not Found'
    })
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});