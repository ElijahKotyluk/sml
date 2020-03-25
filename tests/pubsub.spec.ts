import PubSub from '../src/pubsub';

describe('PubSub class', () => {
    it('should init a new PubSub instance', () => {
        const ps = new PubSub();

        expect(ps).toBeInstanceOf(PubSub);
    });

    it('should subscribe', () => {
        const ps = new PubSub();
        ps.subscribe('someKey', jest.fn());

        expect(ps.subs).toHaveProperty('someKey');
        expect(ps.subs.someKey).toHaveLength(1)

        ps.subscribe('someKey', jest.fn());

        expect(ps.subs.someKey).toHaveLength(2)
    });

    it('should publish if key exists otherwise throw', () => {
        const fn = jest.fn();
        const ps = new PubSub();

        expect(() => ps.publish('someKey', 'noop')).toThrowError();

        ps.subscribe('someKey', fn);
        ps.publish('someKey', 'noop');

        expect(fn).toHaveBeenCalledWith('noop');
    });
});