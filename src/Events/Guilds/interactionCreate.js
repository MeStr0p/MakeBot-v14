const {
    InteractionType,
    ChannelType,
    PermissionsBitField,
    EmbedBuilder,
    ButtonBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    ComponentType
} = require('discord.js');

const EventBase = require('../../Structurs/EventBase');

class EventInteraction extends EventBase{
    async run(interaction, client) {
        if (interaction.isMessageComponent()) {
         
        }
    }
}

module.exports = EventInteraction;
