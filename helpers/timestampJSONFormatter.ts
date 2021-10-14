import { Timestamp as Time } from '@/libs/Firebase/Firebase';
import firebase from 'firebase/app';

const { Timestamp } = firebase.firestore;

type TimestampProp = { seconds: number; nanoseconds: number };
const objFromJSON = (date: string): TimestampProp => {
  return JSON.parse(date);
};

const dateToJSON = (date: Time): string => {
  return JSON.stringify(date);
};
const dateFromJSON = (date: string): Time => {
  const { seconds, nanoseconds } = objFromJSON(date);
  return new Timestamp(seconds, nanoseconds);
};

export { dateToJSON, dateFromJSON };
