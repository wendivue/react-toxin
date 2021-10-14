import React, { FC, useEffect, useState } from 'react';
import clsx from 'clsx';

import styles from './Pagination.module.scss';
import { PaginationProps } from './types';

const Pagination: FC<PaginationProps> = ({ pagesCount, caption, onChange }) => {
  const [pages, setPages] = useState<Array<number>>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setPages(
      [...Array(Number(pagesCount)).keys()].map((pageNumber) => pageNumber + 1),
    );
  }, [pagesCount]);

  const handleSetNextPage = (): void => {
    setCurrentPage((page) => page + 1);
    onChange(currentPage + 1);
  };
  const handleSetPrevPage = (): void => {
    setCurrentPage((page) => page - 1);
    onChange(currentPage - 1);
  };

  const makeHandleClick = (value: number) => {
    return () => {
      onChange(value);
      setCurrentPage(value);
    };
  };

  const isInRangeFromTo = (el: number): boolean => {
    const last = pages[pages.length - 1];
    const isClosestToCurrent = el >= currentPage - 1 && el <= currentPage + 1;
    const isFirst = el === 1;
    const isLast = el === pages[pages.length - 1];
    return (
      isFirst ||
      (currentPage === 1 && el === 3) ||
      (currentPage === last && el === last - 2) ||
      isClosestToCurrent ||
      isLast
    );
  };

  const listPages = pages.map((el) => {
    const isInRange = isInRangeFromTo(el);
    if (isInRange) {
      return (
        <li
          key={el}
          className={clsx(
            styles.item,
            el === currentPage && styles.itemCurrent,
          )}
        >
          <button
            type="button"
            className={styles.button}
            onClick={makeHandleClick(el)}
          >
            {el}
          </button>
        </li>
      );
    }

    if (!isInRangeFromTo(pages[el - 2])) {
      return '';
    }

    return (
      <li key={el} className={styles.item}>
        ...
      </li>
    );
  });

  return (
    <div className={styles.pagination}>
      {pages.length > 1 && (
        <>
          <ul className={styles.items}>
            {currentPage > 2 && (
              <li className={styles.prev}>
                <button
                  type="button"
                  className={styles.button}
                  onClick={handleSetPrevPage}
                >
                  <div className={styles.icon}>arrow_forward</div>
                </button>
              </li>
            )}
            {listPages}
            {currentPage < pages.length - 1 && (
              <li className={styles.next}>
                <button
                  type="button"
                  className={styles.button}
                  onClick={handleSetNextPage}
                >
                  <div className={styles.icon}>arrow_forward</div>
                </button>
              </li>
            )}
          </ul>
          <div className={styles.caption}>{caption}</div>
        </>
      )}
    </div>
  );
};
export { Pagination };
