import React, { FC } from 'react';
import ProfileIcon from './ProfileIcon';

const Follow: FC = () => {
  return (
    <div className="bg-gray-100 w-80 p-4 rounded-2xl">
      <div className="font-bold text-xl mb-8">Follower List</div>
      <div className="flex">
        <ProfileIcon />
        <div className="ml-2 flex-auto flex items-center justify-between">
          <div>
            <div>이름</div>
            <div>자기소개</div>
          </div>
          <div>
            <button className="rounded-full px-4 py-2 font-black text-white bg-black text-sm">
              Follow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Follow;
