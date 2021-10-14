import React, { FC } from 'react';
import { useTranslation } from 'next-i18next';

import { Review } from '@/Review';
import { useTypedSelector } from '@/libs/hooks/useTypedSelector';

import { dateFromJSON } from '../../helpers/timestampJSONFormatter';
import styles from './ReviewList.module.scss';
import { ReviewListProps } from './type';

const ReviewList: FC<ReviewListProps> = ({
  title,
  totalReview = 0,
  reviewList,
  roomId,
}) => {
  const { t } = useTranslation('common');
  const authUserState = useTypedSelector((state) => state.auth.user);
  return (
    <section className={styles.reviews}>
      <div className={styles.wrapperTitle}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.totalText}>
          {totalReview} {t('reviews', { count: totalReview })}
        </p>
      </div>

      <ul className={styles.reviewList}>
        {reviewList.map(
          ({ name, date, text, img, likes, id, userId }, index) => {
            const isControl = userId === authUserState?.firebaseUser.uid;
            return (
              <Review
                roomId={roomId}
                isControl={isControl}
                key={index.toString()}
                name={name}
                date={dateFromJSON(date)}
                text={text}
                img={img}
                likes={likes}
                id={id}
              />
            );
          },
        )}
      </ul>
    </section>
  );
};

export { ReviewList };
