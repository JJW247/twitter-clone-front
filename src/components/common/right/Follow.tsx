import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { IFollow } from '../../../interfaces';
import ProfileIcon from '../ProfileIcon';

interface FollowProps {
  follow: IFollow;
}

const Follow: FC<FollowProps> = ({ follow }) => {
  return (
    <div className="flex px-4 py-2 hover:bg-gray-300">
      <ProfileIcon />
      <div className="ml-2 flex-auto flex items-center justify-between">
        <div>
          <div>{follow.nickname}</div>
          {follow.introduce ? (
            <div>{follow.introduce}</div>
          ) : (
            <div>Twitter-clone</div>
          )}
        </div>
        <Link to={`/profile/${follow.id}`}>
          <button className="rounded-full px-4 py-2 font-black text-white bg-black text-sm">
            View profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Follow;
