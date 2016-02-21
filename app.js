var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://getir_db:123123@ds062898.mongolab.com:62898/getir');

var locksmithroute = require('./routes/locksmith');
var orderroute = require('./routes/order');

// models
// ReSharper disable once CommonJsExternalModule
var locksmith = require('./model/locksmith');

// ReSharper disable once CommonJsExternalModule
var order = require('./model/order');

// all environments
app.set('port', process.env.PORT || 1337);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

var stylus = require('stylus');
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
    app.use(express.errorHandler());
}

//Müsait cilingirleri getir
app.get('/AvailableLocksmiths', locksmithroute.list);

//Çilingirin müsaitlik durumunu değiştir
app.post('/ChangeAvailable', locksmithroute.changeAvailable);

//Çilingirin pozisyonunu değiştir
app.post('/ChangePosition', locksmithroute.changePosition);

//Sipariş Ekle
app.post('/AddOrder', orderroute.addOrder);
//# sourceMappingURL=app.js.map


var server = http.createServer(app);

//socket.io singleton
// ReSharper disable once CommonJsExternalModule
var ioManager = require("./generalmanager");
ioManager._initIO(server);

server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

//app.get('/', routes.index);
//socket.io test için yapıldı
app.get('/', function (req, res) {
    res.sendfile('index.html', { root: __dirname });
});