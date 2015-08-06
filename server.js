// server.js
// load the things we need
var express = require('express');
var app = express();
var Wearable = require('../lib/wearable'),
    kit = new Wearable({
      name: 'wV3_0E003949'
    });
var zaxis;
// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// Find for the kit
kit.findWearable();


// After kit connected
kit.on('connected', function () {
  console.log("Connected to the kit");
  console.log('--------------------');

  setInterval(function () {
    kit.accelerometer();
  }, 1000);
});

kit.on('data:accelerometer-z', function (data) {
    zaxis = data;
});

kit.on('data:accelerometer-z', function (data) {
    zaxis = data;
});

kit.on('data:accelerometer-z', function (data) {
    //console.log("Eixo Z: %d",data);
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


// index page 

app.get('/', function(req, res) {
    
    var n = zaxis.toString();

    res.render('pages/index', {
        n: n
    });
});

// about page 
app.get('/about', function(req, res) {
    res.render('pages/about');
});

app.listen(8080);
console.log('--------------------');
console.log('Server initialized at port 8080');
console.log('--------------------');
