var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Task = new Schema({
    _id:      Number,
    name:     String,
    steps:    Array,
    complete: Boolean

}, {collection: 'task'});

module.exports = mongoose.model('task', Task );