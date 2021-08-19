import React, {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
} from 'react';
import axios from 'axios';
import { IComment, ITweet } from '../../../interfaces';
import { MutatorCallback } from 'swr/dist/types';

interface CommentFormProps {
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  tweet: ITweet;
  commentsMutate: (
    data?:
      | IComment[]
      | Promise<IComment[]>
      | MutatorCallback<IComment[]>
      | undefined,
    shouldRevalidate?: boolean | undefined,
  ) => Promise<IComment[] | undefined>;
  commentsCountMutate: (
    data?: number | Promise<number> | MutatorCallback<number> | undefined,
    shouldRevalidate?: boolean | undefined,
  ) => Promise<number | undefined>;
}

const CommentForm: FC<CommentFormProps> = ({
  comment,
  setComment,
  tweet,
  commentsMutate,
  commentsCountMutate,
}) => {
  const token = localStorage.getItem('token');

  const onChangeComment = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setComment(value);
  };

  const onSubmitComment = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (!comment) return;

      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/comments/tweets/${tweet.id}`,
        {
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.statusText === 'Created') {
        setComment('');
        commentsMutate();
        commentsCountMutate();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitComment}>
        <input
          className="focus:outline-none w-full placeholder-gray-600 mb-2"
          type="text"
          placeholder="Tweet your reply"
          value={comment}
          onChange={onChangeComment}
        />
        <input
          className={`rounded-full px-2 py-1 text-xs font-bold text-white bg-green-500 mb-2 focus:outline-none ${
            !comment && 'opacity-50'
          }`}
          type="submit"
          value="Reply"
        />
      </form>
    </div>
  );
};

export default CommentForm;
