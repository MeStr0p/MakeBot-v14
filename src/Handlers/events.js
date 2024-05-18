const fs = require('fs');
const path = require('path');

class EventHandler {
    constructor(client) {
        this.client = client;
    };

    laod() {
        console.log('[HANDLER] => CARREGANDO EVENTOS:');

        const eventsPath = path.join(__dirname, '..', 'Events');

        fs.readdirSync(eventsPath).forEach(subfolder => {

            const eventsPathWithSub = path.join(__dirname, '..', 'Events', subfolder);
            
            fs.readdirSync(eventsPathWithSub)
            .filter(file => file.endsWith('.js'))
            .forEach(file => {
                try {
                    const event = new (require(`../events/${subfolder}/${file}`));

                    event.once ? 
                    this.client.once(event.EventName,  (...args) => event.execute(...args, this.client)) : 
                    this.client.on(event.EventName,  (...args) => event.execute(...args, this.client))
                } catch(err) {
                    console.log(err);
                }
               
            });
        });
    };
}

module.exports = EventHandler;