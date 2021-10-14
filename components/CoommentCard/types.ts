type CommentCardProps = {
  roomId: string;
  isEdit?: boolean;
  text?: string;
  onSubmit?: () => void;
  reviewId?: string;
  likes?: number;
};

export type { CommentCardProps };
