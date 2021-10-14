import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { Transition } from 'react-transition-group';

import styles from './MenuItem.module.scss';
import type { MenuElement, TransitionStyles } from './types';

const MenuItem: React.FC<MenuElement> = ({ text, href, more, active }) => {
  const [popup, setPopup] = React.useState(false);

  const duration = 300;

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
  };

  const transitionStyles: TransitionStyles = {
    entering: { opacity: 1, display: 'block' },
    entered: { opacity: 1, display: 'block' },
    exiting: { opacity: 0 },
    exited: { opacity: 0, display: 'none' },
  };

  let drop: React.ReactElement[];

  const handleMouseMove = (): void => {
    setPopup((st) => !st);
  };
  const handleClick = (): void => {
    setPopup(true);
  };

  if (more) {
    drop = more.map((el, ind) => {
      return (
        <li key={`list_${ind * 2}`} className={styles.dropItem}>
          <Link href={el.href || '/'} passHref>
            <a href="replace" className={styles.link}>
              {el.text}
            </a>
          </Link>
        </li>
      );
    });
  }

  return (
    <li
      className={clsx(
        styles.item,
        active && styles.itemActive,
        more && styles.itemWithList,
      )}
      onMouseEnter={handleMouseMove}
      onMouseLeave={handleMouseMove}
    >
      {more ? (
        <span className={styles.link}>{text}</span>
      ) : (
        <Link href={href || '/'} passHref>
          <a href="replace" className={styles.link}>
            {text}
          </a>
        </Link>
      )}

      {more && (
        <>
          <button
            className={clsx(styles.icon, popup && styles.iconActive)}
            type="button"
            onClick={handleClick}
          >
            expand_more
          </button>
          <Transition in={popup} timeout={duration}>
            {(state: string) => (
              <ul
                style={{
                  ...defaultStyle,
                  ...transitionStyles[state],
                }}
                className={styles.drop}
              >
                {drop}
              </ul>
            )}
          </Transition>
        </>
      )}
    </li>
  );
};

export { MenuItem };
