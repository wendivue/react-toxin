import React, { useCallback, useEffect } from 'react';
import { Transition } from 'react-transition-group';

import { Backdrop } from '@/Backdrop';

import classes from './Modal.module.scss';

const Modal: React.FC<{ isVisible: boolean; onClose: () => void }> = ({
  isVisible,
  onClose,
  children,
}) => {
  const handleDocumentKeydown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose],
  );

  const panelTransitionDuration = 300;
  const panelTransitionStyles: Record<string, { opacity: number }> = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };

  useEffect(() => {
    document.addEventListener('keydown', handleDocumentKeydown);
    return () => document.removeEventListener('keydown', handleDocumentKeydown);
  }, [handleDocumentKeydown]);

  return (
    <Transition
      in={isVisible}
      timeout={{
        exit: panelTransitionDuration,
        enter: 0,
      }}
      unmountOnExit
    >
      {(state: string) => (
        <div
          style={{
            transition: `opacity ${panelTransitionDuration}ms linear`,
            ...panelTransitionStyles[state],
          }}
          className={classes.modal}
        >
          <Backdrop onClick={onClose} />
          {children}
        </div>
      )}
    </Transition>
  );
};

export { Modal };
