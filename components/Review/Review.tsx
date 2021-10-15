import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useTranslation } from 'next-i18next';
import clsx from 'clsx';
import 'moment/locale/ru';

import { roomDeleteReview } from 'store/room/roomAction';
import { authUpdateUserLikes } from 'store/auth/authActions';
import { useTypedSelector } from '@/libs/hooks/useTypedSelector';
import { KeyProps } from '@/Like/type';
import { Like } from '@/Like';
import { CommentCard } from '@/CoommentCard';

import styles from './Review.module.scss';
import { ReviewProps } from './type';

const Review: FC<ReviewProps> = ({
  isControl = false,
  img,
  name,
  likes,
  id,
  text,
  date,
  roomId,
}) => {
  const { t } = useTranslation('roomInfo');
  const [isLikeActive, setIsLikeActive] = useState<KeyProps>([id, false]);
  const dispatch = useDispatch();

  const [isEditable, setIsEditable] = useState(false);
  const selectorReviewLikes = useTypedSelector(
    (state) => state.auth.user?.userInfo.reviewLikes,
  );
  const authUser = useTypedSelector((state) => state.auth.user);
  const isAuthUser = Boolean(authUser);

  const disabled = !isAuthUser;

  const getNewLikeList = useCallback(
    (likeInfo) => {
      const likeList = [...(selectorReviewLikes || [])];
      if (likeInfo[1]) {
        return [...likeList, likeInfo[0].toString()];
      }
      return likeList.filter((like) => like !== likeInfo[0]);
    },
    [selectorReviewLikes],
  );

  const createDateAgo = (dateReview: Date): string => {
    const dateAgo = moment(dateReview).subtract('days').fromNow();
    const now = moment();

    const weeks = now.diff(dateReview, 'weeks');
    const isWeeks = weeks > 0 && weeks <= 4;

    const days = now.diff(dateReview, 'days');
    const isDays = weeks === 0 && days > 0 && days < 7;

    if (isDays) {
      return t('reviewDate', { count: days, date: days });
    }

    if (isWeeks) {
      return t('reviewDate', { count: weeks, context: 'weeks', date: weeks });
    }
    const month = now.diff(dateReview, 'months');

    const isMonth = month && month <= 12;
    if (isMonth) {
      return t('reviewDate', { count: month, context: 'month', date: month });
    }

    return dateAgo;
  };

  const handleEditClick = (): void => {
    setIsEditable((s) => !s);
  };
  const dateAgo = createDateAgo(date.toDate());
  const handleDeleteReview = (): void => {
    if (roomId) {
      dispatch(roomDeleteReview({ roomId, reviewId: id as string }));
    }
  };

  const handleLikeChange = useCallback(
    (like) => {
      const likesList = getNewLikeList(like);

      dispatch(authUpdateUserLikes({ likes: likesList, roomId }));
    },
    [dispatch, getNewLikeList],
  );

  useEffect(() => {
    let isShouldBeActive = false;
    selectorReviewLikes?.forEach((value) => {
      if (value === id) {
        isShouldBeActive = true;
      }
    });
    setIsLikeActive([id, isShouldBeActive]);
  }, [selectorReviewLikes]);

  return (
    <li className={styles.reviewItem}>
      <img
        src={img || '/assets/img/default-avatar.jpg'}
        alt="review"
        className={styles.img}
      />
      <div className={styles.wrapperName}>
        <p className={styles.username}>{name}</p>
        <p className={styles.date}>{dateAgo}</p>
      </div>
      <div className={styles.like}>
        <Like
          value={likes}
          id={id}
          disabled={disabled}
          onChange={handleLikeChange}
          isActive={isLikeActive[1]}
        />
      </div>
      <p className={styles.text}>{text}</p>
      {isControl && (
        <div className={styles.control}>
          <button
            className={styles.button}
            type="button"
            onClick={handleEditClick}
          >
            <div className={clsx(styles.icon, styles.iconPencil)}>
              edit_outline
            </div>
          </button>
          <button
            className={styles.button}
            type="button"
            onClick={handleDeleteReview}
          >
            <div className={clsx(styles.icon, styles.iconDelete)}>
              delete_outline
            </div>
          </button>
        </div>
      )}

      {isEditable && (
        <div className={styles.comment}>
          <CommentCard
            roomId={roomId as string}
            isEdit={isEditable}
            text={text}
            onSubmit={handleEditClick}
            reviewId={id as string}
            likes={likes}
          />
        </div>
      )}
    </li>
  );
};

export { Review };
