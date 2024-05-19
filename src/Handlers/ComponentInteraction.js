const fs = require('fs');
const ComponentBaseInteraction = require('../Structurs/ComponentBase');
const { Collection, ComponentType } = require("discord.js");
const {getCustomIdParams} = require('../Structurs/utils/Params');

class EventHandler {
    constructor(client) {
        this.client = client;
        this.Component = client.CollectionComponent;
        
        this.laod();
    };

    onComponent(interaction) {
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

    laod() {
        console.log('[HANDLER] => CARREGANDO BTN INTERACITONS:');

        fs.readdirSync('./src/Components').forEach(subfolder => {
            fs.readdirSync(`./src/Components/${subfolder}`)
            .filter(file => file.endsWith('.js'))
            .forEach(file => {
                try {
                    const ComponentInteraction = require(`../Components/${subfolder}/${file}`);

                    if(!(ComponentInteraction.prototype instanceof ComponentBaseInteraction)) return;

                    const ComponentData = new ComponentInteraction(this.client);
                    
                    const components = this.Component.get(ComponentData.type) ?? new Collection();
                    components.set(ComponentData.customId, ComponentData);
                    this.Component.set(ComponentData.type, ComponentData);

                    

                    
                } catch(err) {
                    console.log(err);
                }
               
            });
        });

        this.client.sleep(5000).then(() => this.logs());
        
    };

    logs() {
        const names = new Map(Object.entries(ComponentType).map(([key, value]) => [+key, value]));

        for (const components of this.Component.values()) {
            const { customId, type } = components;
            console.log(`Custom ID: ${customId}, Type: ${type}`);
        }
    }
}

module.exports = EventHandler;