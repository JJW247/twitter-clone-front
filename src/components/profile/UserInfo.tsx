import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useSWR from 'swr';

import { useGetMe } from '../../hooks';
import ProfileIcon from '../common/ProfileIcon';
import { IFollow } from '../../interfaces';

const UserInfo: FC = () => {
  const token = localStorage.getItem('token');

  const { me } = useGetMe();

  const { userId } = useParams<{ userId: string }>();

  const [follow, setFollow] = useState<'Follow' | 'Unfollow'>('Follow');

  const onClickFollow = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/users/follow/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response);

      if (response.statusText === 'Created') {
        mutate();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetcher = async (url: string) => {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const { data, mutate } = useSWR<IFollow[]>(
    `${process.env.REACT_APP_BACK_URL}/users/follower`,
    fetcher,
  );

  useEffect(() => {
    const isFollow = data?.filter((follow) => {
      return follow.following.id === +userId;
    });

    if (isFollow?.length !== 0) {
      console.log(isFollow);
      setFollow('Unfollow');
    } else {
      setFollow('Follow');
    }
  }, [data]);

  return (
    <div className="border-b-1">
      <div className="flex">
        <div className="mt-2 mx-4">
          <ProfileIcon />
          <div className="font-bold text-lg text-center mt-2">h662</div>
        </div>
        <div className="flex mt-2 w-full justify-around text-center">
          <div>
            <div>Followers</div>
            <div>123</div>
          </div>
          <div>
            <div>Followings</div>
            <div>123</div>
          </div>
          <div>
            <div>Tweets</div>
            <div>123</div>
          </div>
          <div>
            {me !== +userId && (
              <button
                className={`rounded-full px-4 py-2 font-black text-white text-sm mt-2 ${
                  follow === 'Follow' ? 'bg-black' : 'bg-red-500'
                }`}
                onClick={onClickFollow}
              >
                {follow}
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="mx-4 mb-4">introduce</div>
    </div>
  );
};

export default UserInfo;
