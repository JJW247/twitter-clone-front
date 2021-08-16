import React, { FC } from 'react';
import { ITweet } from '../../interfaces';
import ProfileIcon from './ProfileIcon';

export interface CardProps {
  tweet: ITweet;
}

const Card: FC<CardProps> = ({ tweet }) => {
  return (
    <li className="flex">
      <div className="mt-4 mx-4">
        <ProfileIcon />
      </div>
      <div className="mt-6 text-sm">
        <div className="font-bold">
          {tweet.user.nickname} {tweet.createdAt}
        </div>
        <div className="font">{tweet.tweet}</div>
      </div>
    </li>
  );
};

export default Card;
