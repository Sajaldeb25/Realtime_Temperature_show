$(function() {
    var socket = io.connect("http://localhost:3000");


    socket.on('temperature', function(temperature) {
       // console.log('a user connected');
      $("#termometer").val(temperature + "°C");
    });

    socket.on('temperature', function(temperature1) {
        // console.log('a user connected');
       $("#termometer1").val(temperature1 + "K");
     });

     socket.on('temperature', function(temperature2) {
        // console.log('a user connected');
       $("#termometer2").val(temperature2 + "°F");
     });

});