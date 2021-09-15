import { FC, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { Link } from 'react-router-dom';
import imageCompression from 'browser-image-compression';

import ProfileIcon from '../common/ProfileIcon';
import { IFollower, IFollowing, IFollowList, IProfile } from '../../interfaces';
import CreateProfile from './CreateProfile';
import { MeContext } from '../../contexts/meContext';
import { toastError, toastSuccess } from '../../utils';
import { useGetProfileImage } from '../../hooks/useGetProfileImage';
import { useCustomSWR } from '../../hooks';

interface UserInfoProps {
  userId: string;
}

const UserInfo: FC<UserInfoProps> = ({ userId }) => {
  const token = localStorage.getItem('token');

  const { me } = useContext(MeContext);

  const [follow, setFollow] = useState<'Follow' | 'Unfollow'>('Follow');
  const [introduceToggle, setIntroduceToggle] = useState<boolean>(false);

  const { mutate: followerMutate } = useCustomSWR<IFollower[]>(
    `${process.env.REACT_APP_BACK_URL}/users/followers/${me}`,
    null,
  );
  const { mutate: followingMutate } = useCustomSWR<IFollowing[]>(
    `${process.env.REACT_APP_BACK_URL}/users/followings/${me}`,
    null,
  );

  const { mutate: profileImageMutate } = useGetProfileImage(+userId);

  const { data: followListData, mutate: followListMutate } = useCustomSWR<
    IFollowList[]
  >(`${process.env.REACT_APP_BACK_URL}/users/follow`, token);

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

      if (response.statusText === 'Created') {
        followListMutate();
        followerMutate();
        if (followingMutate) {
          followingMutate();
        }
      }
    } catch (error: any) {
      console.error(error);
      toastError(error.response.data.message);
    }
  };

  const onClickFix = () => {
    setIntroduceToggle(true);
  };

  const onChangeProfileUpload = async (e: any) => {
    try {
      const imageFile = e.target.files[0];
      if (!imageFile) return;

      const compressedImage = await imageCompression(imageFile, {
        maxWidthOrHeight: 100,
      });

      const blobToFile = new File([compressedImage], compressedImage.name, {
        type: compressedImage.type,
      });

      const formData = new FormData();

      formData.append('image', blobToFile);

      const response = await axios.put(
        `${process.env.REACT_APP_BACK_URL}/users/profile/image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.statusText === 'OK') {
        profileImageMutate();
        toastSuccess('Image upload success!');
      }
    } catch (error: any) {
      console.error(error);
      toastError(error.response.data.message);
    }
  };

  const { data: profileData, mutate: profileMutate } = useCustomSWR<IProfile>(
    `${process.env.REACT_APP_BACK_URL}/users/profile/${userId}`,
    null,
  );

  useEffect(() => {
    const isFollow = followListData?.filter((follow) => {
      return follow.following.id === +userId;
    });

    if (isFollow?.length !== 0) {
      setFollow('Unfollow');
      profileMutate();
    } else {
      setFollow('Follow');
      profileMutate();
    }
  });

  return (
    <div className="border-b-1">
      <div className="flex">
        <div className="mt-2 mx-4">
          <div>
            <ProfileIcon userId={+userId} />
            {me === profileData?.id && (
              <div className="relative rounded-full px-2 py-1 font-black text-white text-xs bg-black mx-2 mt-1 text-center">
                <input
                  className="w-full absolute opacity-0"
                  type="file"
                  onChange={onChangeProfileUpload}
                />
                <span>Fix</span>
              </div>
            )}
          </div>
          <div className="font-bold text-lg text-center mt-2">
            {profileData?.nickname}
          </div>
        </div>
        <div className="flex mt-2 w-full justify-around text-center">
          <Link
            className="hover:text-green-500"
            to={`/profile/${userId}/followers`}
          >
            <div>Followers</div>
            <div>{profileData?.followers?.length}</div>
          </Link>
          <Link
            className="hover:text-green-500"
            to={`/profile/${userId}/followings`}
          >
            <div>Followings</div>
            <div>{profileData?.followings?.length}</div>
          </Link>
          <Link className="hover:text-green-500" to={`/profile/${userId}`}>
            <div>Tweets</div>
            <div>{profileData?.tweets?.length}</div>
          </Link>
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
          initIntroduce={profileData ? profileData.introduce : ''}
        />
      ) : profileData?.introduce ? (
        <div className="mx-4 mb-4">
          {profileData.introduce}
          {me === +profileData.id && (
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
