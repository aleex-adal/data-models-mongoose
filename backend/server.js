const express = require('express')
const bodyParser= require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/data_model', {useNewUrlParser: true, useUnifiedTopology: true});
var flat = mongoose.connection;

flat.on('error', console.error.bind(console, 'connection error:'));
flat.once('open', function() {
  app.listen(8080, () => {
    console.log('listening on port 8080')
  })
});

const routes = require('./routes')
app.use('/', routes)