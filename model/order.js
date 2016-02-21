var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
    lockSmithId: String,
    deviceId: String,
    nameSurname: String,
    phone: String,
    adress: String,
    lat: Number,
    long: Number,
    orderDate: Date,
    orderStatus: Number,
    rate: Number,
    comment: String
});

var order = mongoose.model('Order', orderSchema);

module.exports = order;
//# sourceMappingURL=order.js.map
