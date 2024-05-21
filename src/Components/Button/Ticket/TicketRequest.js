const { 
    ComponentType, 
    Component, 
    EmbedBuilder
} = require("discord.js");
const ComponentBaseInteraction = require('../../../Structurs/ComponentBase')

class ButtonInteraction extends ComponentBaseInteraction {
    constructor(client) {
        super(client, {
            customId: 'request/quetod/:ticket/:user',
            type: ComponentType.Button,
        });
    }

    async run(interaction, params) {
        const embed = new EmbedBuilder()
        .setTitle("🛠️ Sistema de Orçamento 📊")
        .setColor("White")
        .setDescription("\`\`\`Diga-nos como você imagina o seu bot ou forneça uma descrição para começarmos a trabalhar!\`\`\`")
        .setThumbnail(interaction.guild.iconURL());

        interaction.reply({embeds: [embed]});
    }
}

module.exports = ButtonInteraction;