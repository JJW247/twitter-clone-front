import React, { FC } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import Cards from '../components/common/Cards';
import Header from '../components/common/Header';

const Main: FC = () => {
  const fetcher = async (url: string) => {
    const response = await axios.get(url);

    return response.data;
  };

  const { data, error, mutate } = useSWR(
    `${process.env.REACT_APP_BACK_URL}/tweets`,
    fetcher,
  );

  if (!data) return <div>loading...</div>;
  if (error) return <div>error</div>;

  return (
    <>
      <Header title={'Home'} />
      <Cards tweets={data} />
    </>
  );
};

export default Main;
