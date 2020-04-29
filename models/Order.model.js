const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new mongoose.Schema({
    cart: {type: mongoose.Schema.Types.ObjectId, ref: 'Cart'},

    subtotal: {type: Number, required: true},

    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

    createDate: {type: Date, default: Date.now()},

    shipDate: {type: Date, default: Date.now()},

    status: {type: String}
});

const Orders  = mongoose.model("Orders", OrderSchema);

module.exports = Orders;