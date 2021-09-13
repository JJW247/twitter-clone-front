import axios from 'axios';
import { FC } from 'react';
import useSWR from 'swr';
import { IComment, ITweet } from '../../../interfaces';
import Comment from './Comment';

interface CommentListProps {
  tweet: ITweet;
}

const CommentList: FC<CommentListProps> = ({ tweet }) => {
  const fetcher = async (url: string) => {
    try {
      const response = await axios.get(url);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const { data } = useSWR<IComment[]>(
    `${process.env.REACT_APP_BACK_URL}/comments/tweets/${tweet.id}`,
    fetcher,
  );
  return (
    <>
      {data && (
        <ul>
          {data.map((v) => {
            return <Comment key={v.id} comment={v} tweet={tweet} />;
          })}
        </ul>
      )}
    </>
  );
};

export default CommentList;
