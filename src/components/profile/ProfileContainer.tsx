import React, { FC } from 'react';
import Header from '../common/Header';
import UserInfo from './UserInfo';

interface ProfileContainerProps {
  userId: string;
}

const ProfileContainer: FC<ProfileContainerProps> = ({ children, userId }) => {
  return (
    <>
      <Header title="Profile" />
      <UserInfo userId={userId} />
      {children}
    </>
  );
};

export default ProfileContainer;
