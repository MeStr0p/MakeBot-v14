const Command = require('../../../Structurs/CommandBase');

const { ApplicationCommandType, ContextMenuCommandBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = class Hello extends Command {
	constructor(client) {
		super(client, {
			data: {
                name: 'ping',
                description: 'ver latencia',
                type: 1,
                options: []
            },
	
			usage: 'Hello',
			category: 'Context',
			permissions: ['Use Application Commands', 'Send Messages'],
		});
	}
	async run(interaction, client) {
		await interaction.reply({ content: `ping > ${client.ws.ping}` });
	}
};