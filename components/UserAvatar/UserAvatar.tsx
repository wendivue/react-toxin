import React, { useEffect, useState } from 'react';

import classes from './UserAvatar.module.scss';

const defaultAvatarUrl = '/assets/img/default-avatar.jpg';

const UserAvatar: React.FC<{ url: string | null }> = ({ url }) => {
  const [avatarUrl, setAvatarUrl] = useState(url || defaultAvatarUrl);

  const handleAvatarError = (): void => setAvatarUrl(defaultAvatarUrl);

  useEffect(() => {
    if (url) {
      setAvatarUrl(url);
    }
  }, [url]);

  return (
    <img
      className={classes.userAvatar}
      onError={handleAvatarError}
      src={avatarUrl}
      alt="avatar"
    />
  );
};

export { UserAvatar };
