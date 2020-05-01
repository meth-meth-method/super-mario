export default class InputRouter {
    constructor() {
        this.receivers = new Set();
    }

    addReceiver(receiver) {
        this.receivers.add(receiver);
    }

    dropReceiver(receiver) {
        this.receivers.delete(receiver);
    }

    route(routeInput) {
        for (const receiver of this.receivers) {
            routeInput(receiver);
        }
    }
}
