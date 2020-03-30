var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var categorieSchema = new Schema({
    name: String,
}, {versionKey: false});

module.exports = mongoose.model("Categorie", categorieSchema);