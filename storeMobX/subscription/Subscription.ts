import { makeAutoObservable } from 'mobx';

import { Firebase } from '@/libs/Firebase';
import { RootStoreType } from 'storeMobX/rootStoreType';
import { SubscriptionError, SubscriptionType } from './subscriptionTypes';

class Subscription implements SubscriptionType {
  rootStore: RootStoreType;

  lastEmail: true | null = null;

  isLoading = false;

  error: SubscriptionError | null = null;

  constructor(rootStore: RootStoreType) {
    makeAutoObservable(this, { rootStore: false }, { autoBind: true });

    this.rootStore = rootStore;
  }

  *subscribeEmail(email: string): Generator<unknown, void, true> {
    this.isLoading = true;
    this.lastEmail = null;
    this.error = null;

    const firebaseApi = new Firebase();

    try {
      this.lastEmail = yield firebaseApi.subscribeEmail(email);
    } catch (error) {
      this.lastEmail = null;
      this.error = error;
    } finally {
      this.isLoading = false;
    }
  }
}

export { Subscription };
