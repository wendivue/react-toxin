import { makeAutoObservable } from 'mobx';

import { Firebase } from '@/libs/Firebase';

import { RootStoreType } from '../rootStoreType';
import type {
  AllRooms,
  RoomsFilterFirebase,
  RoomsStoreType,
} from './roomsTypes';

class RoomsStore implements RoomsStoreType {
  rootStore: RootStoreType;

  isRoomsLoading = false;

  roomsError = null;

  filteredRooms: AllRooms | null = null;

  filter: RoomsFilterFirebase | null = null;

  constructor(rootStore: RootStoreType) {
    makeAutoObservable(this, { rootStore: false }, { autoBind: true });
    this.rootStore = rootStore;
  }

  setFilter(filter: RoomsFilterFirebase): void {
    this.filter = {
      ...this.filter,
      ...filter,
    };
  }

  *fetchFiltered(): Generator<unknown, void, AllRooms> {
    this.isRoomsLoading = true;
    this.filteredRooms = null;
    this.roomsError = null;

    const firebaseApi = new Firebase();
    try {
      if (this.filter) {
        this.filteredRooms = yield firebaseApi.fetchFilteredRooms(this.filter);
      }
    } catch (error) {
      this.filteredRooms = {};
      this.roomsError = error;
    } finally {
      this.isRoomsLoading = false;
    }
  }
}

export { RoomsStore };
