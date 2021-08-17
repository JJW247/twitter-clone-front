import React, { FC } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

import { ITweet } from '../../interfaces';
import ProfileIcon from './ProfileIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';
import {
  faComment as farComment,
  faHeart as farHeart,
  faCopy as farCopy,
} from '@fortawesome/free-regular-svg-icons';

export interface CardProps {
  tweet: ITweet;
}

const Card: FC<CardProps> = ({ tweet }) => {
  dayjs.extend(relativeTime);

  return (
    <li className="flex border-b-1">
      <div className="mt-4 mx-4">
        <ProfileIcon />
      </div>
      <div className="mt-6 text-sm w-full mr-4">
        <div>
          <span className="font-bold">{tweet.user.nickname}</span>
          <span className="ml-2 text-gray-500">
            {dayjs(tweet.createdAt).locale('ko').fromNow()}
          </span>
        </div>
        <div className="font">{tweet.tweet}</div>
        <div className="flex justify-between my-4">
          <div className="w-full">
            <FontAwesomeIcon className="text-base" icon={farComment} />
            <span className="ml-2">123</span>
          </div>
          <div className="w-full">
            <FontAwesomeIcon className="text-base" icon={faRetweet} />
            <span className="ml-2">123</span>
          </div>
          <div className="w-full">
            <FontAwesomeIcon className="text-base" icon={farHeart} />
            <span className="ml-2">123</span>
          </div>
          <div className="w-full">
            <FontAwesomeIcon className="text-base" icon={farCopy} />
          </div>
        </div>
      </div>
    </li>
  );
};

export default Card;
