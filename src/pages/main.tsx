import React, { FC } from 'react';
import axios from 'axios';
import useSWR from 'swr';

import Cards from '../components/common/Cards';
import Header from '../components/common/Header';
import CreateTweet from '../components/main/CreateTweet';
import { ITweet } from '../interfaces';

const Main: FC = () => {
  const fetcher = async (url: string) => {
    try {
      const response = await axios.get(url);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const { data, error, mutate } = useSWR<ITweet[]>(
    `${process.env.REACT_APP_BACK_URL}/tweets`,
    fetcher,
  );

  if (!data) return <div>loading...</div>;
  if (error) return <div>error</div>;

  return (
    <>
      <Header title={'Home'} />
      <CreateTweet mutate={mutate} />
      <Cards tweets={data} />
    </>
  );
};

export default Main;
