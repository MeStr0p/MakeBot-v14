module.exports = class ComponentInteraction {
	constructor(client, meta = {}) {
        this.customId = meta.customId;
        this.type = meta.type;
	}

	async run() {
		throw new Error(`O Component interaction ${this.type} "${this.customId}" não possui uma função run()`);
	}
};