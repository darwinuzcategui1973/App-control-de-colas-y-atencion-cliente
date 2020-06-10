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


    cliente.emit("estadoActual", {

        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4(),
        mensaje: "estado actual enviado por el servidor"

    });
    // atenderClienteTicket
    cliente.on('atenderClienteTicket', (data, callback) => {

        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es Necesario'
            });

        }

        let atenderTicket = ticketControl.atentederClienteDeTicket(data.escritorio);
        callback(atenderTicket);
        // actulizar o notificar cambio en los ultimos 4

        cliente.broadcast.emit("ultimo4Atendido", {
            ultimos4: ticketControl.getUltimos4()
        });


    });


});