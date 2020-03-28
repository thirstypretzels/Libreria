const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb+srv://mllanes19:mllanes19@cluster0-tehc9.mongodb.net/test?retryWrites=true&w=majority');

const bookRoutes = require('./api/routes/books');
const cartRoutes = require('./api/routes/carts');
const userRoutes = require('./api/routes/users');
const orderRoutes = require('./api/routes/orders');

app.get("/", (req, res) => res.send("API Running"));

app.use(cors());
app.use(express.json());

app.use('/book', bookRoutes);
app.use('/user', userRoutes); 
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Not Found'
    })
})


module.exports = app;