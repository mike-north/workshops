import { suite, test } from "mocha-typescript";
import { Deferred } from '../src/index';
import { assert } from "chai";

@suite
class DeferredTests {
    @test
    async resolve() {
        let callCount = 0;
        let lastResolvedValue: any = null;
        let d = new Deferred<string>();
        d.promise.then((v) => {
            lastResolvedValue = v;
            callCount++;
        });
        assert.equal(callCount, 0, 'Call count is initially zero');
        await d.resolve('foo');
        assert.equal(callCount, 1, 'Call count is one after deferred is resolved');
        assert.equal(lastResolvedValue, 'foo', 'Deferred#resolve resolves promise with argument');
    }
    @test
    async reject() {
        let callCount = 0;
        let lastResolvedValue: any = null;
        let d = new Deferred<string>();
        d.promise.catch((v) => {
            lastResolvedValue = v;
            callCount++;
        });
        assert.equal(callCount, 0, 'Call count is initially zero');
        try {
            await d.reject('foo')
            assert.ok(false, 'Unreachable');
        } catch (e) {
            assert.ok(e, 'Error was thrown');
        } finally {
            assert.equal(callCount, 1, 'Call count is one after deferred is resolved');
            assert.equal(lastResolvedValue, 'foo', 'Deferred#resolve resolves promise with argument');
        }
    }
}