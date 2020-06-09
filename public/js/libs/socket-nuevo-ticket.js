// console.log('llamo nuevo ticket');
// el comando para establece la conexion activa con el servidor
var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('conectado al servidor');
});
// detectar que mi servidor se deconecto
//(.on) on son para escuchar evento y los emit para enviar informacion
socket.on('disconnect', function() {
    console.log('perdimos conexion con el servidor');
});

socket.on('estadoActual', function(respuesta) {
    console.log(respuesta);

    label.text(respuesta.actual);

});

// estos es jquery
//que le digo que hace al boton 
$('button').on('click', function() {

    console.log('clicked');
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);


    });


});