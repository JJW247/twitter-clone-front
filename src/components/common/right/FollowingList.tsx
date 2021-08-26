import React, { FC } from 'react';
import { useFollowing } from '../../../hooks/useFollow';

import Follow from './Follow';

const FollowingList: FC = () => {
  const { data, error } = useFollowing();

  if (!data) return <div>loading...</div>;
  if (error) return <div>error</div>;

  return (
    <div className="bg-gray-100 w-80 py-4 rounded-2xl">
      <div className="font-bold text-xl mb-8 pl-4">Following list</div>
      {data.length === 0 ? (
        <div className="flex justify-center pb-4">
          Not exist following list.
        </div>
      ) : (
        data.map((v) => {
          return <Follow follow={v.follower} />;
        })
      )}
    </div>
  );
};

export default FollowingList;
