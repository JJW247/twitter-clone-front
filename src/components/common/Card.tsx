import React, { FC, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRetweet,
  faEllipsisH,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import {
  faComment as farComment,
  faHeart as farHeart,
  faTrashAlt as farTrashAlt,
  faClone as farClone,
} from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';

import ProfileIcon from './ProfileIcon';
import { ITweet } from '../../interfaces';
import { CreateTweetProps } from '../main/CreateTweet';

export interface CardProps extends CreateTweetProps {
  tweet: ITweet;
}

const Card: FC<CardProps> = ({ tweet, mutate }) => {
  dayjs.extend(relativeTime);

  const token = localStorage.getItem('token') || '';

  const [ellipsisToggle, setEllipsisToggle] = useState<boolean>(false);
  const [me, setMe] = useState<number | null>(null);

  const onClickEllipsis = () => {
    setEllipsisToggle(!ellipsisToggle);
  };
  const onClickDeleteTweet = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACK_URL}/tweets/${tweet.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.statusText === 'OK') {
        mutate();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getMe = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACK_URL}/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.statusText === 'OK') {
          setMe(response.data.userId);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getMe();
  }, []);

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
          <div className="w-full">
            <FontAwesomeIcon className="text-base" icon={farHeart} />
            <span className="ml-2">123</span>
          </div>
          <div className="w-full relative">
            <div className="w-6 h-6 rounded-full flex justify-center items-center hover:text-green-500 hover:bg-green-100">
              <button className="focus:outline-none" onClick={onClickEllipsis}>
                <FontAwesomeIcon className="text-base" icon={faEllipsisH} />
              </button>
            </div>
            {ellipsisToggle && (
              <div className="absolute bg-white shadow-md py-2 -ml-2 w-36">
                {me === tweet.users.id && (
                  <button
                    className="px-2 py-1 hover:bg-gray-200 w-full"
                    onClick={onClickDeleteTweet}
                  >
                    <FontAwesomeIcon icon={farTrashAlt} />
                    <span className="ml-4">Delete tweet</span>
                  </button>
                )}
                <button className="px-2 py-1 hover:bg-gray-200 w-full">
                  <FontAwesomeIcon icon={faExclamationTriangle} />
                  <span className="ml-4">Report tweet</span>
                </button>
                <button className="px-2 py-1 hover:bg-gray-200 w-full">
                  <FontAwesomeIcon icon={farClone} />
                  <span className="ml-4">Copy tweet</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default Card;
