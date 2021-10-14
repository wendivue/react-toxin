import { configure } from 'mobx';
import { enableStaticRendering } from 'mobx-react-lite';

import { RootStore } from './RootStore';
import { RootStoreType } from './rootStoreType';

const isServer = typeof window === 'undefined';
enableStaticRendering(isServer);

let store: RootStoreType | null = null;

function initializeStore(): RootStoreType {
  configure({
    enforceActions: 'always',
    computedRequiresReaction: true,
    reactionRequiresObservable: true,
    observableRequiresReaction: true,
  });

  if (isServer) {
    return new RootStore();
  }

  if (store === null) {
    store = new RootStore();
  }

  return store;
}

export { initializeStore };
