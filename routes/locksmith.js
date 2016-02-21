// ReSharper disable once UnusedLocals
var mongoose = require("mongoose");

// ReSharper disable once CommonJsExternalModule
var lockSmith = require('../model/locksmith');

// ReSharper disable once CommonJsExternalModule
var ioManager = require("../generalmanager");

var GeoPoint = require('geopoint');
var GeoJSON = require('geojson');

// Müsait çilingirleri getir
function availableLocksmiths(req, res) {
    var long = req.query.long;
    var lat = req.query.lat;
    var distance = req.query.dictance;

    // ReSharper disable once InconsistentNaming
    lockSmith.find({
        isAvailable: true,
        isDeleted: false,
        loc: {
            '$near': {
                '$maxDistance': distance * 1000,
                '$geometry': {
                    type: 'Point', coordinates: [long, lat]
                }
            }
        }
    }).exec(function (err, users) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json({ 'list': users });
        }
    });
}

//çilingir müsaitliğini değitir,var olan değerinin tersini alır
function changeAvailable(req, res) {
    var id = req.body.id;

    // ReSharper disable once InconsistentNaming
    lockSmith.findById(id).exec(function (err, _lockSmith) {
        _lockSmith.isAvailable = !_lockSmith.isAvailable;
        _lockSmith.save(function (err) {
            if (err) {
                res.status(500).json(err);
            } else {
                //çilingirin müsaitliğini değiştiği zaman müsaitlik durumunu tetikleyen socket'e haber ver
                ioManager.emit_messsage("load_availableLocksmiths");
                res.json();
            }
        });
    });
}

//çilingir lokasyonu değiştiğinde pozisyon bilgileri güncellenir
function changePosition(req, res) {
    var id = req.body.id;
    var lat = parseFloat(req.body.lat);
    var lon = parseFloat(req.body.lon);

    // ReSharper disable once InconsistentNaming
    lockSmith.findById(id).exec(function (err, _lockSmith) {
        _lockSmith.lat = lat;
        _lockSmith.long = lon;
        _lockSmith.loc = { type: 'Point', coordinates: [lon, lat] };

        _lockSmith.save(function (err) {
            if (err) {
                res.status(500).json(err);
            } else {
                //çilingirin lokasyonu değiştiği zaman, müsaitlik durumunu tetikleyen socket'e haber ver
                ioManager.emit_messsage("load_availableLocksmiths");
                res.json();
            }
        });
    });
}

// ReSharper disable once CommonJsExternalModule
exports.list = availableLocksmiths;

// ReSharper disable once CommonJsExternalModule
exports.changeAvailable = changeAvailable;

// ReSharper disable once CommonJsExternalModule
exports.changePosition = changePosition;
//# sourceMappingURL=locksmith.js.map
