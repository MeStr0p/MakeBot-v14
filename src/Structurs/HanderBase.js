module.exports = class CommandHandlerStrucut {
    constructor(client) {
    }

    async execute() {
        throw Error(`the Handler don´t provide metod execute()`)
    }


}