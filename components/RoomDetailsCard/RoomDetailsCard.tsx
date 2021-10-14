import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';

import { useStore } from '@/libs/hooks/useStore';
import { RoomInfo } from '@/RoomInfo';
import { RoomRulesCard } from '@/RoomRulesCard';
import { Diagram } from '@/Diagram';
import { CostCard } from '@/CostCard';
import { ReviewList } from '@/ReviewList';
import { LoadingPopup } from '@/LoadingPopup';
import { Keys } from '@/RoomInfo/types';
import { WarningPopup } from '@/WarningPopup';
import { CommentCard } from '@/CoommentCard';
import { ReviewItemProps } from '@/ReviewList/type';

import styles from './RoomDetailsCard.module.scss';

const RoomDetailsCard = observer((): JSX.Element => {
  const { t } = useTranslation('roomInfo');

  const {
    roomStore,
    authStore: { user },
  } = useStore();
  const [isShowPopup, setShowPopup] = useState(false);
  const router = useRouter();
  const { roomId } = router.query;

  const {
    room: roomInfo,
    roomError,
    reviews,
    isLoadingRoomData: isRoomInfoLoading,
    fetchRoom,
    getReviews,
  } = roomStore;
  const { images, rules, features: featuresList, votes } = roomInfo || {};

  const [reviewsElements, setReviewsElements] = useState<
    Array<ReviewItemProps>
  >([]);

  const featuresArray = useRef<string[] | null>(null);
  useEffect(() => {
    if (featuresList) {
      const confirmedParams = Object.entries(featuresList).filter(
        (item) => item[1],
      );
      featuresArray.current = confirmedParams.map((item) => item[0]);
    }
  }, [featuresList]);

  const onPopupClick = (): void => {
    setShowPopup((prev) => !prev);
    router.push('/rooms/search-room');
  };

  useEffect(() => {
    if (!roomInfo && roomId) {
      fetchRoom(roomId as string);
      getReviews({ roomId: roomId as string });
    }
  }, [roomInfo, roomId, fetchRoom, getReviews]);

  useEffect(() => {
    if (reviews) {
      const keys = Object.keys(reviews);
      setReviewsElements(() => {
        return keys.map(
          (key) => ({ ...reviews[key], id: key } as ReviewItemProps),
        );
      });
    }
  }, [reviews]);

  useEffect(() => {
    setShowPopup(!roomError && !roomInfo);
  }, [roomError, roomInfo]);

  return (
    <div className={styles.roomDetails}>
      {isRoomInfoLoading && !roomError && <LoadingPopup />}

      {roomError && (
        <div className={styles.errorWrapper}>
          <WarningPopup isShow={isShowPopup} onClick={onPopupClick} />
        </div>
      )}

      {roomInfo && !roomError && (
        <>
          {images && (
            <>
              <div className={styles.gallery}>
                {images.map(
                  (item, index) =>
                    index < 3 && (
                      <figure className={clsx(styles.galleryItem)} key={item}>
                        <img
                          className={clsx(styles.image)}
                          src={`${item}`}
                          alt="room"
                        />
                      </figure>
                    ),
                )}
              </div>
            </>
          )}

          <article className={styles.wrapper}>
            <div className={styles.column}>
              <div className={styles.containerRow}>
                <div className={styles.roomInfo}>
                  {featuresArray.current && (
                    <RoomInfo
                      params={featuresArray.current as Keys[]}
                      title={t('informationRoom')}
                    />
                  )}
                </div>
                <div className={styles.diagram}>
                  <Diagram
                    great={votes?.great}
                    good={votes?.good}
                    satisfactorily={votes?.satisfactorily}
                    bad={votes?.bad}
                    terrible={votes?.terrible}
                  />
                </div>
              </div>
              <div className={styles.containerComments}>
                <ReviewList
                  roomId={roomId as string}
                  title={t('guestReviews')}
                  totalReview={Object.keys(reviewsElements).length}
                  reviewList={[...reviewsElements]}
                />
                {user && <CommentCard roomId={roomId as string} />}
              </div>
              <div className={styles.containerRow}>
                <div className={styles.roomRules}>
                  {rules && <RoomRulesCard rules={rules} />}
                </div>
                <div className={styles.roomCancel}>
                  <h2 className={styles.roomCancelTitle}>{t('cancel')}</h2>
                  <p className={styles.roomCancelText}>
                    {t('freeCancellation')}
                  </p>
                </div>
              </div>
            </div>

            <aside className={styles.sidebar}>
              <div className={styles.card}>
                <CostCard roomId={roomId as string} />
              </div>
            </aside>
          </article>
        </>
      )}
    </div>
  );
});

export { RoomDetailsCard };
