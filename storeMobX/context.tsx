import React from 'react';
import { useLocalObservable } from 'mobx-react-lite';

import { initializeStore } from './initRootStore';
import { RootStore } from './RootStore';

const storeContext = React.createContext<null | RootStore>(null);

const StoreProvider: React.FC = ({ children }) => {
  const store = useLocalObservable(initializeStore);

  return (
    <storeContext.Provider value={store}>{children}</storeContext.Provider>
  );
};

export { storeContext, StoreProvider };
