const EventEmitter = require('events');






const Logger = require('./logger');
const logger = new Logger();
// Register a listener
logger.on('message', e => {
    console.log('listener call', e);
});
logger.log('message')