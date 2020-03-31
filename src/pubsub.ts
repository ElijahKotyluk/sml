type subs = { [key: string]: Array<(...args: any[]) => any> }

export default class PubSub {
    public subs: subs;

    constructor() {
        this.subs = {};
    }

    subscribe(key: string, fn: (...args: any[]) => any): void {
        if (!this.subs[key]) {
            this.subs[key] = [];
        }

        this.subs[key].push(fn);
    }

    publish(key: string, payload: any): void {
        if (!this.subs[key]) {
            throw new Error(`Subs does not contain key: ${key}`);
        }

        const eventKey = this.subs[key];

        for (const fn of eventKey) {
            fn(payload);
        }
    }
}