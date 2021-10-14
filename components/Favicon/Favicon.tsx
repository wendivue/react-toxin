import React, { FC } from 'react';

const Favicon: FC = () => {
  return (
    <>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/assets/img/favicon/apple-touch-icon.png?v2=wAMm90QQmQ"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/assets/img/favicon/favicon-32x32.png?v2=wAMm90QQmQ"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/assets/img/favicon/favicon-16x16.png?v2=wAMm90QQmQ"
      />
      <link
        rel="manifest"
        href="/assets/img/favicon/site.webmanifest?v2=wAMm90QQmQ"
      />
      <link
        rel="mask-icon"
        href="/assets/img/favicon/safari-pinned-tab.svg?v2=wAMm90QQmQ"
        color="#5bbad5"
      />
      <link
        rel="shortcut icon"
        href="/assets/img/favicon/favicon.ico?v2=wAMm90QQmQ"
      />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
      <meta
        name="msapplication-config"
        content="/assets/img/favicon/browserconfig.xml"
      />
    </>
  );
};

export { Favicon };
