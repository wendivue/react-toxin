import React, { FC, useEffect, useState } from 'react';

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

  useEffect(() => {
    setIsLikeActive(isActive);
  }, [isActive]);

  return (
    <label className={styles.label}>
      <input
        className={styles.checkbox}
        type="checkbox"
        name="like"
        disabled={disabled}
        onChange={handleClickLike}
        checked={isLikeActive}
      />
      <span className={styles.number}>{likeCount}</span>
    </label>
  );
};

export { Like };
