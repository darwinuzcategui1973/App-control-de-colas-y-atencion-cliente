// console.log('llamo nuevo ticket');
// el comando para establece la conexion activa con el servidor
var socket = io();

// referencio el html
var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscrits = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];


socket.on('connect', function() {
    console.log('conectado al servidor');
});
// detectar que mi servidor se deconecto
//(.on) on son para escuchar evento y los emit para enviar informacion
socket.on('disconnect', function() {
    console.log('perdimos conexion con el servidor');
});

socket.on('estadoActual', function(data) {
    // console.log(data);
    actualHTML(data.ultimos4);
});

socket.on('ultimo4Atendido', function(data) {
    console.log("****** disparo el evento ultimo4Atendido", data);
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualHTML(data.ultimos4);
});

function actualHTML(ultimos4) {

    for (var index = 0; index <= ultimos4.length - 1; index++) {
        lblTickets[index].text('Ticket: ' + ultimos4[index].numero);
        lblEscrits[index].text('Escritorio: ' + ultimos4[index].escritorio);

    }



}