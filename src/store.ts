import PubSub from "./pubsub";

export type StoreOptions<State> = {
    actions?: Actions;
    mutations?: Mutations;
    state?: State;
}

export type Dispatch = (actionKey: string, payload?: any) => Promise<any>;
export type Commit = (mutationKey: string, payload?: any) => void;
export type ActionFn = (...args: any[]) => Promise<any>;
export type MutationFn = (...args: any[]) => void;
export type Context = {
    state: State
};

export type Actions = { [key: string]: ActionFn };
export type Mutations = { [key: string]: MutationFn };
export type State = { [key: string]: any };

export default class Store {
    public actions: Actions;
    public mutations: Mutations;
    public state: State | (() => State);

    constructor(options: StoreOptions<State>) {
        this.actions = options.actions || {};
        this.mutations = options.mutations || {};
        this.state = options.state || {};
    } 

    public dispatch(actionKey: string, payload?: any) {
        const action = this.actions[actionKey];

        if (!action) {
            console.error(`Unknown action key: ${actionKey}.`);
            return;
        }

        action.call(this, payload);
    }

    public commit(mutationKey: string, payload?: any) {
        const mutation = this.mutations[mutationKey];

        if (!mutation) {
            console.error(`Unknown mutation key: ${mutationKey}.`);
            return;
        }

        mutation.call(this, payload);
    }
}