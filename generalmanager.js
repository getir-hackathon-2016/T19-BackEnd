var io;
function initIO(server) {
    io = require("socket.io")(server);

    io.on('connection', function (socket) {
        socket.on('load_availableLocksmiths', function () {
            io.emit('load_availableLocksmiths');
        });
    });
}

function emit_messsage(msg) {
    io.emit(msg);
}

module.exports._initIO = initIO;
module.exports._io = io;
module.exports.emit_messsage = emit_messsage;
//# sourceMappingURL=generalmanager.js.map
