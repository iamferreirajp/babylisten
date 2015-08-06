var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});

var Wearable = require('../lib/wearable'),
    kit = new Wearable({
      name: 'wV3_0E003949'
    });

// Find for the kit
kit.findWearable();

// After kit connected
kit.on('connected', function () {
  console.log("Connected to the kit");

  setInterval(function () {
    kit.accelerometer();
    io.on('connection', function(socket){
  		socket.on('chat message', function(msg){
  	io.emit('chat message', data);
  });
});
  }, 1000);
});

kit.on('data:accelerometer-z', function (data) {
 console.log("Eixo Z: %d",data);
});

kit.on('data:accelerometer-z', function (data) {
 if(data >= 0 && data <= 40){
 	kit.ledON('RED');

 }
 else if(data < 0 && data >= -40){
 
 	kit.ledON('BLUE');
 }
 else{
 	kit.ledON('GREEN');
 }
});
// On bluetooth disconnect
kit.on('disconnected', function () {
  console.log('Disconnected from the wearable!');
});