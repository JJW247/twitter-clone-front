import React, { FC } from 'react';

import { ITweet } from '../../interfaces';
import { CreateTweetProps } from '../main/CreateTweet';
import Card from './Card';

interface CardsProps extends CreateTweetProps {
  tweets: ITweet[];
}

const Cards: FC<CardsProps> = ({ tweets, mutate }) => {
  return (
    <ul>
      {tweets.map((tweet) => {
        return <Card key={tweet.id} tweet={tweet} mutate={mutate} />;
      })}
    </ul>
  );
};

export default Cards;
