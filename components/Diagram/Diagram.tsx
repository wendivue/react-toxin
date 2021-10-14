import clsx from 'clsx';
import React, { FC, useState } from 'react';
import { useTranslation } from 'next-i18next';

import { gradients, legendElements } from 'const/diagram';

import styles from './Diagram.module.scss';
import type { DiagramProps, SVGElementProps } from './type';

const Diagram: FC<DiagramProps> = ({
  great = 0,
  good = 0,
  satisfactorily = 0,
  bad = 0,
  terrible = 0,
}) => {
  const { t } = useTranslation('diagram');
  const [isShowTotalVotes, setIsShowTotalVotes] = useState(true);
  const [isShowVotes, setIsShowVotes] = useState<unknown>(null);
  const totalVotes = great + good + satisfactorily + bad + terrible;
  const isInteger = (votes: number): number => {
    if (Number.isInteger(votes)) {
      return (votes / totalVotes) * 100;
    }
    return 0;
  };
  const greatPercent = isInteger(great);
  const goodPercent = isInteger(good);
  const satisfactorilyPercent = isInteger(satisfactorily);
  const badPercent = isInteger(bad);
  const terriblePercent = isInteger(terrible);
  const svgElements: SVGElementProps = {
    great: {
      gradient: 'url(#lgrad0)',
      strokeDasharray: `${greatPercent - 0.5 < 0 ? 0 : greatPercent - 0.5} ${
        100 - greatPercent + 0.5
      }`,
      strokeDashoffset: `${
        100 -
        terriblePercent -
        satisfactorilyPercent -
        goodPercent -
        badPercent +
        25
      }`,
      votes: great,
    },
    good: {
      gradient: 'url(#lgrad1)',
      strokeDasharray: `${goodPercent - 0.5 < 0 ? 0 : goodPercent - 0.5} ${
        100 - goodPercent + 0.5
      }`,
      strokeDashoffset: `${
        100 - terriblePercent - satisfactorilyPercent - badPercent + 25
      }`,
      votes: good,
    },
    satisfactorily: {
      gradient: 'url(#lgrad2)',
      strokeDasharray: `${
        satisfactorilyPercent - 0.5 < 0 ? 0 : satisfactorilyPercent - 0.5
      } ${100 - satisfactorilyPercent + 0.5}`,
      strokeDashoffset: `${100 - terriblePercent - badPercent + 25}`,
      votes: satisfactorily,
    },
    bad: {
      gradient: 'url(#lgrad3)',
      strokeDasharray: `${badPercent - 0.5 < 0 ? 0 : badPercent - 0.5} ${
        100 - badPercent + 0.5
      }`,
      strokeDashoffset: `${100 - terriblePercent + 25}`,
      votes: bad,
    },
    terrible: {
      gradient: 'url(#lgrad4)',
      strokeDasharray: `${
        terriblePercent - 0.5 < 0 ? 0 : terriblePercent - 0.5
      } ${100 - terriblePercent + 0.5}`,
      strokeDashoffset: '25',
      votes: terrible,
    },
  };

  const makeHandlerMouseOver = (i: number) => {
    return () => {
      setIsShowTotalVotes(false);
      setIsShowVotes(i);
    };
  };
  const handlerMouseOut = (): void => {
    setIsShowTotalVotes(true);
    setIsShowVotes(null);
  };

  const circleSVGElements = Object.keys(svgElements).map((key, i) => {
    const { gradient, strokeDasharray, strokeDashoffset, votes } =
      svgElements[key];

    return (
      <g key={`g_${i + 1}`}>
        {votes && (
          <circle
            className={clsx(styles.unit, isShowVotes === i && styles.hovered)}
            cx="20"
            cy="20"
            r="15.91549430918954"
            fill="none"
            stroke={gradient}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            onMouseOver={makeHandlerMouseOver(i)}
            onFocus={makeHandlerMouseOver(i)}
            onMouseOut={handlerMouseOut}
            onBlur={handlerMouseOut}
          />
        )}

        <g
          fill={gradient}
          className={clsx(
            styles.chartNumber,
            isShowVotes !== i && styles.chartNumberHidden,
          )}
        >
          <text x="48%" y="50.5%">
            {votes}
          </text>
          <text x="48%" y="50.5%" className={styles.chartLabel}>
            {t('vote', { count: votes })}
          </text>
        </g>
      </g>
    );
  });
  const gradientSVGElements = gradients.map(({ start, end }, ind) => {
    return (
      <linearGradient
        key={`grad_${ind + 1}`}
        id={`lgrad${ind}`}
        x1="50%"
        y1="100%"
        x2="50%"
        y2="0%"
      >
        <stop offset="0%" stopColor={`rgb(${start})`} stopOpacity="1" />
        <stop offset="100%" stopColor={`rgb(${end})`} stopOpacity="1" />
      </linearGradient>
    );
  });

  return (
    <div className={styles.diagram}>
      <h2 className={styles.title}>{t('impressions')}</h2>
      <div className={styles.img}>
        <svg
          width="150px"
          height="150px"
          viewBox="0 0 42 42"
          className={styles.donut}
        >
          <defs>{gradientSVGElements}</defs>
          <g
            fill="#1f2041"
            className={clsx(
              styles.chartNumber,
              !isShowTotalVotes && styles.chartNumberHidden,
            )}
          >
            <text x="48%" y="50.5%">
              {totalVotes}
            </text>

            <text x="48%" y="50.5%" className={styles.chartLabel}>
              {t('vote', { count: totalVotes })}
            </text>
          </g>
          {circleSVGElements}
        </svg>
        <ul className={styles.legend}>
          {legendElements.map((text, i) => {
            return (
              <li
                key={text}
                className={styles.legendEl}
                onMouseOver={makeHandlerMouseOver(i)}
                onFocus={makeHandlerMouseOver(i)}
                onMouseOut={handlerMouseOut}
                onBlur={handlerMouseOut}
              >
                {t(text)}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export { Diagram };
