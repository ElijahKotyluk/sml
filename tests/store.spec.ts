import Store from '../src/store';

describe('Store', () => {
    it('should initialize a new store with actions, mutations, and state', () => {
        const options = {};

        const store = new Store(options);

        expect(store).toBeDefined();
    });

    it('should dispatch an action', () => {
        const consoleSpy = jest.spyOn(console, 'error');
        const actions = {
            fn: jest.fn()
        }

        const options = {
            actions
        }

        const store = new Store(options);

        expect(store.actions).toHaveProperty('fn');

        store.dispatch('fn', {});
        expect(store.actions.fn).toHaveBeenCalledWith({})

        store.dispatch('n/a');
        expect(consoleSpy).toHaveBeenCalledWith('Unknown action key: n/a.');
    })
});
