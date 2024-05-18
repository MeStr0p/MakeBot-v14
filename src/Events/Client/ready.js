class EventReady {
    constructor() {
        this.EventName = "ready"
        this.once = false
    }

    execute(client) {
        console.log(client.user.username);
    }
}

module.exports = EventReady;