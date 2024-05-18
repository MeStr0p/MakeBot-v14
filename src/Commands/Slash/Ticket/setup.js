const Command = require('../../../Structurs/CommandBase');

const { 
    ApplicationCommandType, 
    SlashCommandBuilder,
    ApplicationCommandOptionType, 
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    ActionRowBuilder,
    ComponentType,
    EmbedBuilder,
    ButtonBuilder
} = require('discord.js');

module.exports = class Hello extends Command {
	constructor(client) {
		super(client, {
			data: {
                name: 'ticket',
                description: 'ver latencia',
                type: 1,
                options: [
                    {
                        name: 'setup',
                        description: 'iniciar um ticket',
                        type: ApplicationCommandType.ChatInput
                    }
                ]
            },
			contextDescription: 'Sends a message that greets you, with a present!',
			usage: 'Ticket',
			category: 'Context',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(interaction, client) {
        const Emebd = new EmbedBuilder()
        .setTitle('SISTEMA DE ATENDIMENTO')
        .setDescription(`# ${interaction.guild.name}\n
        \`\`\`Se está decidido a iniciar o processo de compra de um produto, então veio ao lugar certo para isso. Abra um ticket utilizando o botão abaixo.\`\`\`
        `)
        .setThumbnail(interaction.guild.iconURL())
        .setFooter({text: interaction.guild.name, iconURL: interaction.guild.iconURL()});

        const button = new ButtonBuilder()
        .setCustomId('ticketCreate')
        .setLabel('Abrir Ticket')
        .setStyle(2)
        .setEmoji('🎟️');

        const row = new ActionRowBuilder()
        .addComponents(button)

		await interaction.channel.send({
            content: '@here', 
            embeds: [Emebd], 
            components: [row
        ]});

	}
};