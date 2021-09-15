import { FC, useContext } from 'react';

import FollowCard from './FollowCard';
import { MeContext } from '../../../contexts/meContext';
import { Link } from 'react-router-dom';
import { IFollower } from '../../../interfaces';
import { useCustomSWR } from '../../../hooks';

const FollowerList: FC = () => {
  const { me } = useContext(MeContext);

  const { data: followerListData, error } = useCustomSWR<IFollower[]>(
    `${process.env.REACT_APP_BACK_URL}/users/followers/${me}`,
    null,
  );

  if (!followerListData) return <div>loading...</div>;
  if (error) return <div>error</div>;

  return (
    <div className="bg-gray-100 w-80 py-4 rounded-2xl">
      <div className="font-bold text-xl mb-8 pl-4">Follower list</div>
      {followerListData.length === 0 ? (
        <div className="flex justify-center pb-4">Not exist follower list.</div>
      ) : (
        followerListData.map((follower, index) => {
          if (index < 3)
            return <FollowCard key={follower.id} follow={follower.following} />;
        })
      )}
      {followerListData.length > 3 && (
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
