const { 
    Client, 
    GatewayIntentBits, 
    Partials, 
    Collection
} = require('discord.js');
require('dotenv').config();
const {
    ComamnadHandler, 
    EventHandler,
    ComponentInteraction 
} = require('./Handlers/index');

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
                GatewayIntentBits.GuildPresences
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
                    name: 'MakeBots', 
                    type: 4 
                }],
			}
        });

        this.SlashCommands = new Collection();
        this.Component;
        this.CollectionComponent = new Collection();

        this.owner = ['']
    }

    async login() {
        await super.login(process.env.TOKEN);

        new EventHandler(this).laod();        
        new ComamnadHandler(this).slashCommand();
        this.Component = new ComponentInteraction(this);
    }

    await(time) {
        return new Promise((resolve) => {
            setTimeout(resolve, time)
          });
    }
}

module.exports = ClientExtends;
