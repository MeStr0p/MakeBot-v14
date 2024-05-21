const EventBase = require('../../Structurs/EventBase');

class EventReady extends EventBase {
    async run(client) {
        console.log(`[LOGGED] BOT -> ${client.user.username}`);
    }
}

module.exports = EventReady;