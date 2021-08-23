import React, { FC, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';

import ProfileIcon from '../common/ProfileIcon';
import { IFollow, IProfile } from '../../interfaces';
import CreateProfile from './CreateProfile';
import { MeContext } from '../../contexts';

interface UserInfoProps {
  userId: string;
}

const UserInfo: FC<UserInfoProps> = ({ userId }) => {
  const token = localStorage.getItem('token');

  const { me } = useContext(MeContext);

  const [follow, setFollow] = useState<'Follow' | 'Unfollow'>('Follow');
  const [introduceToggle, setIntroduceToggle] = useState<boolean>(false);

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

  const onClickFix = () => {
    setIntroduceToggle(true);
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

  const profileFetcher = async (url: string) => {
    try {
      const response = await axios.get(url);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const { data: profileData, mutate: profileMutate } = useSWR<IProfile>(
    `${process.env.REACT_APP_BACK_URL}/users/profile/${userId}`,
    profileFetcher,
  );

  useEffect(() => {
    const isFollow = data?.filter((follow) => {
      return follow.following.id === +userId;
    });

    if (isFollow?.length !== 0) {
      setFollow('Unfollow');
      profileMutate();
    } else {
      setFollow('Follow');
      profileMutate();
    }
  }, [data]);

  return (
    <div className="border-b-1">
      <div className="flex">
        <div className="mt-2 mx-4">
          <ProfileIcon />
          <div className="font-bold text-lg text-center mt-2">
            {profileData?.nickname}
          </div>
        </div>
        <div className="flex mt-2 w-full justify-around text-center">
          <div>
            <div>Followers</div>
            <div>{profileData?.followers?.length}</div>
          </div>
          <div>
            <div>Followings</div>
            <div>{profileData?.followings?.length}</div>
          </div>
          <div>
            <div>Tweets</div>
            <div>{profileData?.tweets?.length}</div>
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
      {introduceToggle ? (
        <CreateProfile
          profileMutate={profileMutate}
          setIntroduceToggle={setIntroduceToggle}
        />
      ) : profileData?.introduce ? (
        <div className="mx-4 mb-4">
          {profileData.introduce}
          {me === +userId && (
            <button
              className="rounded-full px-2 py-1 font-black text-white text-xs  bg-black ml-4 mb-2"
              onClick={onClickFix}
            >
              Fix
            </button>
          )}
        </div>
      ) : me === +userId ? (
        <CreateProfile profileMutate={profileMutate} />
      ) : (
        <div className="mx-4 mb-4">Let's go twitter-clone coding!!!</div>
      )}
    </div>
  );
};

export default UserInfo;
