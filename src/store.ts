export type StoreOptions<State> = {
    actions?: Actions;
    mutations?: Mutations;
    state?: State;
}

export type Action = (context: Context, payload?: any) => any;
export type Mutation = (context: Context, payload?: any) => any;

export type Context = {
    state: State
};

export type Actions = { [key: string]: Action };
export type Mutations = { [key: string]: Mutation };
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
            throw new Error(`Unknown action key: ${actionKey}`);
        }

        action(payload);
    }

    public commit(mutationKey: string, payload?: any) {}
}