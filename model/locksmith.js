var mongoose = require('mongoose');

var lockSmithSchema = mongoose.Schema({
    identityNo: String,
    officeName: String,
    name: String,
    surname: String,
    isDeleted: Boolean,
    isAvailable: Boolean,
    lat: Number,
    long: Number,
    loc: {
        type: { type: String }, coordinates: []
    }
});

lockSmithSchema.index({ loc: '2dsphere' });

var lockSmith = mongoose.model('LockSmith', lockSmithSchema);

module.exports = lockSmith;
//# sourceMappingURL=locksmith.js.map
