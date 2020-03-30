var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recordSchema = new Schema({
    name: String,
    value: Number,
    type: String,
    charge: {},
    month: String,
    categorie: { type: mongoose.Schema.Types.ObjectId, ref: 'Categorie'}
}, {versionKey: false});

module.exports = mongoose.model("Record", recordSchema);