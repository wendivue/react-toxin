import { Timestamp } from '@/libs/Firebase/Firebase';

type ReviewProps = {
  name: string;
  date: Timestamp;
  text: string;
  img: string | null;
  likes: number;
  id: number | string;
  userId?: string | number;
  isControl?: boolean;
  roomId: string;
};

export type { ReviewProps };
