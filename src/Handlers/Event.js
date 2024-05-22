const fs = require('fs');
const EventBase = require('../Structurs/EventBase');
const HandlerBase = require("../Structurs/HanderBase");

class EventHandler extends HandlerBase {
    constructor(client) {
        super(client);
        this.client = client;
    };

    async execute() {
        fs.readdirSync('./src/Events').forEach(subfolder => {
            fs.readdirSync(`./src/Events/${subfolder}`)
            .filter(file => file.endsWith('.js'))
            .forEach(file => {
                const name = file.replace('.js', '');
                
                try {
                    const event = require(`../Events/${subfolder}/${file}`);
                    if (!(event.prototype instanceof EventBase)) return;

                    const newEvent = new event();


                    this.client.emit('logs', `[HANDLER] => ${name}`)

                    
                    newEvent.once ? this.client.once(name, (...args) => newEvent.run(...args, this.client)) : this.client.on(name, (...args) => newEvent.run(...args, this.client));
                } catch(err) {
                    console.log(err);
                }
               
            });
        });
    };
}

module.exports = EventHandler;