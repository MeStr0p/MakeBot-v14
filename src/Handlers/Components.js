const fs = require('fs');
const ComponentBaseInteraction = require('../Structurs/ComponentBase');
const { Collection, ComponentType } = require("discord.js");
const { getCustomIdParams } = require('../Structurs/utils/Params');

class COmponettHandler {
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
                const component = this.Component.get(customId);
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

        fs.readdirSync('./src/Components/Button').forEach(subfolder => {
            fs.readdirSync(`./src/Components/Button/${subfolder}`)
                .filter(file => file.endsWith('.js'))
                .forEach(file => {
                    try {
                        const ComponentInteraction = require(`../Components/Button/${subfolder}/${file}`);

                        if (!(ComponentInteraction.prototype instanceof ComponentBaseInteraction)) return;

                        const ComponentData = new ComponentInteraction(this.client);

                        this.Component.set(ComponentData.type, ComponentData);
                        this.Component.set(ComponentData.customId, ComponentData);

                    } catch (err) {
                        console.log(err);
                    }

                });
        });

        this.client.await(5000).then(() => {
            
        });

    };

    logs() {
        for (const components of this.Component.values()) {
            console.log(components)

        }
    }
}

module.exports = COmponettHandler;