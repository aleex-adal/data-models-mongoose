var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Action = new Schema({
    _id:      Number,
    name:     String,
    sections:    Array,
    complete: Boolean

}, {collection: 'action'});

module.exports = mongoose.model('action', Action );