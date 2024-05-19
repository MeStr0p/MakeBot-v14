const { 
    ComponentType, 
    Component 
} = require("discord.js");
const ComponentBaseInteraction = require('../../Structurs/ComponentBase')

class ButtonInteraction extends ComponentBaseInteraction {
    constructor(client) {
        super(client, {
            customId: 'ticket/delete/:id',
            type: ComponentType.Button,
        });
    }

    async run(interaction, params) {
        const channel = interaction.guild.channels.cache.get(params.id);
        channel.delete()
    }
}

module.exports = ButtonInteraction;