type LikeProps = {
  value: number;
  id: number | string;
  onChange: (key: KeyProps) => void;
  disabled?: boolean;
  isActive?: boolean;
};

type KeyProps = [number | string, boolean];

export type { LikeProps, KeyProps };
