import React, { FC } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

import { IComment } from '../../../interfaces';

interface CommentProps {
  comment: IComment;
}

const Comment: FC<CommentProps> = ({ comment }) => {
  dayjs.extend(relativeTime);

  return (
    <li className="my-1 text-xs flex justify-between">
      <div>
        <span className="font-bold mr-2 text-sm">{comment.users.nickname}</span>
        {comment.comment}
      </div>
      <div>{dayjs(comment.createdAt).locale('ko').fromNow()}</div>
    </li>
  );
};

export default Comment;
