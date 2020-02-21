var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Nested = new Schema({
    _id:      Number,
    name:     String,
    sections:    Array,
    complete: Boolean

}, {collection: 'nested_action'});

module.exports = mongoose.model('nested', Nested );