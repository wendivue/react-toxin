import React, { FC, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import styles from './Animation.module.scss';
import type { AnimationProps } from './types';

const Animation: FC<AnimationProps> = ({ tumbler, children }) => {
  const [height, setHeight] = useState<string | number>('');

  return (
    <>
      <CSSTransition
        in={tumbler}
        timeout={330}
        unmountOnExit
        classNames={{
          enter: styles.enter,
          enterActive: styles.enterActive,
          exit: styles.exit,
          exitActive: styles.exitActive,
        }}
        onEnter={(el: HTMLElement) => {
          const node = el;
          if (!height) {
            setHeight(el.offsetHeight);
          }

          node.style.height = '0';
        }}
        onEntering={(el: HTMLElement) => {
          const node = el;
          node.style.height = `${height}px`;
        }}
        onExiting={(el: HTMLElement) => {
          const node = el;
          node.style.height = '0';
        }}
      >
        <div className={styles.animation}>{children} </div>
      </CSSTransition>
    </>
  );
};

export { Animation };
