import { FC, useContext } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

import { IComment, ITweet } from '../../../interfaces';
import { MeContext } from '../../../contexts/meContext';
import { toastError, toastSuccess } from '../../../utils';

import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt as farTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { useCustomSWR } from '../../../hooks';

interface CommentProps {
  comment: IComment;
  tweet: ITweet;
}

const Comment: FC<CommentProps> = ({ comment, tweet }) => {
  dayjs.extend(relativeTime);

  const { me } = useContext(MeContext);

  const { mutate: commentMutate } = useCustomSWR(
    `${process.env.REACT_APP_BACK_URL}/comments/tweets/${tweet.id}`,
    null,
  );

  const { mutate: countMutate } = useCustomSWR(
    `${process.env.REACT_APP_BACK_URL}/comments/count/tweets/${tweet.id}`,
    null,
  );

  const onClickDeleteComment = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.delete(
        `${process.env.REACT_APP_BACK_URL}/comments/${comment.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.statusText === 'OK') {
        commentMutate();
        countMutate();
        toastSuccess('댓글 삭제');
      }
    } catch (error: any) {
      console.error(error);
      toastError(error.response.data.message);
    }
  };

  return (
    <li className="my-1 text-xs flex justify-between">
      <div>
        <span className="font-bold mr-2 text-sm">{comment.users.nickname}</span>
        {comment.comment}
      </div>
      <div>
        {me === comment.users.id && (
          <button className="mr-2" onClick={onClickDeleteComment}>
            <FontAwesomeIcon icon={farTrashAlt} />
          </button>
        )}
        {dayjs(comment.createdAt).locale('ko').fromNow()}
      </div>
    </li>
  );
};

export default Comment;
