import test from 'tape';

import { put, call } from 'redux-saga/effects';
import { incrementAsync, delay } from './sagas';

test('incrementAsync Saga test', (assert) => {
  const generator = incrementAsync();

  // Effects return POJOs. Middleware examines type of each yielded Effect then
  // decides how to fulfill that Effect.
  // Separation between Effect creation and Effect execution
  assert.deepEqual(
    generator.next().value,
    call(delay, 1000),
    'incrementAsync Saga must call delay(1000)'
  );

  assert.deepEqual(
    generator.next().value,
    put({ type: 'INCREMENT' }),
    'incrementAsync Saga must dispatch an INCREMENT action'
  );

  assert.deepEqual(
    generator.next(),
    { done: true, value: undefined },
    'incrementAsync Saga must be done'
  );

  assert.end();
});
