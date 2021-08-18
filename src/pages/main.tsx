import React, { createRef, FC, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSWRInfinite } from 'swr';

import Cards from '../components/common/Cards';
import Header from '../components/common/Header';
import CreateTweet from '../components/main/CreateTweet';
import { ITweet } from '../interfaces';

const getKey = (pageIndex: number, previousPageData: any) => {
  if (previousPageData && !previousPageData.length) return null;
  return `${process.env.REACT_APP_BACK_URL}/tweets?page=${pageIndex}`;
};

const Main: FC = () => {
  const observer = useRef<IntersectionObserver>();
  const lastEl = createRef<HTMLDivElement>();
  const sizeRef = useRef<number>(1);

  const fetcher = async (url: string) => {
    try {
      const response = await axios.get(url);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const { data, size, setSize, error, mutate } = useSWRInfinite<ITweet[]>(
    getKey,
    fetcher,
  );

  useEffect(() => {
    if (data && !data[size - 1]) {
      return;
    }

    if (!observer.current && lastEl.current) {
      observer.current = new IntersectionObserver(async (entries) => {
        if (!entries[0].isIntersecting) return;
        sizeRef.current += 1;
        await setSize(sizeRef.current);
      });

      observer.current.observe(lastEl.current);
    }
  }, [lastEl]);

  if (!data) return <div>loading...</div>;
  if (error) return <div>error</div>;

  return (
    <>
      <Header title={'Home'} />
      <CreateTweet mutate={mutate} />
      {data.map((tweets, i) => {
        return <Cards key={i} tweets={tweets} mutate={mutate} />;
      })}
      <div ref={lastEl} className="text-white">
        twitter-clone
      </div>
    </>
  );
};

export default Main;
