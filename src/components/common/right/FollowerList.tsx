import React, { FC, useContext } from 'react';

import Follow from './Follow';
import { useFollower } from '../../../hooks/useFollow';
import { MeContext } from '../../../contexts/meContext';
import { Link } from 'react-router-dom';

const FollowerList: FC = () => {
  const { me } = useContext(MeContext);

  const { data, error } = useFollower();

  if (!data) return <div>loading...</div>;
  if (error) return <div>error</div>;

  return (
    <div className="bg-gray-100 w-80 py-4 rounded-2xl">
      <div className="font-bold text-xl mb-8 pl-4">Follower list</div>
      {data.length === 0 ? (
        <div className="flex justify-center pb-4">Not exist follower list.</div>
      ) : (
        data.map((v, i) => {
          if (i < 3) return <Follow key={v.id} follow={v.following} />;
        })
      )}
      {data.length > 3 && (
        <Link
          className="flex justify-center items-center mt-2"
          to={`/profile/${me}/followers`}
        >
          <button className="border-1 border-gray-500 rounded-full px-4 py-2 hover:text-green-500 hover:border-green-500">
            More
          </button>
        </Link>
      )}
    </div>
  );
};

export default FollowerList;
