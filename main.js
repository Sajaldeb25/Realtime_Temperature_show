var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index_temp.html');
  });

http.listen(3000, function(){
   console.log('http://localhost:3000');
});

var five = require('johnny-five'), arduino = five.Board();
var temperature, light_pin_led;

io.on('connection', function(socket){
  socket.on('light_status', function(state) {
    //console.log('Light_status is: ' + state);
    light_pin_led.toggle();
  });

  console.log(socket.connected);
  io.sockets.emit('c_msg','Connected');
  
  console.log(socket.disconnected);
});


arduino.on('ready', function() {
    temperature = new five.Thermometer({
		controller: 'LM35',
		pin: 'A0'
    });
    
    light_pin_led = new five.Led(13);
    light_pin_led.off();
    
    temperature.on("data", function () {
        io.sockets.emit('temperature', this.celsius);
        io.sockets.emit('temperature1', this.kelvin);
        io.sockets.emit('temperature2', this.fahrenheit);
      //console.log('temperature in Cel: ' + this.celsius);
      //  console.log('temperature in kel: ' + this.kelvin);
      //  console.log('temperature in Fer: ' + this.fahrenheit);
      //  console.log('--------------------------------------');
    });

});