const { InteractionType } = require('discord.js')
class EventInteraction {
    constructor() {
        this.EventName = "interactionCreate"
        this.once = false
    }

    execute(interaction, client) {
        if (interaction.type != InteractionType.ApplicationCommand) return;

        const cmd = client.SlashCommands.get(interaction.commandName);
        if (interaction.user.bot) return;

        if (!interaction.inGuild() && interaction.type === InteractionType.ApplicationCommand) return interaction.reply({ content: 'You must be in a server to use commands.' });

        if (!cmd) return interaction.reply({
            content: 'This command is unavailable. *Check back later.*',
            ephemeral: true
        }) && client.SlashCommands.delete(interaction.commandName);


        try {
            cmd.run(interaction, client);
        }
        catch (e) {
            console.log(e);
            return interaction.reply({ content: `An error has occurred.\n\n**\`${e.message}\`**` });
        }

    }
}

module.exports = EventInteraction;