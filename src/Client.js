const { 
    Client, 
    GatewayIntentBits, 
    Partials, 
    Collection
} = require('discord.js');
require('dotenv').config();
const path = require('path')
const fs = require('fs');
const HandlerBase  = require('./Structurs/HanderBase');

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
        const handlersPath = path.join(__dirname, 'Handlers');

        fs.readdirSync(handlersPath, {
            withFileTypes: true
        }).filter(file => file.name.endsWith(".js")).forEach(file => {
            const Handler = require(`./Handlers/${file.name}`);
            
            if(!(Handler.prototype instanceof HandlerBase)) return;


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
