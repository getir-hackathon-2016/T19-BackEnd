// ReSharper disable once UnusedLocals
var mongoose = require("mongoose");

// ReSharper disable once CommonJsExternalModule
var order = require('../model/order');

function addOrder(req, res) {
    // ReSharper disable once InconsistentNaming
    var addingOrder = new order({
        lockSmithId: req.body.lockSmithId,
        deviceId: req.body.deviceId,
        nameSurname: req.body.nameSurname,
        phone: req.body.phone,
        adress: req.body.adress,
        lat: req.body.lat,
        lon: req.body.lon,
        orderDate: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        orderStatus: 1
    });

    addingOrder.save(function (err) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json();
        }
    });
}

// ReSharper disable once CommonJsExternalModule
// ReSharper disable once CommonJsExternalModule
exports.addOrder = addOrder;
//# sourceMappingURL=order.js.map
