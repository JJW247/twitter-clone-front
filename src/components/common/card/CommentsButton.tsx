import React, { Dispatch, FC, SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment as farComment } from '@fortawesome/free-regular-svg-icons';

export interface CommentsButtonProps {
  commentsToggle: boolean;
  setCommentsToggle: Dispatch<SetStateAction<boolean>>;
  commentsCountData: number | undefined;
}

const CommentsButton: FC<CommentsButtonProps> = ({
  commentsToggle,
  setCommentsToggle,
  commentsCountData,
}) => {
  const onClickCommentsToggle = () => {
    setCommentsToggle(!commentsToggle);
  };

  return (
    <div className="w-full">
      <button onClick={onClickCommentsToggle}>
        <FontAwesomeIcon className="text-base" icon={farComment} />
        <span className="ml-2">
          {commentsCountData ? commentsCountData : ''}
        </span>
      </button>
    </div>
  );
};

export default CommentsButton;
