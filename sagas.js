import { all, put, takeEvery, call } from 'redux-saga/effects';

// Returns a Promise that resolves after x ms, so we can block generator
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function* helloSaga() {
  console.log('Hello Sagas!');
}

// Worker Saga: will perform async task
export function* incrementAsync() {
  // When a promise is yielded to the middleware, middleware will suspend the
  // Saga until the Promise completes
  // Call delay indirectly using call Effect to make a subsequent deep
  // comparison possible:
  yield call(delay, 1000); // => { CALL: { fun: delay, args: [1000] } }
  // Once resolved, middleware resumes the Saga until next yield

  // an Effect - POJO w/ instructions to be fulfilled by the middleware
  // When a middleware receives an Effect yielded, the Saga is paused until the
  // Effect fulfills
  yield put({ type: 'INCREMENT' }); // => { PUT: { type: 'INCREMENT' } }
}

// Watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
function* watchIncrementAsync() {
  // Listen for dispatched actions and run the worker Saga each time
  yield takeEvery('INCREMENT_ASYNC', incrementAsync);
}

// Export a single entry point to start all Sagas at once. The two resulting
// generators will be started in parallel
export default function* rootSaga() {
  yield all([helloSaga(), watchIncrementAsync()]);
}
