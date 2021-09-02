import React, { FC, useContext } from 'react';
import { Link } from 'react-router-dom';

import { MeContext } from '../../../contexts/meContext';
import { useFollowing } from '../../../hooks/useFollow';

import Follow from './Follow';

const FollowingList: FC = () => {
  const { me } = useContext(MeContext);

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
        data.map((v, i) => {
          if (i < 3) return <Follow key={v.id} follow={v.follower} />;
        })
      )}
      {data.length > 3 && (
        <Link
          className="flex justify-center items-center mt-2"
          to={`/profile/${me}/followings`}
        >
          <button className="border-1 border-gray-500 rounded-full px-4 py-2 hover:text-green-500 hover:border-green-500">
            More
          </button>
        </Link>
      )}
    </div>
  );
};

export default FollowingList;
