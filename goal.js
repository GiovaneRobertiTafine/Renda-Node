var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var goalSchema = new Schema(
    {
        name: String,
        value: Number,
        priority: Number,
    },
    { versionKey: false }
);

module.exports = mongoose.model('Goal', goalSchema);
