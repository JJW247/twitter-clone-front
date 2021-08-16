import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const ProfileIcon: FC = () => {
  return (
    <div className="rounded-full h-12 w-12 flex items-center justify-center bg-gray-300 hover:bg-gray-400">
      <FontAwesomeIcon className="text-3xl text-gray-600" icon={faUser} />
    </div>
  );
};

export default ProfileIcon;
