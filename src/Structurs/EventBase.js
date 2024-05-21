module.exports = class EventBase {
    constructor(meta = {}) {
        meta.once = false;
    }

    async run() {
        throw Error(`Event don´t heve a metod run()`)
    }
}