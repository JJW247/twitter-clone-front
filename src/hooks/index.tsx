import axios from 'axios';
import { ChangeEvent, createRef, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { MutatorCallback } from 'swr/dist/types';
import { ITweet } from '../interfaces';

export const useInput = (initialValue: any) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setValue(value);
  };

  return [value, onChange, setValue];
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

interface DataResponse<T> {
  data: T | undefined;
  mutate: (
    data?: T | Promise<T> | MutatorCallback<T> | undefined,
    shouldRevalidate?: boolean | undefined,
  ) => Promise<T | undefined>;
  error: any;
}

export function tokenHeader(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export function useCustomSWR<T>(
  requestUrl: string,
  token: string | null,
): DataResponse<T> {
  const fetcher = async (url: string) => {
    try {
      const response = token
        ? await axios.get(url, tokenHeader(token))
        : await axios.get(url);
      return response.data;
    } catch (error: any) {
      console.error(error);
      const messages = error.response.data?.message;
      if (Array.isArray(messages)) {
        messages.map((message) => {
          toast.error(message);
        });
      } else {
        toast.error(messages);
      }
      throw error;
    }
  };
  const { data, mutate, error } = useSWR<T>(requestUrl, fetcher);
  return { data, mutate, error };
}
