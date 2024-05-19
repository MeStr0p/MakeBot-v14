const fs = require('fs');
const CommandBase = require('../Structurs/CommandBase');
const { REST, Routes } = require('discord.js');
require('dotenv').config();

class CommandHandler {
    constructor(client) {
        this.client = client;
    };

    async slashCommand() {
        console.log('[HANDLER] => CARREGADO COMMANDOS SLASH');

        fs.readdirSync('./src/Commands/Slash').forEach(subfolder => {
            fs.readdirSync(`./src/Commands/Slash/${subfolder}`)
            .filter(file => file.endsWith('.js'))
            .forEach(file => {
                try {
                    const Command  = require(`../Commands/Slash/${subfolder}/${file}`);

                    if(!(Command .prototype instanceof CommandBase)) return;

                    const cmd = new Command(this.client);

                    const cmdData = cmd.data;

					const CMD = {
						name: cmdData.name,
						description: cmdData.description,
						options: cmdData.options,
						defaultPermission: cmdData.default_permission,
						contextDescription: cmd.contextDescription,
						usage: cmd.usage,
						category: cmd.category,
						permissions: cmd.permissions,
						run: cmd.run,
					};

                    this.client.SlashCommands.set(CMD.name, CMD)
                    
                } catch(err) {
                    console.log(err);
                }
               
            });
        });

        await this.client.await(6000);
        this.RegsitryCommands()
    };

    async RegsitryCommands() {

        const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

        try {
          console.log('Started refreshing application (/) commands.');
        
          await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { 
            body: this.client.SlashCommands 
          });
        
          console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
          console.error(error);
        }
    }
}

module.exports = CommandHandler;