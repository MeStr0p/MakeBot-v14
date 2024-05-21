const { 
    Client, 
    GatewayIntentBits, 
    Partials, 
    Collection
} = require('discord.js');
require('dotenv').config();
const fs = require('fs');
const EventHandlersBase  = require('./Structurs/EventHandlers');

class ClientExtends extends Client {
    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildEmojisAndStickers,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildIntegrations,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildModeration,
                GatewayIntentBits.GuildPresences,
                GatewayIntentBits.GuildWebhooks,
            ], 
            partials: [
                Partials.Channel,
                Partials.User,
                Partials.GuildMember,
                Partials.Message
            ],
            presence: {
				status: 'idle',
				activity: [{ 
                    name: 'TesteBots', 
                    type: 4 
                }],
			}
        });
        
        this.logsAwait = new Collection();
        this.SlashCommands = new Collection();
        this.Component;
        this.CollectionComponent = new Collection();

        this.owner = [''];
    }

    async login() {
        await super.login(process.env.TOKEN);

        await this.LoadAllHandlers();
    }


    async LoadAllHandlers() {
        fs.readdirSync('./src/Handlers')
        .filter(file => file.endsWith('.js'))
        .forEach(handler => {
            const Handler = require(`./Handlers/${handler}`);
            
            if(!(Handler.prototype instanceof EventHandlersBase)) return;

            const newHandler = new Handler(this);

            newHandler.execute();
            

        })
    }

    await(time) {
        return new Promise((resolve) => {
            setTimeout(resolve, time)
          });
    }
}

module.exports = ClientExtends;
