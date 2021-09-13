import axios from 'axios';
import useSWR from 'swr';
import { MutatorCallback } from 'swr/dist/types';

interface DataResponse<T> {
  data: T | undefined;
  mutate: (
    data?: T | Promise<T> | MutatorCallback<T> | undefined,
    shouldRevalidate?: boolean | undefined,
  ) => Promise<T | undefined>;
  error: any;
}

function useCustomSWR<T>(requestUrl: string): DataResponse<T> {
  const fetcher = async (url: string) => {
    try {
      const response = await axios.get(url);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const { data, mutate, error } = useSWR<T>(requestUrl, fetcher);
  return { data, mutate, error };
}

export default useCustomSWR;
