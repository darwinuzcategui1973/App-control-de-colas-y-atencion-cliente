// console.log('llamo nuevo ticket');
// el comando para establece la conexion activa con el servidor
var socket = io();

socket.on('connect', function() {
    console.log('conectado al servidor');
});
// detectar que mi servidor se deconecto
//(.on) on son para escuchar evento y los emit para enviar informacion
socket.on('disconnect', function() {
    console.log('perdimos conexion con el servidor');
});

var searchParams = new URLSearchParams(window.location.search);
var label = $('small');
console.log(searchParams.has('escritorio'));
if (!searchParams.has('escritorio')) {

    window.location = 'index.html';
    throw new Error(' El Escitorio es Necesario!');
}

var escritorio = searchParams.get('escritorio');
console.log(escritorio);
$('h1').text('Escritorio: ' + escritorio);

$('button').on('click', function() {

    socket.emit('atenderClienteTicket', {
        escritorio: escritorio
    }, function(resp) {

        console.log(resp);

    });

});