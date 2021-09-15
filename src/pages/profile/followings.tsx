import { FC } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useSWR from 'swr';

import { IFollowing } from '../../interfaces';
import FollowingCard from '../../components/profile/FollowingCard';
import ProfileContainer from '../../components/profile/ProfileContainer';

const Followings: FC = () => {
  const { userId } = useParams<{ userId: string }>();

  const fetcher = async (url: string) => {
    try {
      const token = localStorage.getItem('token');

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

  const { data, error } = useSWR<IFollowing[]>(
    `${process.env.REACT_APP_BACK_URL}/users/followings/${userId}`,
    fetcher,
  );

  if (!data) return <div>loading...</div>;
  if (error) return <div>error</div>;

  return (
    <ProfileContainer userId={userId}>
      {data.map((following, i) => {
        return <FollowingCard key={i} following={following} />;
      })}
    </ProfileContainer>
  );
};

export default Followings;
