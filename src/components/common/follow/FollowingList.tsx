import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';

import { MeContext } from '../../../contexts/meContext';
import { useCustomSWR } from '../../../hooks';
import { IFollowing } from '../../../interfaces';

import FollowCard from './FollowCard';

const FollowingList: FC = () => {
  const { me } = useContext(MeContext);

  const { data: followingListData, error } = useCustomSWR<IFollowing[]>(
    `${process.env.REACT_APP_BACK_URL}/users/followings/${me}`,
    null,
  );

  if (!followingListData) return <div>loading...</div>;
  if (error) return <div>error</div>;

  return (
    <div className="bg-gray-100 w-80 py-4 rounded-2xl">
      <div className="font-bold text-xl mb-8 pl-4">Following list</div>
      {followingListData.length === 0 ? (
        <div className="flex justify-center pb-4">
          Not exist following list.
        </div>
      ) : (
        followingListData.map((following, index) => {
          if (index < 3)
            return (
              <FollowCard key={following.id} follow={following.follower} />
            );
        })
      )}
      {followingListData.length > 3 && (
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
