import { useContext } from 'react';
import firebase from 'firebase/app';

import { AuthContext } from '@/libs/AuthProvider';

export const useAuth = (): { user: firebase.User | null } => {
  return useContext(AuthContext);
};
