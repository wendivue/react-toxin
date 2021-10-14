import { Context, createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, createStore, Store, Reducer } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware, { Task } from 'redux-saga';

import { RootState, reducer } from './rootReducer';
import { rootWatcher } from './rootSagaWatcher';

const isDev = process.env.NODE_ENV === 'development';
interface SagaStore extends Store {
  sagaTask?: Task;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const makeStore = (context: Context): Store => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];

  const store = createStore(
    reducer as Reducer<RootState>,
    isDev
      ? composeWithDevTools(applyMiddleware(...middleware))
      : applyMiddleware(...middleware),
  );

  (store as SagaStore).sagaTask = sagaMiddleware.run(rootWatcher);

  return store;
};

const wrapper = createWrapper<Store<RootState>>(makeStore, {
  debug: isDev,
});

export type { SagaStore };
export { makeStore, wrapper };
