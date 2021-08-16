import React, { FC } from 'react';

import { ITweet } from '../../interfaces';
import Card from './Card';

interface CardsProps {
  tweets: ITweet[];
}

const Cards: FC<CardsProps> = ({ tweets }) => {
  return (
    <ul>
      {tweets.map((tweet) => {
        return <Card key={tweet.id} tweet={tweet} />;
      })}
    </ul>
  );
};

export default Cards;
