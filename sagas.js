import { all, put, takeEvery } from 'redux-saga/effects';

// Returns a Promise that resolves after x ms
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function* helloSaga() {
  console.log('Hello Sagas!');
}

// Worker Saga: will perform async task
function* incrementAsync() {
  // Block the generator
  // When a promise is yielded to the middleware, middleware will suspend the
  // Saga until the Promise completes
  yield delay(1000);
  // Once resolved, middleware resumes the Saga until next yield

  // an Effect - POJO w/ instructions to be fulfilled by the middleware
  // When a middleware receives an Effect yielded, the Saga is paused until the
  // Effect fulfills
  yield put({ type: 'INCREMENT' });
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
