import React, { FC, MutableRefObject, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import useSWR from 'swr';

import ProfileIcon from '../ProfileIcon';
import { IComment } from '../../../interfaces';
import Ellipsis, { EllipsisProps } from './Ellipsis';
import Like from './Like';
import CommentsButton from './CommentsButton';
import CommentForm from './CommentForm';
import Comment from './Comment';

export interface CardProps extends EllipsisProps {
  commentsEl: MutableRefObject<HTMLDivElement | null>;
}

const Card: FC<CardProps> = ({ tweet, mutate, ellipsisEl, commentsEl }) => {
  dayjs.extend(relativeTime);

  const [commentsToggle, setCommentsToggle] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');

  const commentsToggleHandler = (e: any) => {
    if (
      commentsToggle &&
      (!commentsEl.current || !commentsEl.current.contains(e.target))
    ) {
      setCommentsToggle(false);
    }
  };

  const fetcher = async (url: string) => {
    try {
      const response = await axios.get(url);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const commentsCountFetcher = async (url: string) => {
    try {
      const response = await axios.get(url);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const { data, mutate: commentsMutate } = useSWR<IComment[]>(
    `${process.env.REACT_APP_BACK_URL}/comments/tweets/${tweet.id}`,
    fetcher,
  );
  const { data: commentsCountData, mutate: commentsCountMutate } =
    useSWR<number>(
      `${process.env.REACT_APP_BACK_URL}/comments/count/tweets/${tweet.id}`,
      commentsCountFetcher,
    );

  useEffect(() => {
    window.addEventListener('click', commentsToggleHandler);

    return () => window.removeEventListener('click', commentsToggleHandler);
  });

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
          <CommentsButton
            commentsToggle={commentsToggle}
            setCommentsToggle={setCommentsToggle}
            commentsCountData={commentsCountData}
          />
          <div className="w-full">
            <FontAwesomeIcon className="text-base" icon={faRetweet} />
            <span className="ml-2">123</span>
          </div>
          <Like tweet={tweet} />
          <Ellipsis tweet={tweet} mutate={mutate} ellipsisEl={ellipsisEl} />
        </div>
        {commentsToggle && (
          <div ref={commentsEl}>
            <CommentForm
              comment={comment}
              setComment={setComment}
              tweet={tweet}
              commentsMutate={commentsMutate}
              commentsCountMutate={commentsCountMutate}
            />
            {data && (
              <ul>
                {data.map((v) => {
                  return <Comment key={v.id} comment={v} />;
                })}
              </ul>
            )}
          </div>
        )}
      </div>
    </li>
  );
};

export default Card;
