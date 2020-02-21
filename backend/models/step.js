var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Step = new Schema({
    _id:      Number,
    name:     String,
    complete: Boolean

}, {collection: 'step'});

module.exports = mongoose.model('step', Step );