import React, { FC, useState } from 'react';

import styles from './Like.module.scss';
import { LikeProps } from './type';

const Like: FC<LikeProps> = ({
  value,
  disabled = true,
  isActive = false,
  id,
  onChange,
}) => {
  const [likeCount, setLikeCount] = useState(value || 0);
  const [isLikeActive, setIsLikeActive] = useState(isActive);

  const handleClickLike = (): void => {
    setIsLikeActive(!isLikeActive);

    const count = isLikeActive ? likeCount - 1 : likeCount + 1;
    setLikeCount(count);

    if (onChange && id) onChange([id, !isLikeActive]);
  };

  return (
    <label className={styles.label}>
      <input
        className={styles.checkbox}
        type="checkbox"
        name="like"
        disabled={disabled}
        onChange={handleClickLike}
      />
      <span className={styles.number}>{likeCount}</span>
    </label>
  );
};

export { Like };
