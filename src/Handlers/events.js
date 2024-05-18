const fs = require('fs');

class EventHandler {
    constructor(client) {
        this.client = client;
    };

    laod() {
        console.log('[HANDLER] => CARREGANDO EVENTOS:');

        fs.readdirSync('./src/Events').forEach(subfolder => {
            fs.readdirSync(`/src/Events/${subfolder}`)
            .filter(file => file.endsWith('.js'))
            .forEach(file => {
                try {
                    const event = new (require(`../Events/${subfolder}/${file}`));

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