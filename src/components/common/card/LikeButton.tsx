import React, { FC } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

import { ITweet } from '../../../interfaces';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

interface LikeButtonProps {
  tweet: ITweet;
  countMutate: (
    data?: any,
    shouldRevalidate?: boolean | undefined,
  ) => Promise<any>;
}

const LikeButton: FC<LikeButtonProps> = ({ tweet, countMutate }) => {
  const token = localStorage.getItem('token') || null;

  const fetcher = async (url: string) => {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  };

  const { data, error, mutate } = useSWR(
    `${process.env.REACT_APP_BACK_URL}/likes/tweets/islike/${tweet.id}`,
    fetcher,
  );

  const onClickLike = async () => {
    const response = await axios.put(
      `${process.env.REACT_APP_BACK_URL}/likes/tweets/${tweet.id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.statusText === 'OK') {
      mutate();
      countMutate();
    }
  };

  if (error) return <span>error</span>;

  return (
    <button>
      <FontAwesomeIcon
        className={`text-base ${data?.like && 'text-green-500'}`}
        icon={data?.like ? faHeart : farHeart}
        onClick={onClickLike}
      />
    </button>
  );
};

export default LikeButton;
