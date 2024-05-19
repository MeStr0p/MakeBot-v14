const fs = require('fs');
const ComponentBaseInteraction = require('../Structurs/ComponentBase');
const { Collection, ComponentType } = require("discord.js");
const { getCustomIdParams } = require('../Structurs/utils/Params');

class EventHandler {
    constructor(client) {
        this.client = client;
        this.Component = client.CollectionComponent;

        this.execute();
    };

    InitInteraction(interaction) {
        const { customId, componentType } = interaction;

        const components = this.Component.get(componentType) ?? this.Component.get(ComponentType.ActionRow);


        const find = (components, type) => {
            if (!components) return;

            if (this.Component.has(customId)) {
                const component = this.Component.has(customId);
                component.run(interaction, null);
                return;
            }
            const component = this.Component.find((data) => !!getCustomIdParams(data.customId, customId));
            if (component) {
                const params = getCustomIdParams(component.customId, customId);
                component.run(interaction, params);
                return;
            }

            if (type !== ComponentType.ActionRow) {
                find(this.Component.get(ComponentType.ActionRow), ComponentType.ActionRow);
            }
        };

        find(components, componentType);
    }

    execute() {
        console.log('[handler] => starting a button interactions'.toLowerCase());

        fs.readdirSync('./src/Components').forEach(subfolder => {
            fs.readdirSync(`./src/Components/${subfolder}`)
                .filter(file => file.endsWith('.js'))
                .forEach(file => {
                    try {
                        const ComponentInteraction = require(`../Components/${subfolder}/${file}`);

                        if (!(ComponentInteraction.prototype instanceof ComponentBaseInteraction)) return;

                        const ComponentData = new ComponentInteraction(this.client);

                        let components = this.Component.get(ComponentData.type);
                        if (!components) {
                            this.Component.set(ComponentData.type, components);
                        }

                        this.Component.set(ComponentData.customId, ComponentData);




                    } catch (err) {
                        console.log(err);
                    }

                });
        });

        this.client.await(5000).then(() => {});

    };
}

module.exports = EventHandler;