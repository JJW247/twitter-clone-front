import React, { FC } from 'react';
import Follow from './Follow';

interface FollowListProps {
  title: string;
}

const FollowList: FC<FollowListProps> = ({ title }) => {
  return (
    <div className="bg-gray-100 w-80 py-4 rounded-2xl">
      <div className="font-bold text-xl mb-8 pl-4">{title}</div>
      <Follow />
      <Follow />
      <Follow />
    </div>
  );
};

export default FollowList;
