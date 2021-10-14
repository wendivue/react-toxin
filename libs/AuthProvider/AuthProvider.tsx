import React, { useState, useEffect, createContext, FC } from 'react';
import firebase from 'firebase/app';

import { Firebase } from '@/libs/Firebase';

const AuthContext = createContext<{ user: firebase.User | null }>({
  user: null,
});
const firebaseClient = new Firebase();

const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    return firebaseClient.idTokenChange(setUser);
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      // refreshing token
      const { currentUser } = firebaseClient.auth;
      if (currentUser) await currentUser.getIdToken(true);
    }, 10 * 60 * 1000);
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
