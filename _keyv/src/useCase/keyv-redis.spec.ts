import 'dotenv/config';
import Keyv, { KeyvHooks } from 'keyv';
import KeyvRedis from '@keyv/redis';

describe('keyv redis tests', () => {
  let keyv: Keyv;

  beforeAll(() => {
    const keyvRedis = new KeyvRedis(`${process.env.REDIS_URL}`);
    keyv = new Keyv({
      store: keyvRedis,
      ttl: 5000,
      namespace: 'cache',
      serialize: JSON.stringify,
      deserialize: JSON.parse,
    });
    keyv.on('error', (err) => console.log('Connection Error', err));
  }, 5000);

  test('should set and get a value', async () => {
    await keyv.set('foo', 'bar');
    const value = await keyv.get('foo');
    expect(value).toBe('bar');
  });

  test('should set a value with TTL and expire', async () => {
    await keyv.set('baz', 'qux', 1000);
    const value = await keyv.get('baz');
    expect(value).toBe('qux');
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const expiredValue = await keyv.get('baz');
    expect(expiredValue).toBeUndefined();
  });

  test('should delete a value', async () => {
    await keyv.set('foo', 'bar');
    await keyv.delete('foo');
    const value = await keyv.get('foo');
    expect(value).toBeUndefined();
  });

  test('should clear all values', async () => {
    await keyv.set('foo', 'bar');
    await keyv.set('baz', 'qux');
    await keyv.clear();
    const fooValue = await keyv.get('foo');
    const bazValue = await keyv.get('baz');
    expect(fooValue).toBeUndefined();
    expect(bazValue).toBeUndefined();
  });

  test('should handle namespaces', async () => {
    const users = new Keyv({
      store: keyv.opts.store,
      namespace: 'users',
      serialize: JSON.stringify,
      deserialize: JSON.parse,
    });
    await users.set('foo', 'user');
    const value = await users.get('foo');
    expect(value).toBe('user');
    await users.clear();
    const clearedValue = await users.get('foo');
    expect(clearedValue).toBeUndefined();
  });

  /* TODO: TypeError: Converting circular structure to JSON
        --> starting at object with constructor 'Error'        
        |     property 'previousErrors' -> object with constructor 'Array'
        --- index 0 closes the circle
        at stringify (<anonymous>) */
  // test('should handle events', async () => {
  //   const handleClear = jest.fn();
  //   const handleDisconnect = jest.fn();
  //   keyv.on('clear', handleClear);
  //   keyv.on('disconnect', handleDisconnect);

  //   await keyv.clear();
  //   expect(handleClear).toHaveBeenCalled();

  //   keyv.disconnect();
  //   expect(handleDisconnect).toHaveBeenCalled();
  // });

  test('should handle hooks', async () => {
    const preSetHook = jest.fn();
    const postSetHook = jest.fn();
    const preGetHook = jest.fn();
    const postGetHook = jest.fn();

    keyv.hooks.addHandler(KeyvHooks.PRE_SET, preSetHook);
    keyv.hooks.addHandler(KeyvHooks.POST_SET, postSetHook);
    keyv.hooks.addHandler(KeyvHooks.PRE_GET, preGetHook);
    keyv.hooks.addHandler(KeyvHooks.POST_GET, postGetHook);

    await keyv.set('hookKey', 'hookValue');
    expect(preSetHook).toHaveBeenCalled();
    expect(postSetHook).toHaveBeenCalled();

    await keyv.get('hookKey');
    expect(preGetHook).toHaveBeenCalled();
    expect(postGetHook).toHaveBeenCalled();
  });
});
