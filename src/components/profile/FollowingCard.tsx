import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { IFollowing } from '../../interfaces';
import ProfileIcon from '../common/ProfileIcon';

interface FollowingCardProps {
  following: IFollowing;
}

const FollowingCard: FC<FollowingCardProps> = ({ following }) => {
  return (
    <li className="flex border-b-1">
      <Link className="mt-4 mx-4" to={`/profile/${following.follower.id}`}>
        <ProfileIcon userId={following.follower.id} />
      </Link>
      <div className="mt-6 text-sm w-full mr-4">
        <Link to={`/profile/${following.follower.id}`}>
          <span className="font-bold">{following.follower.nickname}</span>
        </Link>
        <div className="mt-1 mb-4">
          {following.follower.introduce
            ? following.follower.introduce
            : "Let's go twitter-clone coding!!!"}
        </div>
      </div>
    </li>
  );
};

export default FollowingCard;
