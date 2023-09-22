var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");
var path = require("path");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('./src/index.html');
});



app.get("/global", function (req, res) {

    var filePath = path.join(__dirname, "src/pages/global/global.html");
    res.sendFile(filePath);
});

app.get("/calculator", function (req, res) {
    var filePath = path.join(__dirname, "src/pages/calculator/calculator.html");
    res.sendFile(filePath);
});
app.get("/game", function (req, res) {
    var filePath = path.join(__dirname, "src/pages/game/game.html");
    res.sendFile(filePath);
});
app.get("/time", function (req, res) {
    var filePath = path.join(__dirname, "src/pages/timer/timer.html");
    res.sendFile(filePath);
});
app.get("/dictaphone", function (req, res) {
    var filePath = path.join(__dirname, "src/pages/dictaphone/dictaphone.html");
    res.sendFile(filePath);
});
app.get("/audio", function (req, res) {
    var filePath = path.join(__dirname, "src/pages/audio/audio.html");
    res.sendFile(filePath);
});



app.use('/assets/css', express.static(__dirname + '/assets/css', { 'extensions': ['css'] }));
app.use('/assets/scripts', express.static(__dirname + '/assets/scripts', { 'extensions': ['js'] }));
app.use((req, res, next) => {
    res.status(404).send("File not found");
});



server.listen(3000, function () {
    console.log('Server is running on http://localhost:3000');
});
