import React from 'react';
import clsx from 'clsx';
import { Transition } from 'react-transition-group';

import styles from './SubscribeResultPopup.module.scss';

const SubscribeResultPopup: React.FC<{
  isError: boolean;
  isVisible: boolean;
  text: string;
}> = ({ isError, isVisible, text }) => {
  const transitionDuration = 150;
  const transitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
    unmounted: {},
  };

  return (
    <Transition in={isVisible} timeout={transitionDuration} unmountOnExit>
      {(state) => (
        <div
          style={{
            transition: `opacity ${transitionDuration}ms ease-in-out`,
            ...transitionStyles[state],
          }}
          className={clsx(
            styles.subscribeResultPopup,
            isError
              ? styles.subscribeResultPopupError
              : styles.subscribeResultPopupSuccess,
          )}
        >
          {text}
        </div>
      )}
    </Transition>
  );
};

export { SubscribeResultPopup };
