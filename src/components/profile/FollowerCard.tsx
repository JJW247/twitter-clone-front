import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { IFollower } from '../../interfaces';
import ProfileIcon from '../common/ProfileIcon';

interface FollowerCardProps {
  follower: IFollower;
}

const FollowCard: FC<FollowerCardProps> = ({ follower }) => {
  return (
    <li className="flex border-b-1">
      <Link className="mt-4 mx-4" to={`/profile/${follower.following.id}`}>
        <ProfileIcon userId={follower.following.id} />
      </Link>
      <div className="mt-6 text-sm w-full mr-4">
        <Link to={`/profile/${follower.following.id}`}>
          <span className="font-bold">{follower.following.nickname}</span>
        </Link>
        <div className="mt-1 mb-4">
          {follower.following.introduce
            ? follower.following.introduce
            : "Let's go twitter-clone coding!!!"}
        </div>
      </div>
    </li>
  );
};

export default FollowCard;
