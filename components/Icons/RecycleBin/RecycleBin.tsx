import React from 'react';

import classes from './RecycleBin.module.scss';

const RecycleBin: React.FC = () => (
  <div className={classes.recycleBin}>
    <svg
      className={classes.recycleBinImage}
      width="24"
      height="30"
      viewBox="0 0 24 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1.99998 26.6667C1.99998 28.5 3.49998 30 5.33331 30H18.6666C20.5 30 22 28.5 22 26.6667V6.66667H1.99998V26.6667ZM5.33331 10H18.6666V26.6667H5.33331V10ZM17.8333 1.66667L16.1666 0H7.83331L6.16665 1.66667H0.333313V5H23.6666V1.66667H17.8333Z" />
      <defs>
        <linearGradient
          id="paint1_linear"
          x1="12"
          y1="0"
          x2="12"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FE8025" />
          <stop offset="1" stopColor="#F36262" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

export { RecycleBin };
