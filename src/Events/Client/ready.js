const EventBase = require('../../Structurs/EventBase');

class EventReady extends EventBase {
    async run(client) {
        console.log(`the bot is online`);
    }
}

module.exports = EventReady;