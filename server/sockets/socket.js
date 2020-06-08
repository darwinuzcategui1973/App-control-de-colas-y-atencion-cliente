const { io } = require('../server')
const { TicketControl } = require('../classes/ticket-control')
    // para conocer que cliente esta conectado

const ticketControl = new TicketControl();

io.on('connection', (cliente) => {



    cliente.on("siguienteTicket", (data, callback) => {
        let siguiente = ticketControl.siguientePorAtender();

        console.log('ticket', siguiente);
        callback(siguiente);


    });




});