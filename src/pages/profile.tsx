import axios from 'axios';
import React, { FC, useEffect } from 'react';
import { useSWRInfinite } from 'swr';
import { useParams } from 'react-router-dom';
import Cards from '../components/common/card/Cards';

import Header from '../components/common/Header';
import UserInfo from '../components/profile/UserInfo';
import { useInfiniteScroll } from '../hooks';
import { ITweet } from '../interfaces';

const getKey =
  (userId: string) => (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null;
    return `${process.env.REACT_APP_BACK_URL}/tweets/${userId}?page=${pageIndex}`;
  };

const Profile: FC = () => {
  const { userId } = useParams<{ userId: string }>();

  const fetcher = async (url: string) => {
    try {
      const response = await axios.get(url);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const { data, size, setSize, error, mutate } = useSWRInfinite<ITweet[]>(
    getKey(userId),
    fetcher,
  );

  const { lastEl } = useInfiniteScroll({ data, size, setSize });

  if (!data) return <div>loading...</div>;
  if (error) return <div>error</div>;

  return (
    <>
      <Header title="Profile" />
      <UserInfo userId={userId} />
      {data.map((tweets, i) => {
        return <Cards key={i} tweets={tweets} mutate={mutate} />;
      })}
      <div ref={lastEl} className="text-white">
        twitter-clone
      </div>
    </>
  );
};

export default Profile;
