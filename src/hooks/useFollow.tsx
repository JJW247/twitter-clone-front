import axios from 'axios';
import useSWR from 'swr';
import { IFollower, IFollowing } from '../interfaces';

export const useFollower = () => {
  const fetcher = async (url: string) => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const { data, error, mutate } = useSWR<IFollower[]>(
    `${process.env.REACT_APP_BACK_URL}/users/follower`,
    fetcher,
  );

  return { data, error, mutate };
};

export const useFollowing = () => {
  const fetcher = async (url: string) => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const { data, error, mutate } = useSWR<IFollowing[]>(
    `${process.env.REACT_APP_BACK_URL}/users/following`,
    fetcher,
  );

  return { data, error, mutate };
};
