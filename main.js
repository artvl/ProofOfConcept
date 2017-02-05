var express = require('express');

var mailSender = require('./mailSender');

var app = express();
var path    = require("path");

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
    res.send('hello world');
});

app.get('/1', function(req, res) {
    res.sendFile(path.join(__dirname+'/simpleviewer.html'))
});

app.get('/mailto' , function (req, res) {
    mailSender.sendMsg("hi")
    res.send('Thx')
})

app.use('/src/', express.static(__dirname + '/src/'));
app.use('/scripts/pdfjs-dist/', express.static(__dirname + '/node_modules/pdfjs-dist/'));


app.listen("8088");
