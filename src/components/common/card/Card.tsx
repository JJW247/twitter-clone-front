import React, { FC } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';
import { faComment as farComment } from '@fortawesome/free-regular-svg-icons';

import ProfileIcon from '../ProfileIcon';
import { ITweet } from '../../../interfaces';
import { CreateTweetProps } from '../../main/CreateTweet';
import Ellipsis from './Ellipsis';
import Like from './Like';

export interface CardProps extends CreateTweetProps {
  tweet: ITweet;
  ellipsisEl: React.MutableRefObject<HTMLDivElement | null>;
}

const Card: FC<CardProps> = ({ tweet, mutate, ellipsisEl }) => {
  dayjs.extend(relativeTime);

  return (
    <li className="flex border-b-1">
      <div className="mt-4 mx-4">
        <ProfileIcon />
      </div>
      <div className="mt-6 text-sm w-full mr-4">
        <div>
          <span className="font-bold">{tweet.users.nickname}</span>
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
          <Like tweet={tweet} />
          <Ellipsis tweet={tweet} mutate={mutate} ellipsisEl={ellipsisEl} />
        </div>
      </div>
    </li>
  );
};

export default Card;
