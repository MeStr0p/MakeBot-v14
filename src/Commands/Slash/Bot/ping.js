const Command = require('../../../Structurs/CommandBase');

const { ApplicationCommandType, ContextMenuCommandBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = class Hello extends Command {
	constructor(client) {
		super(client, {
			data: {
                name: 'pingtest',
                description: 'ver latencia',
                type: 1,
                options: []
            },
			contextDescription: 'Sends a message that greets you, with a present!',
			usage: 'Hello',
			category: 'Context',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(interaction, client) {
		await interaction.reply({ content: `Hello ${interaction.user}! Here, you should have a slice of vanilla cake 😊🍰\n\nMessage ID: ${interaction.targetId}` });
	}
};