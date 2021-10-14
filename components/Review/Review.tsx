import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'next-i18next';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';
import moment from 'moment';
import 'moment/locale/ru';

import { roomDeleteReview } from 'store/room/roomAction';
import { KeyProps } from '@/Like/type';
import { Like } from '@/Like';
import { CommentCard } from '@/CoommentCard';
import { useStore } from '@/libs/hooks/useStore';

import styles from './Review.module.scss';
import { ReviewProps } from './type';

const Review: FC<ReviewProps> = observer(
  ({ isControl = false, img, name, likes, id, text, date, roomId }) => {
    const { t } = useTranslation('roomInfo');
    const [isLikeActive, setIsLikeActive] = useState<KeyProps | null>(null);
    const dispatch = useDispatch();
    const {
      authStore: { user, isUserLoading, updateUserLikesWorker },
    } = useStore();

    const [isEditable, setIsEditable] = useState(false);
    const isAuthUser = Boolean(user);
    const disabled = !isAuthUser || isUserLoading;

    const addLikesList = useCallback((): string[] | undefined => {
      let key;
      let likesList = user?.userInfo.reviewLikes;
      if (isLikeActive && isLikeActive[1]) [key] = isLikeActive;

      if (likesList && isLikeActive) {
        likesList = likesList.filter((item) => item !== isLikeActive[0]);
      }

      if (key) {
        key = key.toString();

        if (likesList) {
          likesList = [...likesList, key];
        } else {
          likesList = [key];
        }
      }

      return likesList;
    }, [isLikeActive]);

    const createDateAgo = (dateReview: Date): string => {
      const dateAgo = moment(dateReview).subtract('days').fromNow();
      const now = moment();

      const weeks = now.diff(dateReview, 'weeks');
      const isWeeks = weeks && weeks <= 4;

      if (isWeeks) {
        return t('reviewDate', { count: weeks, date: weeks });
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
    useEffect(() => {
      const likesList = addLikesList();

      if (likesList) updateUserLikesWorker({ likes: likesList });
    }, [dispatch, addLikesList]);

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
            onChange={setIsLikeActive}
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
  },
);

export { Review };
