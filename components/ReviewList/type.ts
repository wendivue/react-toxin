type ReviewListProps = {
  title: string;
  reviewList: Array<ReviewItemProps>;
  totalReview?: number;
  roomId: string;
};

type ReviewItemProps = {
  name: string;
  date: string;
  text: string;
  img: string | null;
  likes: number;
  id: number | string;
  userId?: string | number;
  isControl?: boolean;
  roomId?: string;
};

export type { ReviewListProps, ReviewItemProps };
