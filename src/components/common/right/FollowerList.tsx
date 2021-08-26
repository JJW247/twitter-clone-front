import React, { FC } from 'react';

import Follow from './Follow';
import { useFollower } from '../../../hooks/useFollow';

const FollowerList: FC = () => {
  const { data, error } = useFollower();

  if (!data) return <div>loading...</div>;
  if (error) return <div>error</div>;

  return (
    <div className="bg-gray-100 w-80 py-4 rounded-2xl">
      <div className="font-bold text-xl mb-8 pl-4">Follower list</div>
      {data.length === 0 ? (
        <div className="flex justify-center pb-4">Not exist follower list.</div>
      ) : (
        data.map((v) => {
          return <Follow follow={v.following} />;
        })
      )}
    </div>
  );
};

export default FollowerList;
