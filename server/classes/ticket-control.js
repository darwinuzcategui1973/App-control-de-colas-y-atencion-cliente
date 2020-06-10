const fs = require('fs');

// vamos a trabar con clases para que la logica quede mejor
// clases que controla los ticket
//

class _Ticket {

    constructor(numero, escritorio) {

        this.numero = numero;
        this.escritorio = escritorio;
    }



}


class TicketControl {

    // todas clases es buenas pratica que lleve su contructor
    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4tickets = [];


        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4tickets = data.ultimos4tickets;
            console.log(this.ultimos4tickets);

        } else {
            this.reiniciarConteo();

        }



    }

    // para los metodos

    siguientePorAtender() {

        this.ultimo += 1;
        // creamos la instalacia del ticket

        let ticket = new _Ticket(this.ultimo, null);
        // ahorra agregamos los ticket al arreglo de ticket por antender
        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;

    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;

    }

    getUltimos4() {
        return this.ultimos4tickets;

    }


    atentederClienteDeTicket(escritorio) {
        if (this.tickets.length == 0) {
            return 'No hay Cliente(s) con Ticket por Atender';
        }

        // voy a obtener el primer cliente con ticket en espera
        let numeroTicketPendiente = this.tickets[0].numero;
        this.tickets.shift(); // elimino con shift el primer elemento

        let atenderTicket = new _Ticket(numeroTicketPendiente, escritorio);
        console.log(atenderTicket);
        console.log(this.ultimos4tickets);



        this.ultimos4tickets.unshift(atenderTicket);
        console.log(this.ultimos4tickets);
        // unshift lo agregamos al inicio del arreglo

        if (this.ultimos4tickets.length > 4) {
            this.ultimos4tickets.splice(-1, 1);
            // elimino el ultimo elemento de un arreglo

        }
        console.log('ultimos 4 ticket');
        console.log(this.ultimos4tickets);
        this.grabarArchivo();

        return atenderTicket;


    }

    reiniciarConteo() {

        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4tickets = [];

        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();

    }

    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4tickets: this.ultimos4tickets
        }

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);
        console.log('Se grabo en archivo');

    }

}


module.exports = {

    TicketControl
}