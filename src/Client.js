const { 
    Client, 
    GatewayIntentBits, 
    Partials, 
    Collection
} = require('discord.js');
require('dotenv').config();
const path = require('path');

const {
    ComamnadHandler, 
    EventHandler 
} = require('./Handlers/index');
const Database = require('./Database/Database');

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
        this.database = {
            local:  new Database(path.join(__dirname, 'Database','Files','database.json')),
        }
    }

    async login() {
        await super.login(process.env.TOKEN);

        new EventHandler(this).laod();
        await this.sleep(6000);
        new ComamnadHandler(this).slashCommand();
    }

    sleep(time) {
        return new Promise((resolve) => {
            setTimeout(resolve, time)
          });
    }
}

module.exports = ClientExtends;
