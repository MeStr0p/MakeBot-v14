const { 
    ComponentType, 
    Component,
    InteractionType,
    ChannelType,
    PermissionsBitField,
    EmbedBuilder,
    ButtonBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
} = require("discord.js");
;
const ComponentBaseInteraction = require('../../../Structurs/ComponentBase')

class ButtonInteraction extends ComponentBaseInteraction {
    constructor(client) {
        super(client, {
            customId: 'ticket/Create',
            type: ComponentType.Button,
        });
    }

    async run(interaction, params) {
            const verificar = interaction.guild.channels.cache.find(e => e.topic == interaction.user.id);

            if (verificar) {
                const Embed = new EmbedBuilder()
                    .setColor('White')
                    .setDescription(`Você ja possui um [ticket](${verificar.url})`);

                interaction.reply({ content: `${interaction.user}`, embeds: [Embed], ephemeral: true });
                return;
            }

            await interaction.deferUpdate();


            interaction.guild.channels.create({
                name: `ticketof${interaction.user.username}`,
                type: ChannelType.GuildText,
                parent: '1234239164354920518',
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: [PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                        id: interaction.user.id,
                        allow: [
                            PermissionsBitField.Flags.ViewChannel
                        ],
                        deny: [
                            PermissionsBitField.Flags.UseApplicationCommands
                        ]
                    },
                ],
            }).then(async (channel) => {
                channel.setTopic(interaction.user.id);

                const embed = new EmbedBuilder()
                    .setColor('White')
                    .setDescription(`${interaction.user} seu ticket foi criando, use o botão abaixo para ir para ele.`)

                const btn = new ButtonBuilder()
                    .setLabel('Ticket')
                    .setURL(channel.url)
                    .setStyle(5);

                const row = new ActionRowBuilder().addComponents(btn)

                interaction.followUp({
                    content: `${interaction.user}`,
                    embeds: [embed],
                    components: [row],
                    ephemeral: true
                });

                const Embed = new EmbedBuilder()
                    .setTitle(interaction.guild.name)
                    .setColor('White')
                    .setThumbnail(interaction.guild.iconURL())
                    .setDescription(`\`\`\`seu ticket está criado. Você logo será atendido...\`\`\``)
                    .setTimestamp();

                const btnDelete = new ButtonBuilder()
                    .setLabel(`Deleta`)
                    .setCustomId(`ticket/delete/${channel.id}`)
                    .setStyle(2);

                const Menu = new StringSelectMenuBuilder()
                    .setCustomId(`ChoicesTicket?${channel.id}`)
                    .setPlaceholder("Resposta pré-pontas/perguntas")
                    .addOptions(
                        {
                            label: 'Quantos custa um Bot?',
                            description: 'Saiba o valor de um bot',
                            emoji: '🤖',
                            value: 'cost_of_bot'
                        },
                        {
                            label: 'Como configurar um Bot?',
                            description: 'Aprenda a configurar seu bot',
                            emoji: '⚙️',
                            value: 'setup_bot'
                        },
                        {
                            label: 'Suporte Técnico',
                            description: 'Obtenha ajuda com problemas técnicos',
                            emoji: '🛠️',
                            value: 'tech_support'
                        },
                        {
                            label: 'Dúvidas Gerais',
                            description: 'Perguntas e respostas gerais',
                            emoji: '❓',
                            value: 'general_questions'
                        },
                        {
                            label: 'Delete Channel',
                            description: 'fechar ticket',
                            emoji: '🛠️',
                            value: 'delete_ticket'
                        },
                    )

                let Btnrow = new ActionRowBuilder()
                .addComponents(btnDelete)
                let Selectrow = new ActionRowBuilder()
                .addComponents(Menu)

                const amsg = await channel.send({
                    content: `${interaction.user}`,
                    embeds: [Embed],
                    components: [Selectrow, Btnrow]
                });

                amsg.components.forEach(element => {
                    console.log(element.components)
                });

                console.log()

                const collector = channel.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: 3_600_000 });

                collector.on('collect', async i => {
                    if (i.user.id !== interaction.user.id) return i.update();

                    const selection = i.values[0];
                    let embed;
                    let butt
                    let components;

                    let deleteChanel = false;
                    

                    switch (selection) {
                        case 'cost_of_bot':
                            embed = new EmbedBuilder()
                                .setColor('White')
                                .setThumbnail(interaction.guild.iconURL())
                                .setTitle('Custo de um Bot')
                                .setDescription('\`\`\`O custo de um bot depende de vários fatores, incluindo complexidade, recursos e tempo de desenvolvimento.\`\`\`');

                                

                                butt = new ButtonBuilder()
                                .setCustomId(`request/quetod/${channel.id}/${interaction.user.id}`)
                                .setStyle(2)
                                .setLabel('click')

                                let row = new ActionRowBuilder()
                                .addComponents(btnDelete, butt)

                                components = [Selectrow, row]
                            break;
                        case 'setup_bot':
                            embed = new EmbedBuilder()
                                .setColor('White')
                                .setThumbnail(interaction.guild.iconURL())
                                .setTitle('Configuração de um Bot')
                                .setDescription('\`\`\`Digite o que você deseja configura no bot:\`\`\`');
                            break;
                        case 'tech_support':
                            embed = new EmbedBuilder()
                                .setColor('White')
                                .setThumbnail(interaction.guild.iconURL())
                                .setTitle('Suporte Técnico')
                                .setDescription('\`\`\`Digite o "problema" no chat:\`\`\`');
                            break;
                        case 'general_questions':
                            embed = new EmbedBuilder()
                                .setColor('White')
                                .setThumbnail(interaction.guild.iconURL())
                                .setTitle('Dúvidas Gerais')
                                .setDescription('\`\`\`Fale sua duvida e espere uma reposta de algum Atendente.\`\`\`');
                            break;
                            case "delete_ticket":
                                await channel.delete().then(() => {
                                    deleteChanel = true;
                                }).catch()

                                break; 
                        default:
                            embed = new EmbedBuilder()
                                .setColor(0x0099ff)
                                .setTitle('Opção Inválida')
                                .setDescription('\`\`\`Selecione uma opção válida do menu.\`\`\`');
                            break;
                    }

                    deleteChanel ?? await i.update({ embeds: [embed], components });
                    
                });
            });
    }
}

module.exports = ButtonInteraction;