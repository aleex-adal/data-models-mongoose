var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Section = new Schema({
    _id:      Number,
    name:     String,
    tasks:    Array,
    complete: Boolean

}, {collection: 'section'});

module.exports = mongoose.model('section', Section );