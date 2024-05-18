const Command = require('../../../Structurs/CommandBase');

const { 
    ApplicationCommandType, 
    SlashCommandBuilder 
} = require('discord.js');

module.exports = class Hello extends Command {
	constructor(client) {
		super(client, {
			data: {
                name: 'clear',
                description: 'ver latencia',
                type: 1,
                options: [
                    {
                        name: 'amaout',
                        description: 'quantidade de msg a ser apagada (default 50)',
                        type: 4
                    }
                ]
            },
			contextDescription: 'Sends a message that greets you, with a present!',
			usage: 'Hello',
			category: 'Context',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(interaction, client) {
		let amaout = interaction.options.getInteger('amaout') ?? 20;
        if (amaout < 1 || amaout > 99) return interaction.reply({content: "escoha um numero entre 1 e 99", ephemeral: true});


        interaction.channel.bulkDelete(amaout, true).then(async(msg) => {
            interaction.reply({content: `${msg.size} messagens deletadas`, ephemeral: true});
        });
	}
};