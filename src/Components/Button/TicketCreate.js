const { 
    ComponentType, 
    Component 
} = require("discord.js");
const ComponentBaseInteraction = require('../../Structurs/ComponentBase')

class ButtonCreate extends ComponentBaseInteraction {
    constructor(client) {
        super(client, {
            customId: 'ticket/create',
            type: ComponentType.Button,
        });
    }

    async run(interaction, params) {
        const channel = interaction.guild.channels.cache.get(params.id);
        channel.delete()
    }
}

module.exports = ButtonCreate;