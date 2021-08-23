import React, {
  FC,
  MutableRefObject,
  useContext,
  useEffect,
  useState,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisH,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import {
  faTrashAlt as farTrashAlt,
  faClone as farClone,
} from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';

import { ITweet } from '../../../interfaces';
import { CreateTweetProps } from '../../main/CreateTweet';
import { MeContext } from '../../../contexts';

export interface EllipsisProps extends CreateTweetProps {
  tweet: ITweet;
  ellipsisEl: MutableRefObject<HTMLDivElement | null>;
}

const Ellipsis: FC<EllipsisProps> = ({ tweet, mutate, ellipsisEl }) => {
  const token = localStorage.getItem('token') || '';

  const { me } = useContext(MeContext);

  const [ellipsisToggle, setEllipsisToggle] = useState<boolean>(false);

  const onClickEllipsis = () => {
    setEllipsisToggle(!ellipsisToggle);
  };
  const onClickDeleteTweet = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACK_URL}/tweets/${tweet.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.statusText === 'OK') {
        mutate();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const ellipsisModalHandler = (e: any) => {
    if (
      ellipsisToggle &&
      (!ellipsisEl.current || !ellipsisEl.current.contains(e.target))
    ) {
      setEllipsisToggle(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', ellipsisModalHandler);

    return () => window.removeEventListener('click', ellipsisModalHandler);
  }, [ellipsisToggle]);

  return (
    <div className="w-full relative">
      <div className="w-6 h-6 rounded-full flex justify-center items-center hover:text-green-500 hover:bg-green-100">
        <button className="focus:outline-none" onClick={onClickEllipsis}>
          <FontAwesomeIcon className="text-base" icon={faEllipsisH} />
        </button>
      </div>
      {ellipsisToggle && (
        <div
          ref={ellipsisEl}
          className="absolute bg-white shadow-md py-2 -ml-2 w-36"
        >
          {me === tweet.users.id && (
            <button
              className="px-2 py-1 hover:bg-gray-200 w-full"
              onClick={onClickDeleteTweet}
            >
              <FontAwesomeIcon icon={farTrashAlt} />
              <span className="ml-4">Delete tweet</span>
            </button>
          )}
          <button className="px-2 py-1 hover:bg-gray-200 w-full">
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <span className="ml-4">Report tweet</span>
          </button>
          <button className="px-2 py-1 hover:bg-gray-200 w-full">
            <FontAwesomeIcon icon={farClone} />
            <span className="ml-4">Copy tweet</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Ellipsis;
