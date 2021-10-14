import React, { FC } from 'react';

import styles from './SubmitPopup.module.scss';
import { DoneSVG } from './DoneSVG';

const SubmitPopup: FC = () => {
  return (
    <div className={styles.popup}>
      <div className={styles.done}>
        <DoneSVG />
      </div>
    </div>
  );
};

export { SubmitPopup };
