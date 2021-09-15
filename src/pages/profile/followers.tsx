import { FC } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useSWR from 'swr';

import { IFollower } from '../../interfaces';
import FollowerCard from '../../components/profile/FollowerCard';
import ProfileContainer from '../../components/profile/ProfileContainer';

const Followers: FC = () => {
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

  const { data, error } = useSWR<IFollower[]>(
    `${process.env.REACT_APP_BACK_URL}/users/followers/${userId}`,
    fetcher,
  );

  if (!data) return <div>loading...</div>;
  if (error) return <div>error</div>;

  return (
    <ProfileContainer userId={userId}>
      {data.map((follower, i) => {
        return <FollowerCard key={i} follower={follower} />;
      })}
    </ProfileContainer>
  );
};

export default Followers;
