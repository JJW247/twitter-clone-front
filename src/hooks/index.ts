import axios from 'axios';
import { ChangeEvent, createRef, useEffect, useRef, useState } from 'react';
import { ITweet } from '../interfaces';

export const useInput = (initialValue: any) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setValue(value);
  };

  return [value, onChange];
};

export const useGetMe = () => {
  const token = localStorage.getItem('token') || '';

  const [me, setMe] = useState<number | null>(null);

  useEffect(() => {
    const getMe = async () => {
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
    };

    getMe();
  }, [token]);

  return { me };
};

interface ISetSize {
  data: ITweet[][] | undefined;
  size: number;
  setSize: (
    size: number | ((size: number) => number),
  ) => Promise<ITweet[][] | undefined>;
}

export const useInfiniteScroll = ({ data, size, setSize }: ISetSize) => {
  const observer = useRef<IntersectionObserver>();
  const lastEl = createRef<HTMLDivElement>();
  const sizeRef = useRef<number>(1);

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

  return { lastEl };
};
