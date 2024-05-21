module.exports = class EventHandlerStrucut {
    constructor(client) {
    }

    async execute() {
        throw Error(`the Handler don´t provide metod execute()`)
    }


}