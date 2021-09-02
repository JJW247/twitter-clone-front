import React, { ChangeEvent, FC, FormEvent, useContext, useState } from 'react';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ProfileIcon from '../common/ProfileIcon';
import axios from 'axios';
import { ITweet } from '../../interfaces';
import { MutatorCallback } from 'swr/dist/types';
import { MeContext } from '../../contexts/meContext';

export interface CreateTweetProps {
  mutate: (
    data?:
      | ITweet[][]
      | Promise<ITweet[][]>
      | MutatorCallback<ITweet[][]>
      | undefined,
    shouldRevalidate?: boolean | undefined,
  ) => Promise<ITweet[][] | undefined>;
}

const CreateTweet: FC<CreateTweetProps> = ({ mutate }) => {
  const token = localStorage.getItem('token');

  const [tweet, setTweet] = useState<string>('');

  const { me } = useContext(MeContext);

  const onChangeTweet = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setTweet(value);
  };

  const onSubmitTweet = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!tweet) return;

    const response = await axios.post(
      `${process.env.REACT_APP_BACK_URL}/tweets`,
      {
        tweet,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.statusText === 'Created') {
      setTweet('');
      mutate();
    }
  };

  return (
    <div className="border-b-1 flex">
      <div className="mt-2 mx-4">
        <ProfileIcon userId={me} />
      </div>
      <form className="w-full" onSubmit={onSubmitTweet}>
        <input
          className="w-full text-xl focus:outline-none placeholder-gray-600 my-6"
          placeholder="What's happening?"
          value={tweet}
          onChange={onChangeTweet}
        />
        <div className="flex items-center text-green-500 pb-2 border-b-1 mr-4">
          <FontAwesomeIcon icon={faTwitter} />
          <span className="ml-1 text-sm font-bold">Twitter-clone !!!</span>
        </div>
        <div className="flex justify-end mr-4 my-4">
          <input
            className="rounded-full px-4 py-2 text-sm font-black text-white bg-green-500"
            type="submit"
            value="Tweet"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateTweet;
