import axios from 'axios';
import { useContext } from 'react';
import useSWR from 'swr';
import { MeContext } from '../contexts/meContext';
import { IFollower, IFollowing } from '../interfaces';

export const useFollower = () => {
  const { me } = useContext(MeContext);

  const fetcher = async (url: string) => {
    try {
      const response = await axios.get(url);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const { data, error, mutate } = useSWR<IFollower[]>(
    `${process.env.REACT_APP_BACK_URL}/users/followers/${me}`,
    fetcher,
  );

  return { data, error, mutate };
};

export const useFollowing = () => {
  const { me } = useContext(MeContext);

  const fetcher = async (url: string) => {
    try {
      const response = await axios.get(url);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const { data, error, mutate } = useSWR<IFollowing[]>(
    `${process.env.REACT_APP_BACK_URL}/users/followings/${me}`,
    fetcher,
  );

  return { data, error, mutate };
};
