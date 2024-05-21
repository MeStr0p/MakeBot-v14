const { InteractionType } = require('discord.js');
const EventBase = require('../../Structurs/EventBase');

class EventInteraction extends EventBase {

    async run(interaction, client) {
        if (interaction.type != InteractionType.ApplicationCommand) return;

        const cmd = client.SlashCommands.get(interaction.commandName);
        if (interaction.user.bot) return;

        if (!interaction.inGuild() && interaction.type === InteractionType.ApplicationCommand) return interaction.reply({ content: 'You must be in a server to use commands.' });

        if (!cmd) return interaction.reply({content: `${interaction.user} this command is not available`, ephemeral: true}) && client.SlashCommands.delete(interaction.commandName);


        try {
            cmd.run(interaction, client);
        }
        catch (e) {
            console.log(e);
            return interaction.reply({ content: `an internal error occurred` });
        }

    }
}

module.exports = EventInteraction;