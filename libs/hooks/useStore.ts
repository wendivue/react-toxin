import { useContext } from 'react';

import { storeContext } from 'storeMobX/context';
import { RootStore } from 'storeMobX/RootStore';

const useStore = (): RootStore => {
  const store = useContext(storeContext);
  if (!store) {
    throw new Error('useStore must be used within a store context provider');
  }
  return store;
};

export { useStore };
