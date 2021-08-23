import React, { FC } from 'react';

import Header from '../components/common/Header';
import UserInfo from '../components/profile/UserInfo';

const Profile: FC = () => {
  return (
    <>
      <Header title="Profile" />
      <UserInfo />
    </>
  );
};

export default Profile;
