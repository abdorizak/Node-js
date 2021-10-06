const EventEmitter = require('events');

var url = 'http://mylogger.io/log'

class Logger extends EventEmitter {

     log(message) {
        // send an http request
        console.log(message)
    // maing noise or  produce something 
    this.emit('message', {id: 1, url: 'http://'});
    }
}



module.exports = Logger;
